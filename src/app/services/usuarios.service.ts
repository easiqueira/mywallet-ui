import { AtualizarUsuario } from './../models/AtualizarUsuario';
import { DadosLogin } from './../models/DadosLogin';
import { DadosRegistro } from './../models/DadosRegistro';
import { Usuario } from './../models/Usuario';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  //url = 'api/Usuarios';
  url = `${environment.mainUrlApi}api/Usuarios`;

  constructor(private http: HttpClient) {}

  SalvarFoto(formData: any): Observable<any> {
    const apiUrl = `${this.url}/SalvarFoto`;
    return this.http.post<any>(apiUrl, formData);
  }

  RegistrarUsuario(dadosRegistro: DadosRegistro): Observable<any> {
    const apiUrl = `${this.url}/RegistrarUsuario`;
    return this.http.post<DadosRegistro>(apiUrl, dadosRegistro, httpOptions);
  }

  LogarUsuario(dadosLogin: DadosLogin): Observable<any> {
    const apiUrl = `${this.url}/LogarUsuario`;
    return this.http.post<DadosRegistro>(apiUrl, dadosLogin, httpOptions);
  }

  RetornarFotoUsuario(id: string): Observable<any> {
    const apiUrl = `${this.url}/RetornarFotoUsuario/${id}`;
    return this.http.get<any>(apiUrl);
  }

  ObterUsuarioPeloId(id: string): Observable<AtualizarUsuario> {
    const apiUrl = `${this.url}/${id}`;    
    return this.http.get<AtualizarUsuario>(apiUrl);
  }

  ObterTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  FiltrarUsuarios(nomeUsuario: string): Observable<Usuario[]>{
    const apiUrl = `${this.url}/FiltrarUsuarios/${nomeUsuario}`;
    return this.http.get<Usuario[]>(apiUrl);
  }

  ExcluirUsuario(usuarioId: number): Observable<any>{
    const apiUrl = `${this.url}/${usuarioId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  AtualizarUsuario(atualizarUsuario: AtualizarUsuario): Observable<any> {
    const apiUrl = `${this.url}/AtualizarUsuario`;
    return this.http.put<AtualizarUsuario>(
      apiUrl,
      atualizarUsuario,
      httpOptions2
    );
  }
}
