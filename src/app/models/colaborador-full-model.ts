import { CafeModel } from './cafe-model';
export interface ColaboradorFullModel{
  id: number
  nome: string
  cpf: string
  cafes: CafeModel[]
}
