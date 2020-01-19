import { Field, ObjectType } from 'type-graphql';
import { IAlertHistory } from '../../models';

@ObjectType()
export default class AlertHistoryType implements IAlertHistory {
  constructor({ body, sentAt }: AlertHistoryType) {
    this.sentAt = sentAt;
    this.body = body;
  }

  @Field(() => String, { description: 'Keywords used to search in eBay' })
  passphrase: string;

  @Field(() => String, { description: 'Email address for whom email was sent' })
  sentTo: string;

  @Field(() => Date)
  sentAt: Date;

  @Field(() => String)
  body: string;
}
