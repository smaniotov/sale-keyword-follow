import 'reflect-metadata';
import { ObjectID } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { IAlert } from '../../models';

@ObjectType()
export default class AlertType implements Partial<IAlert> {
  constructor({
    sendTo, passphrase, delay,
    isActive, nextMessage, createdAt, updatedAt,
  }) {
    this.sendTo = sendTo;
    this.passphrase = passphrase;
    this.delay = delay;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.nextMessage = nextMessage;
    this.updatedAt = updatedAt;
  }

  @Field(() => String)
  _id?: ObjectID;

  @Field(() => String)
  sendTo: string;

  @Field(() => String)
  passphrase: string;

  @Field(() => Number)
  delay: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  nextMessage: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
