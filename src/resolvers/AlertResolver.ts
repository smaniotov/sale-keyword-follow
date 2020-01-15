import { Inject, Service } from "typedi";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import "reflect-metadata";
import { AlertType } from "../types";

@Service()
@Resolver(AlertType)
export class AlertResolver {
  constructor(private readonly context) {}

  @Query(() => AlertType)
  async getAnything() {
    console.log(this.context);

    return {
      name: "Testing",
      email: "Testing"
    } as AlertType;
  }
}
