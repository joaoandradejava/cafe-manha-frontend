import { CadastroColaboradorComponent } from './views/cadastroColaborador/cadastrocolaborador.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradorComponent } from './views/colaborador/colaborador.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CafeManhaComponent } from './components/cafe-manha/cafe-manha.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    ColaboradorComponent,
    CadastroColaboradorComponent,
    CafeManhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxBootstrapConfirmModule,
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
