export interface VehicleResponse {
  id: number;
  name: string;
  price_per_day: number;
  reservations: { start_date: string; end_date: string }[];
}

export interface Vehicle {
  id: number;
  name: string;
  pricePerDay: number;
  status: string;
  reservations: { startDate: string; endDate: string }[];
}
