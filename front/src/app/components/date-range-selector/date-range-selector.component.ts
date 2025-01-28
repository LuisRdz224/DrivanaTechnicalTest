import { Component } from '@angular/core';

@Component({
  selector: 'date-range-selector',
  standalone: false,
  templateUrl: './date-range-selector.component.html',
  styleUrl: './date-range-selector.component.css'
})
export class DateRangeSelectorComponent {
  today: string = new Date().toISOString().split('T')[0];

  startDate: string = '';
  endDate: string = '';

  onDateChange(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
  }
}