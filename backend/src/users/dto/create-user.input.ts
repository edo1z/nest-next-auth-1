import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  email: string;
  password: string;
  name: string;
  profile?: string;
  url?: string;
  active: boolean;
}
