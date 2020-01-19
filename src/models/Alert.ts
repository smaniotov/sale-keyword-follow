export interface IAlert {
  sendTo: string
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
