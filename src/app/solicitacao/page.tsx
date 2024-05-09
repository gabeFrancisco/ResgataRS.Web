"use client";

import { setCoordenadas } from "@/store/slices/mapSlice";
import { getSolicitacaoById } from "@/store/slices/solicitacaoSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const solicitacao = useAppSelector((state) => state.solicitacoes.solicitacao);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (solicitacao.createdAt === undefined) {
      router.back();
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between pb-2">
        <h2>{solicitacao.situacao}</h2>
        <button
          className="bg-green-500 shadow hover:bg-green-600 rounded px-3 py-1 text-sm text-white"
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
      <hr />
      <div className="my-3">
        <p className="text-lg">
          <strong>Nome: {solicitacao.solicitante.nome}</strong>
        </p>
        <p className="text-lg">
          <strong>Telefone: {solicitacao.solicitante.telefone}</strong>
        </p>
        <p className="text-blue-700 mt-1">
          Data: {new Date(solicitacao.createdAt!).toLocaleString()}
        </p>
        <div className="flex flex-row justify-between items-start">
          <p className="text-blue-700">
            Coordenadas: {solicitacao.endereco.coordenadas}
          </p>
          <button
            style={{ fontSize: "12px" }}
            className="bg-blue-500 shadow rounded px-2 py-1 text-white hover:bg-blue-600"
            onClick={() =>
              dispatch(
                setCoordenadas(
                  solicitacao.endereco.coordenadas
                    .split(",")
                    .map((item) => parseFloat(item))
                )
              )
            }
          >
            Localizar
          </button>
        </div>
        <p className="my-2">{solicitacao.mensagem}</p>
      </div>
      <hr />
      <div className="my-1">
        <p>
          <strong>Endereço:</strong>
        </p>
        <p>Rua: {solicitacao.endereco.rua}</p>
        <p>Número: {solicitacao.endereco.numero}</p>
        <p>Complemento: {solicitacao.endereco.complemento}</p>
        <p>Bairro: {solicitacao.endereco.bairro}</p>
        <p>Cidade: {solicitacao.endereco.cidade}</p>
        <p>CEP: {solicitacao.endereco.cep}</p>
      </div>
      <button className="bg-green-500 rounded py-2 px-3 my-2 w-full text-white font-bold shadow text-lg hover:bg-green-600">
        Fui resgatado!
      </button>
    </div>
  );
};

export default page;
