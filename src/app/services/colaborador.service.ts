import { Backend } from '../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColaboradorInput } from '../models/colaborador-input';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient) { }

  public buscarTodos(nome: string, cpf: string, paginaAtual: number, tamanho: number): Observable<any> {
    return this.http.get(Backend.colaborador + `?nome=${nome}&cpf=${cpf}&page=${paginaAtual}&size=${tamanho}`)
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.colaborador + `/${id}`)
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(Backend.colaborador + `/${id}`)
  }

  public salvar(colaboradorInput: ColaboradorInput): Observable<any> {
    return this.http.post(Backend.colaborador, colaboradorInput)
  }

  public atualizar(colaboradorInput: ColaboradorInput, id: number): Observable<any> {
    return this.http.put(Backend.colaborador + `/${id}`, colaboradorInput)
  }

}
