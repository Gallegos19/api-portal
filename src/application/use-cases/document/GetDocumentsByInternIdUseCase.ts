import { Document } from "../../../domain/entities/Document";
import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";

export class GetDocumentsByInternIdUseCase {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(internId: string): Promise<Document[]> {
    const documents = await this.documentRepository.findByInternId(internId);
    return documents;
  }
}
