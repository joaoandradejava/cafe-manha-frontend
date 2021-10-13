import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './../../services/loading.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CafeManhaComponent } from './../../components/cafe-manha/cafe-manha.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColaboradorModel } from 'src/app/models/colaborador-model';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-colaboradors',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit {

  formulario: FormGroup

  colaboradores: ColaboradorModel[] = []
  paginaAtual: number = 0
  tamanho: number = 10
  totalElements: number = -1
  modalRef?: BsModalRef;

  constructor(private loadingService: LoadingService, private colaboradorService: ColaboradorService, private router: Router, private alertaService: AlertaService, private ngxBootstrapConfirmService: NgxBootstrapConfirmService, private modalService: BsModalService, private formbuilder: FormBuilder) {
    this.formulario = formbuilder.group({
      "nome": [''],
      "cpf": ['']
    })
  }

  ngOnInit(): void {
    this.buscarTodos()

    this.formulario.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.paginaAtual = 0
      this.buscarTodos()
    })
  }

  public buscarTodos(): void {
    this.loadingService.mostrar()
    this.colaboradorService.buscarTodos(this.buscarValorFormulario('nome'), this.buscarValorFormulario('cpf'), this.paginaAtual, this.tamanho).subscribe(data => {
      this.colaboradores = data.content
      this.totalElements = data.totalElements
      this.loadingService.ocultar()
    })
  }

  isVazio(): boolean {
    return this.totalElements > 0 ? false : true
  }

  editar(id: number): void {
    this.router.navigate(['formulario/cadastro-colaborador/' + id])
  }

  buscarValorFormulario(label: string): string {
    return this.formulario.get(label)?.value
  }

  showCafes(id: number): void {
    const initialState: any = {
      data: id
    };
    this.modalRef = this.modalService.show(CafeManhaComponent, { initialState })
    this.modalRef.content.id = id
  }

  deletar(id: number): void {

    let options = {
      title: 'Deseja realmente deletar está colaborador do sistema?',
      confirmLabel: 'Deletar',
      declineLabel: 'Cancelar'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {

        this.colaboradorService.deletarPorId(id).subscribe(data => {
          this.alertaService.alertaSucesso('Colaborador deletada com sucesso!')
          this.paginaAtual = 0
          this.buscarTodos()
        })
      }
    });
  }

  pageChanged(event: any): void {
    this.paginaAtual = event.page - 1
    this.buscarTodos()
  }



}
