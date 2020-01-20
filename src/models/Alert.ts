export interface IAlert {
  _id?: any
  sendTo: string
  delay: number
  nextMessage: Date
  history: IAlertHistory[]
  passphrase: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IAlertHistory {
  passphrase: string
  sentTo: string
  body: string
  sentAt: Date
}

export enum AlertDelayEnum {
  TwoMinutes = 2,
  FiveMinutes = 5,
  TenMinutes = 10
}
