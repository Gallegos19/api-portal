import { Document } from "../../../domain/entities/Document";
import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";

export class GetAllDocumentsUseCase {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(): Promise<Document[]> {
    const documents = await this.documentRepository.findAll();
    return documents;
  }
}
