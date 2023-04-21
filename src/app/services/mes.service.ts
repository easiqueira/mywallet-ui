import { Mes } from './../models/Mes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  //url = 'api/Meses';
  url = `${environment.mainUrlApi}api/Meses`;

  constructor(private http: HttpClient) { }

  ObterTodos(): Observable<Mes[]>{
    return this.http.get<Mes[]>(this.url);
  }
}
