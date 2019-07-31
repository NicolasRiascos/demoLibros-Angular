import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Libro } from './interfaces/libro';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  configUrl = 'https://demolibros-lean-llama.mybluemix.net/';

  getLibro(): any {
    // now returns an Observable of Config
    return this.http.get(this.configUrl.concat('libros'));
  }

  /** POST: add a new book to the database */
 addLibro(libro: Libro) {
  return this.http.post(this.configUrl.concat('addLibro'), libro, httpOptions);
}



}


