import { Service } from 'typedi';
import BaseRepository from './BaseRepository';
import { IAlert } from '../models';
import { CollectionEnum } from '../enums';

@Service()
export default class AlertRepository extends BaseRepository<IAlert> {
  constructor() {
    super(CollectionEnum.Alert);
  }
}
