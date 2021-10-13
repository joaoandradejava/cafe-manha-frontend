import { FormGroup } from "@angular/forms";

export class FormularioValidator{
  public static getCssValidator(formulario: FormGroup, nome: string): any{
    return {'form-success': !formulario.get(nome)?.errors, 'form-error': formulario.get(nome)?.errors}
  }
}
