import { BaseEntity } from "./BaseEntity";

export interface Endereco extends BaseEntity {
  coordenadas: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
}
