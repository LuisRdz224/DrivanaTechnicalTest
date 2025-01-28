import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filters',
  standalone: false,

  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<any>();

  statusFilter: string = 'all';
  priceRange: { min: number; max: number } = { min: 0, max: 2500 };

  applyFilters(): void {
    this.filterChange.emit({
      status: this.statusFilter,
      priceRange: this.priceRange,
    });
  }
}