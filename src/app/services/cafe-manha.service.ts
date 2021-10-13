import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { CafeManhaInput } from './../models/cafe-manha-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CafeManhaService {

  constructor(private http: HttpClient) { }

  public inserir(cafeManhaInput: CafeManhaInput, colaboradorId: number): Observable<any> {
    return this.http.post(Backend.cafeManha(colaboradorId), cafeManhaInput)
  }

  public atualizar(cafeManhaInput: CafeManhaInput, colaboradorId: number, cafeManhaId: number): Observable<any> {
    return this.http.put(Backend.cafeManha(colaboradorId) + `/${cafeManhaId}`, cafeManhaInput)
  }

  public deletar(colaboradorId: number, cafeId: number): Observable<any>{
    return this.http.delete(Backend.cafeManha(colaboradorId) + `/${cafeId}`)
  }
}
