import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AlertType {
  constructor(user) {
    this.email = user.email;
    this.name = user.name;
  }

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}
