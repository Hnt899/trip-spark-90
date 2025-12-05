export interface EpdData {
  orderNumber: string;

  trainNumber: string;
  trainName: string;

  carriage: string;
  seat: string;
  seatType: string;

  depTime: string;
  depDate: string;
  depCity: string;
  depStation: string;
  depAddress: string;
  depTz: string;

  arrTime: string;
  arrDate: string;
  arrCity: string;
  arrStation: string;
  arrAddress: string;
  arrTz: string;

  passengerFullName: string;
  documentType: string; // Тип документа (паспорт, права и т.д.)
  documentSeries: string; // Серия документа
  documentNumber: string; // Номер документа
  birthDate: string; // Дата рождения (без РФ)

  routeShort: string;
  infoText?: string;
}

