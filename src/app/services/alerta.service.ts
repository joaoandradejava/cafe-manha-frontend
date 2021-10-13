import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  public alertaSucesso(mensagem: string): void {
    Swal.fire(
      'Sucesso!',
      mensagem,
      'success'
    )
  }

  public alertaError(mensagem: string): void {
    Swal.fire(
      'Ops...',
      mensagem,
      'error'
    )
  }

  public alertaAviso(mensagem: string): void {
    Swal.fire(
      'Aviso...',
      mensagem,
      'warning'
    )
  }
}
