import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reserve';

  constructor(private http: HttpClient) { }

  makeReservation(data: { id: string; start_date: string; end_date: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
