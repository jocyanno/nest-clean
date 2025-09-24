import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, right } from '@/core/either';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TOKENS } from '@/infra/database/database.tokens';

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    question: Question[];
  }
>;

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(
    @Inject(DATABASE_TOKENS.QuestionsRepository)
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findManyRecent({ page });

    return right({
      question,
    });
  }
}
