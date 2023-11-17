export interface IStreet {
  id: number;
  name: string;
  postcode: string;
  recyclingAndWaste: string;
  url: string;
}

export interface IDate {
  id: number;
  binType: string;
  date: string; //this can be removed slowly
  name: string;
  dateObject: Date;
}

export interface INotification {
  id: number;
  title: string;
  message: string;
  date: string;
}
