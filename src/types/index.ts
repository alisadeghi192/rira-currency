export interface Rates {
  dollar: number;
  euro: number;
  yuan: number;
  gold: number;
  coin: number;
  aed: number;
  lira: number;
  pound: number;
  tether: number;
  bitcoin: number;
  gold24: number;
  bahar: number;
  half: number;
  quarter: number;
  gram: number;
  cad: number;
  aud: number;
  chf: number;
  sar: number;
  qar: number;
  kwd: number;
  omr: number;
  iqd: number;
  afn: number;
  rub: number;
  inr: number;
  mesghal: number;
  silver: number;
}

export interface ApiResponse {
  date: string;
  time: string;
  rates: Rates;
}