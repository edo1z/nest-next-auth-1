import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password: string;
  profile?: string;
  url?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
