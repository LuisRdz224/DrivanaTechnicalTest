import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleFilterService {
  private dateRange = new BehaviorSubject<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  dateRange$ = this.dateRange.asObservable();

  updateDateRange(startDate: string, endDate: string): void {
    this.dateRange.next({ startDate, endDate });
  }
}
