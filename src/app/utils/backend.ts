export class Backend{
  private static get baseUrl(): string {
    return 'https://colaborador-backend.herokuapp.com/'
  }

  public static get colaborador(): string  {
    return `${this.baseUrl}colaboradores`
  }

  public static cafeManha(colaboradorId: number): string {
    return `${this.baseUrl}colaboradores/${colaboradorId}/cafes`
  }
}
