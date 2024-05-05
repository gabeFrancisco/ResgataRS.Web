"use client";

import { Solicitacao } from "@/models/Solicitacao";
import React from "react";

const SolicitacaoCard = ({ props }: { props: Solicitacao }) => {
  return (
    <div className="flex flex-col border rounded p-2 my-2 shadow hover:bg-gray-50 cursor-pointer">
      <div className="flex flex-row justify-between items-baseline">
        <h4>{props.situacao}</h4>
        <p>
          {new Date(props.createdAt!).toLocaleDateString("pt-BR")} -{" "}
          {new Date(props.createdAt!).toTimeString()}
        </p>
      </div>
      <p>{props.mensagem}</p>
      <p>
        Local: {props.endereco.cidade} - {props.endereco.bairro}
      </p>
      <p className="text-orange-600">
        Número de pessoas: {props.numeroPessoas}
      </p>
    </div>
  );
};

export default SolicitacaoCard;
