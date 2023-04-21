import { Reserva } from './../models/Reserva';
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
export class ReservasService {

//url = 'api/Reservas';
url = `${environment.mainUrlApi}api/Reservas`;

  constructor(private http: HttpClient) { }

  ObterReservasPeloUsuarioId(usuarioId: string): Observable<Reserva[]>{
    const apiUrl = `${this.url}/ObterReservasPeloUsuarioId/${usuarioId}`;
    return this.http.get<Reserva[]>(apiUrl);
  }

  ObterReservaPeloId(reservaId: number): Observable<Reserva>{
    const apiUrl = `${this.url}/${reservaId}`;
    return this.http.get<Reserva>(apiUrl);
  }

  NovaReserva(reserva: Reserva): Observable<any>{
    return this.http.post<Reserva>(this.url, reserva, httpOptions);
  }

  AtualizarReserva(reservaId: number, reserva: Reserva): Observable<any>{
    const apiUrl = `${this.url}/${reservaId}`;
    return this.http.put<Reserva>(apiUrl, reserva, httpOptions);
  }

  ExcluirReserva(reservaId: number): Observable<any>{
    const apiUrl = `${this.url}/${reservaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  FiltrarReserva(nomeCategoria: string): Observable<Reserva[]>{
    const apiUrl = `${this.url}/FiltrarReservas/${nomeCategoria}`;
    return this.http.get<Reserva[]>(apiUrl);
  }
}
