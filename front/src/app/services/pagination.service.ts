import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private itemsPerPage: number = 9;
  private currentPage: number = 1;
  private totalPages: number = 0;

  setItemsPerPage(items: number): void {
    this.itemsPerPage = items;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  calculateTotalPages(totalItems: number): number {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return this.totalPages;
  }

  generatePages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  paginate<T>(items: T[], page: number): T[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  goToPage(page: number): number {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
    return this.currentPage;
  }
}
