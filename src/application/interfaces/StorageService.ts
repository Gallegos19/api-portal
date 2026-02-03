/**
 * Interfaz para el servicio de almacenamiento en la nube
 * Define los métodos para gestionar archivos en R2 Object Storage
 */
export interface StorageService {
  /**
   * Sube un archivo al almacenamiento
   * @param file - Buffer del archivo a subir
   * @param fileName - Nombre del archivo con extensión
   * @param folder - Carpeta donde se almacenará (opcional)
   * @param contentType - Tipo MIME del archivo (opcional)
   * @returns URL pública del archivo subido
   */
  uploadFile(
    file: Buffer,
    fileName: string,
    folder?: string,
    contentType?: string
  ): Promise<string>;

  /**
   * Obtiene un archivo del almacenamiento
   * @param fileKey - Clave/ruta del archivo en el almacenamiento
   * @returns Buffer del archivo
   */
  getFile(fileKey: string): Promise<Buffer>;

  /**
   * Elimina un archivo del almacenamiento
   * @param fileKey - Clave/ruta del archivo a eliminar
   * @returns true si se eliminó correctamente
   */
  deleteFile(fileKey: string): Promise<boolean>;

  /**
   * Lista archivos en una carpeta específica
   * @param prefix - Prefijo/carpeta para filtrar archivos
   * @returns Array de claves de archivos
   */
  listFiles(prefix?: string): Promise<string[]>;

  /**
   * Obtiene la URL pública de un archivo
   * @param fileKey - Clave/ruta del archivo
   * @returns URL pública del archivo
   */
  getFileUrl(fileKey: string): string;

  /**
   * Genera una URL firmada con acceso temporal al archivo (para buckets privados)
   * @param fileKey - Clave/ruta del archivo
   * @param expiresIn - Tiempo de expiración en segundos (default: 3600 = 1 hora)
   * @returns URL firmada con acceso temporal
   */
  getSignedFileUrl(fileKey: string, expiresIn?: number): Promise<string>;

  /**
   * Verifica si un archivo existe
   * @param fileKey - Clave/ruta del archivo
   * @returns true si el archivo existe
   */
  fileExists(fileKey: string): Promise<boolean>;
}
