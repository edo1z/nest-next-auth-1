import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  email: string;
  name: string;
  url?: string;
  active: boolean;
}
