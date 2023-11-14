import { NotFoundException } from '@nestjs/common';

export class IsAlreadyError extends Error {
  private readonly defaultMessage = 'já está matriculado.';

  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }

  getMessage(name: string = 'Este aluno') {
    throw new NotFoundException(
      this.message || `${name} ${this.defaultMessage}`,
    );
  }
}
