import { AlertaService } from '../../services/alerta.service';
import { FormularioValidator } from '../../utils/formulario-validator';
import { ColaboradorService } from '../../services/colaborador.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrocolaborador',
  templateUrl: './cadastrocolaborador.component.html',
  styleUrls: ['./cadastrocolaborador.component.scss']
})
export class CadastroColaboradorComponent implements OnInit {

  formulario: FormGroup
  id: number = -1
  texto: string = ''


  constructor(private formBuilder: FormBuilder, private colaboradorService: ColaboradorService, private alertaService: AlertaService, private route: ActivatedRoute, private router: Router) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "cpf": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
    })

    this.inicializarComponente()
   }

  ngOnInit(): void {
  }

  inicializarComponente(): void {
    this.route.params.subscribe(data => {
      if(data.id){
        this.id = data.id
      }
    })

    this.texto = this.isAtualizar() ? 'Atualizar': 'Inserir'

    if(this.isAtualizar()){
      this.colaboradorService.buscarPorId(this.id).subscribe(data => {
        this.formulario.get('nome')?.setValue(data.nome)
        this.formulario.get('cpf')?.setValue(data.cpf)

      })
    }
  }

  public isAtualizar(): boolean{
    return this.id > 0? true : false
  }




  public salvar(): void {
    if(this.formulario.invalid){
      return
    }

    let mensagem: string = `Colaborador ${this.isAtualizar()? 'Atualizado': 'Inserido'} com sucesso!`

    if(this.isAtualizar()){
      this.colaboradorService.atualizar(this.formulario.value, this.id).subscribe(data => {
        this.alertaService.alertaSucesso(mensagem)
        this.router.navigate([''])
      })
    }else{
      this.colaboradorService.salvar(this.formulario.value).subscribe(data => {
        this.alertaService.alertaSucesso(mensagem)
        this.router.navigate([''])

      })
    }

  }

  getCssFormulario(field: string): any{
    return FormularioValidator.getCssValidator(this.formulario, field)
  }

}
