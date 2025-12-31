import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteDocumentUseCase {
  constructor(private documentRepository: DocumentRepository) {}

  async execute(id: string): Promise<void> {
    const document = await this.documentRepository.findById(id);
    
    if (!document) {
      throw new ResourceNotFoundError("Document", id);
    }

    await this.documentRepository.softDelete(id);
  }
}
