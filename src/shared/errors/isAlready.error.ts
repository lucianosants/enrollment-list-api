import { BadRequestException } from '@nestjs/common';

export class IsAlreadyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IsAlreadyError';
    this.message = message;
  }

  showError() {
    throw new BadRequestException(this.message);
  }
}
