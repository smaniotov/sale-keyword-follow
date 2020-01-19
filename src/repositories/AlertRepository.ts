import { Service } from 'typedi';
import BaseRepository from './BaseRepository';
import { CollectionEnum, IAlert } from '../models';

@Service()
export default class AlertRepository extends BaseRepository<IAlert> {
  constructor() {
    super(CollectionEnum.Alert);
  }
}
