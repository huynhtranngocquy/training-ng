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
  name: any;
  p: number = 1;

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

  key: string = 'id';
  reverse: boolean = false;
  Sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
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
  
  Search() {
    if (this.name === "") {
      this.ngOnInit()
    } else {
      this.students = this.students.filter((std: any) => {
        return std.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
  }
}
