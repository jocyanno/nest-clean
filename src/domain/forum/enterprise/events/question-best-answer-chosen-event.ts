import { DomainEvent } from '@/core/events/domain-event';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../entities/question';

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date;
  private question: Question;
  private bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.ocurredAt = new Date();
    this.question = question;
    this.bestAnswerId = bestAnswerId;
  }

  public getAggregateId(): UniqueEntityID {
    return this.question.entityId;
  }

  public getQuestion(): Question {
    return this.question;
  }

  public getBestAnswerId(): UniqueEntityID {
    return this.bestAnswerId;
  }
}
