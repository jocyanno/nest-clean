import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event';
import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository';

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.sendQuestionBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async sendQuestionBestAnswerChosenNotification(
    event: QuestionBestAnswerChosenEvent,
  ) {
    const answer = await this.answersRepository.findById(
      event.getBestAnswerId().toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${event.getQuestion().title.substring(0, 40).concat('...')}" foi escolhida pelo autor da pergunta!`,
      });
    }
  }
}
