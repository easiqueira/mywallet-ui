import { Cartao } from './../models/Cartao';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CartoesService {

  url = `${environment.mainUrlApi}api/Cartoes`;
  //url = 'api/Cartoes';

  constructor(private http: HttpClient) {}

  ObterCartaoPeloId(cartaoId: number): Observable<Cartao> {
    const apiUrl = `${this.url}/${cartaoId}`;
    return this.http.get<Cartao>(apiUrl);
  }

  ObterCartoesPeloUsuarioId(usuarioId: string): Observable<Cartao[]> {
    const apiUrl = `${this.url}/ObterCartoesPeloUsuarioId/${usuarioId}`;
    return this.http.get<Cartao[]>(apiUrl, httpOptions);
  }

  NovoCartao(cartao: Cartao): Observable<any> {
    return this.http.post<Cartao>(this.url, cartao, httpOptions);
  }

  AtualizarCartao(cartaoId: number, cartao: Cartao): Observable<any> {
    const apiUrl = `${this.url}/${cartaoId}`;
    return this.http.put<Cartao>(apiUrl, cartao, httpOptions);
  }

  ExcluirCartao(cartaoId: number): Observable<any> {
    const apiUrl = `${this.url}/${cartaoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FiltrarCartoes(numeroCartao: string): Observable<Cartao[]>{
    const apiUrl = `${this.url}/FiltrarCartoes/${numeroCartao}`;
    return this.http.get<Cartao[]>(apiUrl);
  }
}
