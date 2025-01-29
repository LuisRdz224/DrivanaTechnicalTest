import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CheckVehicleAvailabilityService } from '../../services/check-availability.service';
import { ReservationService } from '../../services/reservation.service';
import { ApiError, CheckAvailabilityRequest, CheckAvailabilityResponse } from '../../models/check-availability.model';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  itemsPerPage = 9;
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];

  vehicles: Vehicle[] = [];
  paginatedVehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  isModalOpen = false;
  selectedVehicle: Vehicle | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  startDate?: Date;
  endDate?: Date;
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  blockedDates: Date[] = [];
  bsConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
  };

  constructor(
    private vehicleService: VehicleService,
    private availabilityService: CheckVehicleAvailabilityService,
    private reservationService: ReservationService,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
      this.filteredVehicles = [...this.vehicles];

      this.paginationService.setItemsPerPage(9);
      this.totalPages = this.paginationService.calculateTotalPages(this.filteredVehicles.length);
      this.pages = this.paginationService.generatePages();
      this.updatePaginatedVehicles(1, this.filteredVehicles);
    });
  }


  updatePaginatedVehicles(page: number, vehicles: Vehicle[] = this.vehicles): void {
    this.paginatedVehicles = this.paginationService.paginate(vehicles, page);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedVehicles(this.currentPage, this.filteredVehicles);
    }
  }

  applyFilters(filters: { status: string; priceRange: { min: number; max: number } }): void {
    this.filteredVehicles = [...this.vehicles];

    if (filters.status === 'reserved') {
      this.filteredVehicles = this.filteredVehicles.filter((v) => v.status === 'Reserved');
    } else if (filters.status === 'available') {
      this.filteredVehicles = this.filteredVehicles.filter((v) => v.status === 'Available');
    }

    this.filteredVehicles = this.filteredVehicles.filter(
      (v) => v.pricePerDay >= filters.priceRange.min && v.pricePerDay <= filters.priceRange.max
    );

    this.totalPages = this.paginationService.calculateTotalPages(this.filteredVehicles.length);
    this.pages = this.paginationService.generatePages();
    this.updatePaginatedVehicles(1, this.filteredVehicles);
  }

  makeReservation(): void {
    if (this.startDate && this.endDate && this.selectedVehicle) {
      const reservationData = {
        id: this.selectedVehicle.id.toString(),
        start_date: this.startDate.toISOString().split('T')[0],
        end_date: this.endDate.toISOString().split('T')[0],
      };

      this.reservationService.makeReservation(reservationData).subscribe({
        next: (response) => {
          this.handleReservationSuccess(response);
        },
        error: (err) => {
          this.handleReservationError(err.error);
        },
      });
    }
  }

  private handleReservationSuccess(response: any): void {
    this.successMessage = response.message;
    this.errorMessage = null;

    const updatedVehicle = response.vehicle;
    const index = this.vehicles.findIndex((v) => v.id === updatedVehicle.id);
    if (index !== -1) {
      this.vehicles[index] = {
        ...this.vehicles[index],
        ...updatedVehicle,
        reservations: [...updatedVehicle.reservations],
        status: updatedVehicle.reservations.length > 0 ? 'Reserved' : 'Available',
      };
    }
    this.updatePaginatedVehicles(1);
  }

  private handleReservationError(err: any): void {
    console.error('Reservation Error:', err);

    if (err && err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      this.errorMessage = err.errors.map((e: { msg: string }) => e.msg).join(', ');
    } else if (err && err.message) {
      this.errorMessage = err.message;
    } else {
      this.errorMessage = 'Error while making reservation. Please try again.';
    }

    this.successMessage = null;
  }


  openModal(vehicleId: number): void {
    this.selectedVehicle = this.vehicles.find(v => v.id === vehicleId) || null;
    this.isModalOpen = true;
    this.resetMessages();
    this.generateBlockedDates();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedVehicle = null;
  }

  validateDates(): void {
    if (this.startDate) {
      this.startDate = this.normalizeDate(this.startDate);
    }
    if (this.endDate) {
      this.endDate = this.normalizeDate(this.endDate);
    }

    if (this.startDate && this.endDate) {
      if (this.endDate < this.startDate) {
        this.endDate = this.startDate;
      }
    }
  }

  normalizeDate(date: Date): Date {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    return localDate;
  }

  checkAvailability(): void {
    this.validateDates();
    if (this.startDate && this.endDate && this.selectedVehicle) {
      const requestBody: CheckAvailabilityRequest = {
        id: this.selectedVehicle.id,
        start_date: this.startDate.toISOString().split('T')[0],
        end_date: this.endDate.toISOString().split('T')[0],
      };
      this.availabilityService.checkAvailability(requestBody).subscribe({
        next: (response: CheckAvailabilityResponse) => {
          this.successMessage = `${response.message}`;
          this.errorMessage = null;
        },
        error: (err: ApiError) => {
          this.errorMessage = err.errors[0]?.msg || 'An unknown error occurred.';
          this.successMessage = null;
        },
      });
    }
  }

  private resetMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  generateBlockedDates(): void {
    this.blockedDates = [];
    if (this.selectedVehicle?.reservations) {
      this.selectedVehicle.reservations.forEach((reservation) => {
        const start = this.normalizeDate(this.parseDateToLocal(reservation.startDate));
        const end = this.normalizeDate(this.parseDateToLocal(reservation.endDate));
        for (
          let d = new Date(start);
          d <= end;
          d.setDate(d.getDate() + 1)
        ) {
          this.blockedDates.push(new Date(d.getTime()));
        }
      });
    }
  }

  parseDateToLocal(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  isDateBlocked = (date: Date): boolean => {
    return this.blockedDates.some(
      (blockedDate) =>
        date.toISOString().split('T')[0] ===
        blockedDate.toISOString().split('T')[0]
    );
  };
}