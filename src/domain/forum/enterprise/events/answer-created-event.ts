import { DomainEvent } from '@/core/events/domain-event';
import { Answer } from '../entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private answer: Answer;

  constructor(answer: Answer) {
    this.ocurredAt = new Date();
    this.answer = answer;
  }

  public getAggregateId(): UniqueEntityID {
    return this.answer.entityId;
  }

  public getAnswer(): Answer {
    return this.answer;
  }
}
