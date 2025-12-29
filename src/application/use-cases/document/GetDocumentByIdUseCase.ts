import { Document } from "../../../domain/entities/Document";
import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetDocumentByIdUseCase {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(id: string): Promise<Document> {
    const document = await this.documentRepository.findById(id);
    
    if (!document) {
      throw new ResourceNotFoundError('Document', id);
    }
    
    return document;
  }
}
