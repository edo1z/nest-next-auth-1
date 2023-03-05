import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  email: string;
  password: string;
  name: string;
  profile?: string;
  url?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
