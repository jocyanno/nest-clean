import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswersComments } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { DATABASE_TOKENS } from './database.tokens';

@Module({
  providers: [
    PrismaService,
    {
      provide: DATABASE_TOKENS.QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersComments,
    PrismaAnswersAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    DATABASE_TOKENS.QuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersComments,
    PrismaAnswersAttachmentsRepository,
  ],
})
export class DatabaseModule {}
