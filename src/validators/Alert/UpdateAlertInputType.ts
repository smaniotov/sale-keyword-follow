import { Field, InputType } from 'type-graphql';
import { IsEmail, IsEnum, Length } from 'class-validator';
import { AlertType } from '../../types/Alert';
import { AlertDelayEnum } from '../../models';

@InputType()
export default class UpdateAlertInputType implements Partial<AlertType> {
  @Field({ nullable: true })
  @IsEnum(AlertDelayEnum)
  delay?: number;

  @Field({ nullable: true })
  @Length(3, 100)
  keyword?: string;

  @Field({ nullable: true })
  @IsEmail()
  sendTo?: string;
}
