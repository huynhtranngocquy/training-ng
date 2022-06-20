import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  display: boolean = false;

  showDialog() {
    this.display = true;
    console.log('asd');
  }
  students: Student[] = [];

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit(): void {
    this.serverHttp.getStudents().subscribe(data => this.students = data)
  }
}
