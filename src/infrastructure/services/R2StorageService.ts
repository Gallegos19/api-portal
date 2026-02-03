import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StorageService } from "../../application/interfaces/StorageService";

/**
 * Implementación del servicio de almacenamiento usando Cloudflare R2
 * R2 es compatible con la API de S3 de AWS
 */
export class R2StorageService implements StorageService {
  private s3Client: S3Client;
  private bucketName: string;
  private publicUrl: string;

  constructor() {
    // Validar que las variables de entorno necesarias estén configuradas
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
      throw new Error(
        "Faltan variables de entorno para configurar R2 Storage. Revisa: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL"
      );
    }

    this.bucketName = bucketName;
    this.publicUrl = publicUrl;

    // Configurar el cliente S3 para trabajar con Cloudflare R2
    this.s3Client = new S3Client({
      region: "auto", // R2 usa 'auto' como región
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // IMPORTANTE: R2 requiere path-style URLs
    });
  }

  /**
   * Sube un archivo a R2
   */
  async uploadFile(
    file: Buffer,
    fileName: string,
    folder: string = "",
    contentType: string = "application/octet-stream"
  ): Promise<string> {
    try {
      // Construir la clave del archivo (con carpeta si se especifica)
      const fileKey = folder ? `${folder}/${fileName}` : fileName;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file,
        ContentType: contentType,
      });

      await this.s3Client.send(command);

      return this.getFileUrl(fileKey);
    } catch (error) {
      console.error("Error al subir archivo a R2:", error);
      throw new Error(`No se pudo subir el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  /**
   * Obtiene un archivo de R2
   */
  async getFile(fileKey: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new Error("El archivo no tiene contenido");
      }

      // Convertir el stream a Buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error) {
      console.error("Error al obtener archivo de R2:", error);
      throw new Error(`No se pudo obtener el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  /**
   * Elimina un archivo de R2
   */
  async deleteFile(fileKey: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      console.error("Error al eliminar archivo de R2:", error);
      throw new Error(`No se pudo eliminar el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  /**
   * Lista archivos en R2 (opcionalmente filtrados por prefijo/carpeta)
   */
  async listFiles(prefix: string = ""): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
      });

      const response = await this.s3Client.send(command);

      if (!response.Contents) {
        return [];
      }

      return response.Contents.map((item) => item.Key || "").filter(Boolean);
    } catch (error) {
      console.error("Error al listar archivos de R2:", error);
      throw new Error(`No se pudo listar los archivos: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  /**
   * Obtiene la URL pública de un archivo
   * Nota: Esta URL NO funcionará directamente si el bucket es privado.
   * Usa getSignedFileUrl() para obtener URLs con acceso temporal.
   */
  getFileUrl(fileKey: string): string {
    // Retornamos solo la clave del archivo, no una URL completa
    // ya que el bucket es privado y necesita URLs firmadas
    return fileKey;
  }

  /**
   * Genera una URL firmada con acceso temporal al archivo
   * @param fileKey - Clave/ruta del archivo
   * @param expiresIn - Tiempo de expiración en segundos (default: 1 hora)
   * @returns URL firmada con acceso temporal
   */
  async getSignedFileUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      // Generar URL firmada con tiempo de expiración
      const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
      return signedUrl;
    } catch (error) {
      console.error("Error al generar URL firmada:", error);
      throw new Error(`No se pudo generar la URL firmada: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  /**
   * Verifica si un archivo existe en R2
   */
  async fileExists(fileKey: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      console.error("Error al verificar existencia de archivo:", error);
      throw new Error(`No se pudo verificar el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }
}
