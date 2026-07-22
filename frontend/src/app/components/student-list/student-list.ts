import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../home/home/home';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  @Input() students: IStudent[] = [];
  @Output() dataEvent = new EventEmitter();

  handleDetele = (id: number) => {
    // console.log(id);
    this.dataEvent.emit(id);
  };
  // tính tổng
  get totalPrice(): number {
    const sum = this.students.reduce((total, item) => {
      return total + item.score;
    }, 0);
    return sum;
  }
}
