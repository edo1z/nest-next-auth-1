import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { decode } from 'next-auth/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the context passed to the resolver
    const ctx = GqlExecutionContext.create(context).getContext();

    // Extract the authorization header from the request
    const authorization = ctx.req.headers?.authorization;
    if (!authorization) return false;

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];
    if (!token) return false;

    // Extract the secret from the environment
    const secret = process.env.NEXTAUTH_SECRET ?? '';
    if (!secret) return false;

    // Decode the JWT token using the secret
    try {
      const decoded = await decode({ token, secret });
      if (!decoded) return false;
      // Add the decoded token to the context
      ctx.user = decoded;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
