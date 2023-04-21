import { Meta } from './../models/Meta';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  //url = 'api/Metas';
  url = `${environment.mainUrlApi}api/Metas`;

  constructor(private http: HttpClient) {}

  ObterTodos(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.url);
  }

  ObterMetaPeloId(idMeta: number): Observable<Meta> {
    const apiUrl = `${this.url}/${idMeta}`;
    return this.http.get<Meta>(apiUrl);
  }

  ObterMetasPeloUsuarioId(usuarioId: string): Observable<Meta[]>{
    const apiUrl = `${this.url}/ObterMetasPeloUsuarioId/${usuarioId}`;
    return this.http.get<Meta[]>(apiUrl);
  }

  NovaMeta(meta: Meta): Observable<any> {
    return this.http.post<Meta>(this.url, meta, httpOptions);
  }

  AtualizarMeta(
    idMeta: number,
    meta: Meta
  ): Observable<any> {
    const apiUrl = `${this.url}/${idMeta}`;
    return this.http.put<Meta>(apiUrl, meta, httpOptions);
  }

  ExcluirMeta(idMeta: number): Observable<any> {
    const apiUrl = `${this.url}/${idMeta}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FiltrarMetas(nomeMeta: string): Observable<Meta[]> {
    const apiUrl = `${this.url}/FiltrarMetas/${nomeMeta}`;
    return this.http.get<Meta[]>(apiUrl);
  }

}
