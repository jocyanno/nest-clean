import { AnswersRepository } from '../repositories/answer-repository';
import { Answer } from '../../enterprise/entities/answer';
import { Either, right } from '@/core/either';

interface FetchRecentQuestionsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    answer: Answer[];
  }
>;

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const answer = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({
      answer,
    });
  }
}
