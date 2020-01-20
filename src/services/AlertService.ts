import 'reflect-metadata';
import { Service } from 'typedi';
import addMinutes from 'date-fns/addMinutes';
import { AlertType } from '../types/Alert';
import AlertRepository from '../repositories/AlertRepository';
import { CreateAlertInputType, UpdateAlertInputType } from '../validators/Alert';

@Service()
export default class AlertService {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

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
