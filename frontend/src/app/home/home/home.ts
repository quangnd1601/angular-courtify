import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentList } from '../../components/student-list/student-list';

export interface IStudent {
  id: number;
  name: string;
  gender: string;
  score: number;
  passed?: boolean;
}
@Component({
  selector: 'app-home',
  imports: [CommonModule, StudentList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  students: IStudent[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      gender: 'Name',
      score: 8.56,
      passed: true,
    },
    {
      id: 2,
      name: 'Nguyễn Thị B',
      gender: 'Nữ',
      score: 8.56,
      passed: true,
    },
    {
      id: 3,
      name: 'Nguyễn Văn C',
      gender: 'Name',
      score: 8.56,
      passed: true,
    },
    {
      id: 4,
      name: 'Nguyễn Văn D',
      gender: 'Nam',
      score: 3.5,
      passed: false,
    },
  ];

  // xóa
  handleDetele2 = (id: number) => {
    const index = this.students.findIndex((item) => item.id === id);
    console.log(index);

    if (index !== -1) {
      this.students.splice(index, 1);
    }
  };
}
