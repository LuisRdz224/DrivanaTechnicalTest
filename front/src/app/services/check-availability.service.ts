import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CheckAvailabilityRequest, CheckAvailabilityResponse, ApiError } from '../models/check-availability.model';

@Injectable({
  providedIn: 'root',
})
export class CheckVehicleAvailabilityService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  checkAvailability(request: CheckAvailabilityRequest): Observable<CheckAvailabilityResponse> {
    return this.http.post<CheckAvailabilityResponse>(`${this.apiUrl}/check-availability`, request).pipe(
      catchError((error) => {
        const apiError: ApiError = error.error;
        return throwError(() => apiError);
      })
    );
  }
}
