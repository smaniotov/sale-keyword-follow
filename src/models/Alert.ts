export interface IAlert {
  _id?: any
  sendTo: string
  delay: number
  nextMessage: Date
  history: IAlertHistory[]
  keyword: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IAlertHistory {
  keyword: string
  sentTo: string
  body: string
  sentAt: Date
}

export enum AlertDelayEnum {
  TwoMinutes = 2,
  TemMinutes = 10,
  ThirtyMinutes = 30
}
