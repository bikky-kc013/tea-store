import { Exclude } from 'class-transformer';

export class serializedAdmin {
  username: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<serializedAdmin>) {
    Object.assign(this, partial);
  }
}
