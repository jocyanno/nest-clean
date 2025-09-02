import { DomainEvents } from '@/core/events/domain-events';
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: any[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);
    return question || null;
  }

  async findManyRecent({ page }: { page: number }) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async create(question: any): Promise<void> {
    this.items.push(question);

    DomainEvents.dispatchEventsForAggregate(question.entityId);
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id);

    this.items[index] = question;

    DomainEvents.dispatchEventsForAggregate(question.entityId);
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id);
    this.items.splice(index, 1);

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }
}
