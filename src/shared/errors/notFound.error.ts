import { NotFoundException } from '@nestjs/common';

export class NotFoundError extends Error {
  private readonly defaultMessage = 'Aluno não encontrado.';

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
  }

  showError() {
    throw new NotFoundException(this.message);
  }
}
