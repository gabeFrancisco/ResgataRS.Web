import { BaseEntity } from "./BaseEntity";
import { Endereco } from "./Endereco";
import { Solicitante } from "./Solicitante";

export interface Solicitacao extends BaseEntity {
  situacao: string;
  mensagem: string;
  numeroPessoas: number;
  solicitante: Solicitante;
  endereco: Endereco;
}
