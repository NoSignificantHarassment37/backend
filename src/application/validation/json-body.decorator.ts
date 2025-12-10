import { SetMetadata } from '@nestjs/common';

export const AcceptsJson = () => SetMetadata('acceptsJson', true);
