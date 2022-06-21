import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public totalStudents = 0;
  public totalStudents$ = new BehaviorSubject<number>(0);

  constructor() { }

  public setTotalStudents(total: number) {
    this.totalStudents = total;
    this.totalStudents$.next(total); // notify all of the change of totalStudents
  }

  public incrementStudent() {
    this.totalStudents++;
    this.totalStudents$.next(this.totalStudents++);
  }
}
