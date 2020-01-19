import { Service } from 'typedi';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import 'reflect-metadata';
import { AlertType } from '../types';
import { CreateOrUpdateAlertInputType } from '../validators';
import { AlertService } from '../services';

@Service()
@Resolver(AlertType)
export default class AlertResolver {
  private readonly alertService: AlertService;

  constructor(alertService: AlertService) {
    this.alertService = alertService;
  }

  @Query(() => AlertType)
  async getAlerts(@Arg('sendTo') sendTo: string) {
    return this.alertService.findAlerts({ sendTo });
  }

  @Mutation(() => String)
  async createAlert(@Arg('alert') alert: CreateOrUpdateAlertInputType) {
    return this.alertService.createAlert(alert);
  }
}
