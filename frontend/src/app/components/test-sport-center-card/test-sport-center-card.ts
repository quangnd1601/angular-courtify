import { Component, Input } from '@angular/core';
import { Sport } from '../../interfaces/sport';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-sport-center-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './test-sport-center-card.html',
  styleUrl: './test-sport-center-card.css',
})
export class TestSportCenterCard {
  @Input() sports: Sport[] =[];
}
