import { R2StorageService } from "../../infrastructure/services/R2StorageService";

/**
 * Instancia única del servicio de almacenamiento R2
 * Puedes importar este servicio en tus casos de uso o controladores
 * 
 * @example
 * ```typescript
 * import { storageService } from '../path/to/config/storage';
 * 
 * // Subir un archivo
 * const url = await storageService.uploadFile(buffer, 'documento.pdf', 'documentos', 'application/pdf');
 * 
 * // Obtener un archivo
 * const file = await storageService.getFile('documentos/documento.pdf');
 * 
 * // Eliminar un archivo
 * await storageService.deleteFile('documentos/documento.pdf');
 * ```
 */
export const storageService = new R2StorageService();
