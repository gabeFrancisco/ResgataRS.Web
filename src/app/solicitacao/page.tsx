"use client";

import GenericModal from "@/components/GenericModal";
import { setCoordenadas } from "@/store/slices/mapSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import solicitacaoSlice, {
  enviarMensagem,
} from "@/store/slices/solicitacaoSlice";

const page = () => {
  const solicitacaoState = useAppSelector((state) => state.solicitacoes);
  const solicitacao = useAppSelector((state) => state.solicitacoes.solicitacao);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [hash, setHash] = useState("");
  const [validate, setValidate] = useState(true);
  useEffect(() => {
    if (solicitacao.createdAt === undefined) {
      router.back();
    }
  }, []);

  const handleModal = () => (modal ? setModal(false) : setModal(true));
  const handleValidation = () => {
    api
      .get(`/solicitacoes/hash?hash=${hash}&id=${solicitacao.id}`)
      .then((res) => {
        if (res.status == 200) {
          if ((res.data as boolean) === true) {
            setValidate(true);
            alert("Código validado com sucesso!");
            setModal(false);
            router.replace("/");
          } else {
            setValidate(false);
          }
        }
      });
  };
  const handleMensagem = () => {
    dispatch(
      enviarMensagem({
        solicitacaoId: solicitacao.id!,
        nome: solicitacao.solicitante.nome,
        conteudo: mensagem,
      })
    ).then(() => {
      if (solicitacaoState.mensagemEnviada) {
        setModal(false);
      } else {
        setModal(false);
      }
    });
  };

  useEffect(() => {
    if (solicitacaoState.mensagemEnviada) {
      alert("Mensagem enviada com sucesso!");
    }
  }, [solicitacaoState]);

  return (
    <div>
      {modal && (
        <GenericModal title="Confirmar resgate">
          <p>
            Insira abaixo o código de resgate recebido no momento da
            solicitação.
          </p>
          <div className="flex flex-col items-start lg:flex-row mt-3 mb-3 lg:items-center">
            <label htmlFor="codigo" className="text-sm my-1 lg:my-0 ">
              Código de resgate:
            </label>
            <input
              type="text"
              placeholder="Código"
              className="mx-0 lg:mx-1 p-0.5 rounded border"
              maxLength={6}
              value={hash}
              onChange={(e) => setHash(e.target.value)}
            />
            <button
              className="bg-blue-500 rounded px-2 py-1 my-1 lg:my-0 
            text-white mx-0 lg:mx-2 hover:bg-blue-600"
              onClick={handleValidation}
            >
              Validar
            </button>
          </div>
          {!validate && (
            <p className="text-red-500 mb-2 text-lg font-semibold">
              Código inválido!
            </p>
          )}
          <hr className="my-2" />
          <div className="flex flex-col">
            <p>
              Se você não tiver o código de resgate, envie uma mensagem de
              pedido de conclusão no formulário abaixo.
            </p>
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              rows={5}
              name="mensagem"
              id="mensagem"
              placeholder="Insira a sua mensagem"
              className="p-1 my-1 text-sm rounded border"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            ></textarea>
            <button
              type="button"
              onClick={handleMensagem}
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
        </GenericModal>
      )}

      <div className="flex flex-row justify-between pb-2">
        <h2>{solicitacao.situacao}</h2>
        <button
          className="shadow border border-gray-600 hover:bg-gray-600 hover:text-white text-gray-600 rounded px-7 py-1 text-sm"
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
        <p className="text-blue-900 mt-1">
          Data: {new Date(solicitacao.createdAt!).toLocaleString()}
        </p>
        <div className="flex flex-row justify-between items-start">
          <p className="text-blue-900">
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
      <hr className="my-2" />
      {solicitacao.ativa ? (
        <button
          onClick={handleModal}
          className="bg-green-500 rounded py-2 px-3 my-2 w-full text-white font-bold shadow text-lg hover:bg-green-600"
        >
          Confirmar resgate!
        </button>
      ) : (
        <div className="flex flex-row p-3 w-full justify-center items-center">
          <h2 className="text-green-500 font-bold text-3xl">Resgatado!</h2>
        </div>
      )}
    </div>
  );
};

export default page;
