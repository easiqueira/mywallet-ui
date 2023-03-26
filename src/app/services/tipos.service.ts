import { Tipo } from './../models/Tipo';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TiposService {
  url: string = 'api/TiposMovimentacao';

  constructor(private http: HttpClient) {}

  ObterTodos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.url);
  }

  ObterTipoMovimentacaoPeloId(idTipoMovimentacao: number): Observable<Tipo>{
    const apiUrl = `${this.url}/${idTipoMovimentacao}`;
    return this.http.get<Tipo>(apiUrl);
  }

  NovoTipoMovimentacao(tipo: Tipo): Observable<any>{
    return this.http.post<Tipo>(this.url, tipo, httpOptions);
  }

  AtualizarTipoMovimentacao(idTipoMovimentacao: number, tipo: Tipo): Observable<any>{
    const apiUrl = `${this.url}/${idTipoMovimentacao}`;
    return this.http.put<Tipo>(apiUrl, tipo, httpOptions);
  }

  ExcluirTipoMovimentacao(idTipoMovimentacao: number): Observable<any>{
    const apiUrl = `${this.url}/${idTipoMovimentacao}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FiltrarTiposMovimentacao(nomeTipo: string): Observable<Tipo[]>{
    const apiUrl = `${this.url}/FiltrarTiposMovimentacao/${nomeTipo}`;
    return this.http.get<Tipo[]>(apiUrl);
  }
}
