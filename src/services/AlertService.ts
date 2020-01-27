import addMinutes from 'date-fns/addMinutes';
import isRegExp from 'lodash/isRegExp';
import 'reflect-metadata';
import { Service } from 'typedi';
import AlertRepository from '../repositories/AlertRepository';
import { AlertType } from '../types/Alert';
import { CreateAlertInputType, UpdateAlertInputType } from '../validators/Alert';
import { PageSortOption } from '../models';

@Service()
export default class AlertService {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  public findAlertsPage = async (
    keyword: string, pageNum: number, size: number, sort: PageSortOption,
  ) => {
    const keywordRegex = keyword ? new RegExp(`${keyword}`, 'gi') : null;
    const keys = ['keyword', 'delay', 'sendTo'];
    const searchPayload = isRegExp(keywordRegex)
      ? keys.map((key) => ({ [key]: keywordRegex }))
      : [];

    const page = await this.alertRepository
      .findPage(searchPayload.length > 0 ? { $or: searchPayload } : {}, pageNum, size, sort);
    return page[0] as any;
  };

  public findAlerts = async (alert: Partial<AlertType>) => this.alertRepository.findAll(alert);

  public createAlert = async (alert: CreateAlertInputType) => {
    const createdAt = new Date();
    const nextMessage = addMinutes(createdAt, alert.delay);
    const alertType = new AlertType({
      ...alert, isActive: true, createdAt, nextMessage, updatedAt: createdAt,
    });
    await this.alertRepository.insertOne(alertType);
    return 'Ok';
  };

  public deleteAlert = async (alertQuery: Partial<AlertType>) => (
    this.alertRepository.deleteOne(alertQuery)
  );

  public updateAlert =
    async (alertQuery: Partial<AlertType>, alertPayload: UpdateAlertInputType) => (
      this.alertRepository
        .updateOne(alertQuery, { $set: { ...alertPayload, updatedAt: new Date() } })
    );
}
