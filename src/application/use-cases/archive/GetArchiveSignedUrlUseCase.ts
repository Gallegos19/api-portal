import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { StorageService } from "../../interfaces/StorageService";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetArchiveSignedUrlUseCase {
  constructor(
    private archiveRepository: ArchiveRepository,
    private storageService: StorageService
  ) {}

  async execute(archiveId: string, expiresIn: number = 3600): Promise<string> {
    // Verificar que el archivo existe en la base de datos
    const archive = await this.archiveRepository.findById(archiveId);
    
    if (!archive) {
      throw new ResourceNotFoundError('Archive', archiveId);
    }
    
    // Extraer la clave del archivo del storage_url
    // Si es una URL completa, extraemos solo la parte de la clave
    let fileKey = archive.storageUrl;
    
    // Si storageUrl contiene una URL completa (caso de archivos viejos)
    // Extraemos solo la parte después del bucket
    if (fileKey.startsWith('http')) {
      const urlParts = fileKey.split('/');
      const bucketIndex = urlParts.indexOf('portal'); // nombre del bucket
      if (bucketIndex !== -1) {
        fileKey = urlParts.slice(bucketIndex + 1).join('/');
      }
    }
    
    // Generar URL firmada para acceso temporal
    const signedUrl = await this.storageService.getSignedFileUrl(
      fileKey,
      expiresIn
    );
    
    return signedUrl;
  }
}
