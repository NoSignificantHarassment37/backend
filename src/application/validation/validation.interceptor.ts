import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JsonBodyGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const acceptsJson = this.reflector.get<boolean>('acceptsJson', context.getHandler());
        if (!acceptsJson) return true; // no aplica

        const request = context.switchToHttp().getRequest();
        if (!request.is('application/json')) {
            throw new BadRequestException('Content-Type must be application/json');
        }
        if (!request.body || typeof request.body !== 'object') {
            throw new BadRequestException('Body is not parseable JSON');
        }

        return true;
    }
}
