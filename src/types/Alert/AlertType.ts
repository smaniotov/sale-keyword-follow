import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import AlertHistoryType from './AlertHistoryType';
import { IAlert } from '../../models';

@ObjectType()
export default class AlertType implements Required<IAlert> {
  constructor({
    sendTo, passphrase, delay, isActive, nextMessage, createdAt, history = [],
  }) {
    this.sendTo = sendTo;
    this.passphrase = passphrase;
    this.delay = delay;
    this.isActive = isActive;
    this.history = history;
    this.createdAt = createdAt;
    this.nextMessage = nextMessage;
  }

  @Field(() => String)
  sendTo: string;

  @Field(() => String)
  passphrase: string;

  @Field(() => Number)
  delay: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [AlertHistoryType])
  history: AlertHistoryType[];

  @Field(() => Date)
  nextMessage: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
