import { Document } from "../../../domain/entities/Document";
import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";
import { UpdateDocumentDTO } from "../../dto/document/UpdateDocumentDTO";

export class UpdateDocumentUseCase {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(id: string, data: UpdateDocumentDTO): Promise<Document> {
    const document = await this.documentRepository.findById(id);
    
    if (!document) {
      throw new Error("Document not found");
    }

    // Update document properties
    if (data.title) document.updateTitle(data.title);
    if (data.description) document.updateDescription(data.description);

    return this.documentRepository.update(document);
  }
}
