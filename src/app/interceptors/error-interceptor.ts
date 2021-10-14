import { ProblemDetail } from './../utils/problem-detail';
import { AlertaService } from './../services/alerta.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators'
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertaService: AlertaService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error) => {
      let problemDetail: ProblemDetail = error.error
      let mensagem: string = ''
      if(problemDetail.errors != null && problemDetail.errors != undefined && problemDetail.errors.length > 0){
        mensagem = problemDetail.errors[0].userMessage
      }else{
        mensagem = problemDetail.userMessage
      }

      this.alertaService.alertaError(mensagem)
      throw error
    }));
  }
}
