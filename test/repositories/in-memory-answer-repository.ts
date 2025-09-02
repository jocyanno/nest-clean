import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: any[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.entityId);
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);

    this.items[index] = answer;

    DomainEvents.dispatchEventsForAggregate(answer.entityId);
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);
    this.items.splice(index, 1);

    await this.answerAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    );
  }
}
