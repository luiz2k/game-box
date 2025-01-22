// Cria uma instância de erro customizado com a possibilidade de adicionar informações extras
export class CustomError extends Error {
  constructor(
    message: string,
    public others?: Record<string, unknown>,
  ) {
    super(message);

    this.others = others;
  }
}
