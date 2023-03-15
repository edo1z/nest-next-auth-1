import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { decode } from 'next-auth/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorization = ctx.req.headers?.authorization;
    const token = authorization?.split(' ')[1];
    const secret = process.env.NEXTAUTH_SECRET ?? '';
    const decoded = await decode({ token, secret });
    if (!decoded) return false;
    ctx.user = decoded;
    return true;
  }
}
