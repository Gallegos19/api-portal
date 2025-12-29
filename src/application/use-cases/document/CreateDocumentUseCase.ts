import { Document } from "../../../domain/entities/Document";
import { DocumentRepository } from "../../../domain/repositories/DocumentRepository";
import { CreateDocumentDTO } from "../../dto/document/CreateDocumentDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateDocumentUseCase {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(data: CreateDocumentDTO): Promise<Document> {
    // Create document entity
    const document = Document.create({
      title: data.title,
      description: data.description,
      id_intern: data.id_intern,
      id_archive: data.id_archive
    });
    
    // Save the document
    return this.documentRepository.save(document);
  }
}