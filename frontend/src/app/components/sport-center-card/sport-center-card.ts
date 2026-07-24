import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SportCenter } from '../../interfaces/sport-center';

@Component({
  selector: 'app-sport-center-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './sport-center-card.html',
  styleUrl: './sport-center-card.css'
})
export class SportCenterCard {
  @Input({ required: true }) center!: SportCenter;
}
