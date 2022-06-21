import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { CommonService } from 'src/app/services/common.service';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private common: CommonService, private serverHttp: ServerHttpService, private router: Router) { }

  ngOnInit(): void {
    this.loadData()
  }
  public loadData() {
    this.serverHttp.getStudents().subscribe(data => {
      this.students = data
      this.common.setTotalStudents(data.length);
    })
  }

  public addStudent() {
    this.router.navigate(['create'])
  }

  public deleteStudent(studentId: string) {
    this.serverHttp.deleteStudent(studentId).subscribe(data => {
      this.loadData()
    });
  }

  public editStudent(studentId: string) {
    this.router.navigate(['create', studentId])
  }
}
