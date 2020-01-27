import { Service } from 'typedi';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import 'reflect-metadata';
import { ObjectID } from 'mongodb';
import { AlertType } from '../types';
import { AlertService } from '../services';
import { CreateAlertInputType, UpdateAlertInputType } from '../validators/Alert';
import PageTypeWrapper from '../types/util/PageType';
import { PageSortOption } from '../models';

const AlertPage = PageTypeWrapper(AlertType);
type AlertPage = InstanceType<typeof AlertPage>;


@Service()
@Resolver(AlertType)
export default class AlertResolver {
  private readonly alertService: AlertService;

  constructor(alertService: AlertService) {
    this.alertService = alertService;
  }

  @Query(() => [AlertType])
  async getAlertsBySendTo(@Arg('sendTo') sendTo: string) {
    return this.alertService.findAlerts({ sendTo });
  }

  @Query(() => AlertPage)
  async getAlertsPage(
    @Arg('keyword', { nullable: true }) keyword: string,
      @Arg('page', { nullable: true }) page: number = 0,
      @Arg('size', { nullable: true }) size: number = 10,
      @Arg('sort', { nullable: true }) sort: PageSortOption,
  ): Promise<AlertPage> {
    return this.alertService.findAlertsPage(keyword, page, size, sort);
  }

  @Query(() => [AlertType])
  async getAllAlerts() {
    return this.alertService.findAlerts({});
  }

  @Mutation(() => String)
  async createAlert(@Arg('alert') alert: CreateAlertInputType) {
    return this.alertService.createAlert(alert);
  }

  @Mutation(() => String)
  async updateAlert(@Arg('id') id: string, @Arg('alert') alert: UpdateAlertInputType) {
    await this.alertService.updateAlert({ _id: new ObjectID(id) }, alert);
    return 'Ok';
  }

  @Mutation(() => String)
  async deleteAlert(@Arg('id') id: string) {
    await this.alertService.deleteAlert({ _id: new ObjectID(id) });
    return 'Ok';
  }
}
