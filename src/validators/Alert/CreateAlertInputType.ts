import { Field, InputType } from 'type-graphql';
import { IsEmail, IsEnum, Length } from 'class-validator';
import { AlertType } from '../../types/Alert';
import { AlertDelayEnum } from '../../models';

@InputType()
export default class CreateAlertInputType implements Partial<AlertType> {
  @Field()
  @IsEnum(AlertDelayEnum)
  delay: number;

  @Field()
  @Length(3, 100)
  passphrase: string;

  @Field()
  @IsEmail()
  sendTo: string;
}
