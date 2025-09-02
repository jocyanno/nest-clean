import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    console.log('ZodValidationPipe - Valor recebido:', value);
    console.log('ZodValidationPipe - Tipo do valor:', typeof value);

    try {
      // Permitir que valores primitivos ou objetos passem
      const result = this.schema.parse(value);
      console.log('ZodValidationPipe - Resultado:', result);
      return result;
    } catch (error) {
      console.log('ZodValidationPipe - Erro:', error);
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
