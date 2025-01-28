import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Vehicle, VehicleResponse } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<VehicleResponse[]>(this.apiUrl).pipe(
      map((vehicles) => {
        return vehicles.map((vehicle) => {
          const isReservedToday = vehicle.reservations.some((reservation) => {
            const startDate = reservation.start_date;
            const endDate = reservation.end_date;

            return today >= startDate && today <= endDate;
          });

          return {
            id: vehicle.id,
            name: vehicle.name,
            pricePerDay: vehicle.price_per_day,
            status: isReservedToday ? 'Reserved' : 'Available',
            reservations: vehicle.reservations.map((res) => ({
              startDate: res.start_date,
              endDate: res.end_date,
            })),
          };
        });
      })
    );
  }
}
