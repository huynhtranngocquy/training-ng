import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { ServerHttpService } from './services/server-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learn-ng';

  public totalStudents = 0;

  constructor(private common: CommonService, private serverHttp: ServerHttpService) { }

  ngOnInit(): void {
    this.common.totalStudents$.subscribe(total => {
      this.totalStudents = total;
    })
    if (this.common.totalStudents === 0) {
      this.serverHttp.getStudents().subscribe(data => this.common.setTotalStudents(data.length))
    }
  }
}
