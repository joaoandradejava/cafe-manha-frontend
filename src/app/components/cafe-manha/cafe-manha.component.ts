import { FormularioValidator } from './../../utils/formulario-validator';
import { AlertaService } from './../../services/alerta.service';
import { CafeModel } from './../../models/cafe-model';
import { CafeManhaService } from './../../services/cafe-manha.service';
import { ColaboradorFullModel } from './../../models/colaborador-full-model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from 'src/app/models/colaborador-model';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-cafe-manha',
  templateUrl: './cafe-manha.component.html',
  styleUrls: ['./cafe-manha.component.scss']
})
export class CafeManhaComponent implements OnInit {

  formulario: FormGroup
  colaboradorId: number = -1
  colaboradorFullModel?: ColaboradorFullModel


  //cafe da manha
  cafeManhaId: number = -1
  textoBotaoCafeManha: string = ''


  constructor(private formBuilder: FormBuilder, private bsModalRef: BsModalRef, public options: ModalOptions, private colaboradorService: ColaboradorService, private cafeManhaService: CafeManhaService, private alertaService: AlertaService) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })


  }

  ngOnInit(): void {
    this.inicializarComponente()

  }
  private inicializarComponente(): void {
    if (this.options.initialState) {
      this.colaboradorId = Number(this.options.initialState.data)
      this.buscarColaborador()
      this.atualizarTextoBotao()
    }
  }

  private buscarColaborador(): void {
    this.colaboradorService.buscarPorId(this.colaboradorId).subscribe(data => {
      this.colaboradorFullModel = data
    })
  }

  isEditarCafeManha(): boolean {
    return this.cafeManhaId > 0 ? true : false
  }

  resetar(): void {
    this.formulario.reset()
    this.cafeManhaId = -1
    this.buscarColaborador()
    this.atualizarTextoBotao()
  }

  private atualizarTextoBotao(): void {
    this.textoBotaoCafeManha = this.isEditarCafeManha() ? 'Editar' : 'Inserir'

  }

  editar(cafeId: number, cafe: CafeModel): void {
    this.cafeManhaId = cafeId
    this.textoBotaoCafeManha = this.isEditarCafeManha() ? 'Editar' : 'Inserir'

    this.formulario.get('nome')?.setValue(cafe.nome)
  }

  deletar(cafeId: number): void {
    if (confirm('Tem certeza  que deseja deletar?')) {
      this.cafeManhaService.deletar(this.colaboradorId, cafeId).subscribe(data => {
        this.resetar()
        this.alertaService.alertaSucesso('Contribuição removida com sucesso!')
      })
    }
  }

  salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    let mensagem: string = `Contribuição ${this.isEditarCafeManha() ? 'Atualizada' : 'Inserida'} com sucesso!`

    if (this.isEditarCafeManha()) {
      this.cafeManhaService.atualizar(this.formulario.value, this.colaboradorId, this.cafeManhaId).subscribe(data => {
        this.resetar()
        this.alertaService.alertaSucesso(mensagem)
      })

    } else {
      this.cafeManhaService.inserir(this.formulario.value, this.colaboradorId).subscribe(data => {
        this.resetar()
        this.alertaService.alertaSucesso(mensagem)

      })
    }

  }

  getCssFormulario(field: string): any{
    return FormularioValidator.getCssValidator(this.formulario, field)
  }

}
