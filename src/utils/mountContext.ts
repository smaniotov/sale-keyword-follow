import { Container } from 'typedi';
import AlertService from '../services/AlertService';
import AlertRepository from '../repositories/AlertRepository';

export default (req) => {
  const requestId = req.id;
  const container = Container.of(requestId);
  const context = {
    requestId,
    container,
  };

  container.set('AlertService', AlertService);
  container.set('AlertRepository', AlertRepository);
  container.set('context', context);

  return context;
};
