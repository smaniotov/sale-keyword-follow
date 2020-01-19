import 'reflect-metadata';
import { Service } from 'typedi';
import addMinutes from 'date-fns/addMinutes';
import { AlertType } from '../types/Alert';
import { CreateOrUpdateAlertInputType } from '../validators';
import AlertRepository from '../repositories/AlertRepository';

@Service()
export default class AlertService {
  private alertRepository: AlertRepository;

  constructor(alertRepository: AlertRepository) {
    this.alertRepository = alertRepository;
  }

  public findAlerts = async (alert: Partial<AlertType>) => this.alertRepository.findAll(alert);

  public createAlert = async (alert: CreateOrUpdateAlertInputType) => {
    const createdAt = new Date();
    const nextMessage = addMinutes(createdAt, alert.delay);
    const alertType = new AlertType({
      ...alert, isActive: true, createdAt, nextMessage,
    });
    await this.alertRepository.insertOne(alertType);
    return 'Ok';
  };
}
