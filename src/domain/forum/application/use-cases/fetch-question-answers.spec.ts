import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { FetchQuestionAnswersUseCase } from './fetch-question-answers';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(result.value?.answer).toHaveLength(3);
  });

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(result.value?.answer).toHaveLength(2);
  });
});
