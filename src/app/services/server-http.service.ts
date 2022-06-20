import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ServerHttpService {
  private URL = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) {
  }

  public getStudents(): Observable<any> {
    const URI = `${this.URL}/students`;
    return this.httpClient.get<any>(URI, this.httpOptions).pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("an error occurred:", error.error.message);
    } else {
      console.error(
        `backend returned code ${error.status} ` + `body was: ${error.error}`
      )
    }
    return throwError('something bad happened, please try again later');
  }
}
