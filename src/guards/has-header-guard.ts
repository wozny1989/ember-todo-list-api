import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const allowedSecrets = [
  'KvJHWgVgXB',
  'NyGI7vKYc2',
  'bMDo1dFMDY',
  'WFWUsIVhuL',
  'cV87zOVw3F',
  'f1QkHg2YR5',
];

export class HasHeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const ownerSecret = request.headers['owner-secret'];
    const isIncludedOwnerSecret = allowedSecrets.includes(ownerSecret);

    if (!isIncludedOwnerSecret) {
      throw new ForbiddenException({
        message: 'incorrect "owner-secret" header dude!',
        statusCode: 403,
        error: 'Forbidden',
      });
    }
    return true;
  }
}
