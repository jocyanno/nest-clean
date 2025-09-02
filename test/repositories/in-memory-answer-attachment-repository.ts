import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentsRepository
{
  public items: any[] = [];

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    );
    return answerAttachments;
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    );
    this.items = answerAttachments;
  }
}
