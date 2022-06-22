import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public id: any = 0;
  studentForm: FormGroup;

  // public studentForm = new FormGroup({
  //   gender: new FormControl('', [
  //     Validators.required
  //   ]),
  //   firstName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(10)
  //   ]),
  //   lastName: new FormControl('',
  //     [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(10)
  //     ]),
  //   dob: new FormControl(''),
  //   email: new FormControl(''),
  //   phone: new FormControl(''),
  //   avatar: new FormControl(''),
  // })

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private common: CommonService, private serverHttp: ServerHttpService, private router: Router) { }

  ngOnInit(): void {

    this.studentForm = this.fb.group({
      gender: new FormControl('', [
        Validators.required
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      lastName: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]),
      dob: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)
      ]),
      avatar: new FormControl('',[
        Validators.required
      ]),
    })




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
