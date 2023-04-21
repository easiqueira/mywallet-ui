import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type' : 'apllication/json'
//   })
// };

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //url = 'api/Dashboard';
  url = `${environment.mainUrlApi}api/Dashboard`;

  constructor(private http: HttpClient) { }

  ObterDadosCardsDashboard(usuarioId: string): Observable<any>{
    const apiUrl = `${this.url}/ObterDadosCardsDashboard/${usuarioId}`;
    return this.http.get<any>(apiUrl, httpOptions);
  }

  ObterDadosAnuaisPeloUsuarioId(usuarioId: string, ano: number): Observable<any>
  {
    const apiUrl = `${this.url}/ObterDadosAnuaisPeloUsuarioId/${usuarioId}/${ano}`;
    return this.http.get<any>(apiUrl, httpOptions);
  }
}
