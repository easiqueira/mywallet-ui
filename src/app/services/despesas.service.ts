import { Despesa } from './../models/Despesa';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

//url = 'api/Despesas';
  url = `${environment.mainUrlApi}api/Despesas`;

  constructor(private http: HttpClient) { }

  ObterDespesasPeloUsuarioId(usuarioId: string): Observable<Despesa[]>{
    const apiUrl = `${this.url}/ObterDespesasPeloUsuarioId/${usuarioId}`;
    return this.http.get<Despesa[]>(apiUrl);
  }

  ObterDespesaPeloId(despesaId: number): Observable<Despesa>{
    const apiUrl = `${this.url}/${despesaId}`;
    return this.http.get<Despesa>(apiUrl);
  }

  NovaDespesa(despesa: Despesa): Observable<any>{
    return this.http.post<Despesa>(this.url, despesa, httpOptions);
  }

  AtualizarDespesa(despesaId: number, despesa: Despesa): Observable<any>{
    const apiUrl = `${this.url}/${despesaId}`;
    return this.http.put<Despesa>(apiUrl, despesa, httpOptions);
  }

  ExcluirDespesa(despesaId: number): Observable<any>{
    const apiUrl = `${this.url}/${despesaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FiltrarDespesas(nomeCategoria: string): Observable<Despesa[]>{
    const apiUrl = `${this.url}/FiltrarDespesas/${nomeCategoria}`;
    return this.http.get<Despesa[]>(apiUrl);
  }
}
