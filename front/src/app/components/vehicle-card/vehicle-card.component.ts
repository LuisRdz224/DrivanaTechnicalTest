import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'vehicle-card',
  standalone: false,

  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Output() cardClicked: EventEmitter<number> = new EventEmitter<number>();

  handleCardClick(): void {
    this.cardClicked.emit(this.vehicle.id);
  }
}