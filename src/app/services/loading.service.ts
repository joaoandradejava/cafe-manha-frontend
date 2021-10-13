import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinner: NgxSpinnerService) { }

  public mostrar(): void {
    this.spinner.show()
  }

  public ocultar(): void {
    this.spinner.hide()
  }
}
