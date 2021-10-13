import { ColaboradorComponent } from './views/colaborador/colaborador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroColaboradorComponent } from './views/cadastroColaborador/cadastrocolaborador.component';

const routes: Routes = [
  {path: '', redirectTo: 'colaboradores', pathMatch: 'full'},
  {path: 'colaboradores', component: ColaboradorComponent},
  {path: 'formulario/cadastro-colaborador', component: CadastroColaboradorComponent},
  {path: 'formulario/cadastro-colaborador/:id', component: CadastroColaboradorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
