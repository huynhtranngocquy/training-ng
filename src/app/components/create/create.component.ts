import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { CommonService } from 'src/app/services/common.service';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public id: any = 0;
  public studentForm = new FormGroup({
    gender: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    dob: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
    avatar: new FormControl(null),
  })

  constructor(private route: ActivatedRoute, private common: CommonService, private serverHttp: ServerHttpService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.studentForm.valid);

    this.id = this.route.snapshot.paramMap.get('id');
    if (+this.id > 0) {
      this.loadData(this.id);
    }
  }

  private loadData(id: number) {
    this.serverHttp.getStudent(id).subscribe(data => {
      console.log(data);
      for (const controlName in this.studentForm.controls) {
        if (controlName) {
          this.studentForm.controls[controlName as keyof typeof this.studentForm.controls].setValue(data[controlName]);
        }
      }
    })

  }
  public createNewData() {
    let newStudent: any = {};
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        newStudent = this.studentForm.value;
      }
    }
    return newStudent;
  }
  public saveAndGoToList() {
    if (+this.id > 0) {
      this.serverHttp.updateStudent(this.id, this.createNewData()).subscribe(data => {
        this.router.navigate(['/'])
      })

    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        this.router.navigate(['/'])
      })
    }

  }

  public save() {
    if (+this.id > 0) {
      this.serverHttp.updateStudent(this.id, this.createNewData()).subscribe(data => {
        this.studentForm.reset();
      })

    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        this.common.incrementStudent();
        this.studentForm.reset();
      })
    }
  }
}
