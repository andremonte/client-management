import { Cep } from './cep.model';

export class Pessoa {

  constructor
    (
      public nome: string,
      public cpf: string,
      public telefone: number,
      public email: string,
      public cep: Cep
    ) { }
}
