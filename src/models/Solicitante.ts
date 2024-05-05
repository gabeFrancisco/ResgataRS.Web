import { BaseEntity } from "./BaseEntity";

export interface Solicitante extends BaseEntity {
  nome: string;
  telefone: string;
}
