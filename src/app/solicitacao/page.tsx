"use client";

import Modal from "@/components/Modal";
import ResgateModal from "@/components/ResgateModal";
import { setCoordenadas } from "@/store/slices/mapSlice";
import { getSolicitacaoById } from "@/store/slices/solicitacaoSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const solicitacao = useAppSelector((state) => state.solicitacoes.solicitacao);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(false);
  useEffect(() => {
    if (solicitacao.createdAt === undefined) {
      router.back();
    }
  }, []);

  const handleModal = () => (modal ? setModal(false) : setModal(true));
  const handleAction = () => {};

  return (
    <div>
      {modal && (
        <ResgateModal title="Confirmar resgate">
          <p>
            Insira abaixo o código de resgate ou se você não o tiver, envia uma
            solicitação de conclusão no formulário abaixo:
          </p>
          <div className="flex flex-col items-start lg:flex-row mt-3 mb-5 lg:items-center">
            <label htmlFor="codigo" className="text-sm my-1 lg:my-0 ">
              Código de resgate:{" "}
            </label>
            <input
              type="text"
              placeholder="Código"
              className="mx-0 lg:mx-1 p-0.5 rounded border"
              maxLength={6}
            />
            <button className="bg-green-500 rounded px-2 py-1 my-1 lg:my-0  text-white mx-0 lg:mx-2 hover:bg-green-600">
              Validar
            </button>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              rows={5}
              name="mensagem"
              id="mensagem"
              placeholder="Insira a sua mensagem"
              className="p-1 my-1 text-sm rounded border"
            ></textarea>
            <button
              type="button"
              onClick={handleModal}
              className="bg-green-500 rounded hover:bg-green-600 shadow p-1 text-white my-2 w-1/4"
            >
              Enviar
            </button>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row lg:justify-center">
            <button
              type="button"
              onClick={handleModal}
              className="bg-red-500 rounded  hover:bg-red-600 shadow py-1 px-3 text-white"
            >
              Cancelar
            </button>
          </div>
        </ResgateModal>
      )}

      <div className="flex flex-row justify-between pb-2">
        <h2>{solicitacao.situacao}</h2>
        <button
          className="bg-green-500 shadow hover:bg-green-600 rounded px-7 py-1 text-sm text-white"
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
      <button
        onClick={handleModal}
        className="bg-green-500 rounded py-2 px-3 my-2 w-full text-white font-bold shadow text-lg hover:bg-green-600"
      >
        Fui resgatado!
      </button>
    </div>
  );
};

export default page;
