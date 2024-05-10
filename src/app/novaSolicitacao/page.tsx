"use client";

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Solicitacao } from "@/models/Solicitacao";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSelecao } from "@/store/slices/mapSlice";
import axios from "axios";
import { postSolicitacao } from "@/store/slices/solicitacaoSlice";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import GenericModal from "@/components/GenericModal";

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);
  const solicitaoesState = useAppSelector((state) => state.solicitacoes);
  const [enviado, setEnviado] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(false);
  const [hashModal, setHashModal] = useState(false);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    if (concluido) {
      setHashModal(true);
    }
  }, [concluido]);

  const handleHashModal = () => {
    hashModal ? setHashModal(false) : setHashModal(true);
  };

  const handleCoordinates = () => {
    dispatch(setSelecao(true));
  };

  const toggleModal = () => {
    if (modal) {
      setEnviado(true);
      setSubmit(false);
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleCep = () => {
    formik.values.cep.length === 8 &&
      axios
        .get(`https://viacep.com.br/ws/${formik.values.cep}/json/`)
        .then((res) => {
          if (res.status === 200) {
            formik.setFieldValue("rua", res.data.logradouro);
            formik.setFieldValue("bairro", res.data.bairro);
            formik.setFieldValue("cidade", res.data.localidade);
          }
          return;
        });
  };

  useEffect(() => {
    formik.setFieldValue(
      "coordenadas",
      mapState.coordenadaSelecionada?.toString(),
      true
    );
  }, [mapState.coordenadaSelecionada]);

  const formik = useFormik({
    initialValues: {
      nome: "",
      cpf_rg: "",
      telefone: "",
      coordenadas: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      pessoas: 0,
      situacao: "",
      mensagem: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome é obrigatório!"),
      coordenadas: Yup.string().required(
        "Clique no mapa para pegar coordenadas!"
      ),
      pessoas: Yup.number().min(1).required("Informe o número de pessoas!"),
      situacao: Yup.string().required("Situação obrigatória!"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      setEnviado(false);
      setModal(true);
      setSubmit(true);
      if (submit) {
        let solicitacao: Solicitacao = {
          situacao: values.situacao,
          mensagem: values.mensagem,
          numeroPessoas: values.pessoas,
          solicitante: {
            nome: values.nome,
            telefone: values.telefone,
            cpf_rg: values.cpf_rg,
          },
          endereco: {
            rua: values.rua,
            numero: values.numero,
            complemento: values.complemento,
            cep: values.cep,
            bairro: values.bairro,
            cidade: values.cidade,
            coordenadas: values.coordenadas,
          },
        };
        dispatch(postSolicitacao(solicitacao)).then(() => {
          formik.resetForm();
          setEnviado(true);
          setSubmit(false);
          setModal(false);
          setConcluido(true);
        });
      }
      return;
    },
  });
  return (
    <div className="text-sm h-full">
      {hashModal && (
        <GenericModal title="Código de resgate">
          <div className="font-md my-2 text-md">
            <p>
              Este é o seu código que será usado para encerrar sua solicitação
              no momento de resgate.
            </p>
            <p>Tire um print, salve ou envie para alguém de confiança.</p>
            <p>
              Se você perder ou não conseguir salvar, poderá solicitar a
              conclusão de resgate por mensagem posteriormente.
            </p>
            <div className="my-2 flex flex-col lg:flex-row text-lg font-semibold items-start lg:items-baseline">
              <h4>Seu código: </h4>
              <h4 className="text-green-600 text-2xl tracking-wide my-3 lg:mx-2 lg:my-0">
                {solicitaoesState.hash}
              </h4>
              <button
                className="bg-gray-500 hover:bg-gray-600 shadow 
              text-white rounded mb-3 px-3 py-0.5 text-sm font-normal"
                onClick={() =>
                  navigator.clipboard.writeText(solicitaoesState.hash)
                }
              >
                Copiar!
              </button>
            </div>
            <hr className="my-2" />
            <button
              type="button"
              onClick={() => {
                router.replace("/");
                handleHashModal();
              }}
              className="bg-green-500 rounded px-3 py-2 text-white hover:bg-green-600 shadow w-1/5"
            >
              Ok!
            </button>
          </div>
        </GenericModal>
      )}
      {modal && (
        <Modal
          title="Confirmação de solicitação"
          toggleModal={toggleModal}
          toggleAction={handleSubmit}
        >
          <p>
            Clicando em "Confirmar", você concorda que se encontra em situação
            de risco, independente do grau e que precisa urgentemente de ajuda.
          </p>
          <p>
            Por favor, colabore !Não abra uma solicitação desnecessária/falsa a
            fim de prejudicar as equipes de resgate e voluntários nesse momento
            tão complicado!
          </p>
        </Modal>
      )}

      <h3>Nova solicitação:</h3>
      <hr />
      <form method="post">
        <div className="my-2 text-red-500">
          <small>Campos com * são obrigatórios!</small>
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="nome">Nome*</label>
          <input
            className={`rounded border mx-3 w-2/3 lg:w-full ${
              formik.errors.nome && "border-red-500"
            }`}
            type="text"
            name="nome"
            id="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
        </div>
        {/* <div className="my-3 flex flex-row items-center"></div> */}
        <div className="flex flex-row items-center justify-end">
          <label htmlFor="cpf_rg">CPF/RG</label>
          <input
            className={`border rounded mx-3 w-2/3 lg:w-full ${
              formik.errors.cpf_rg && "border-red-500"
            }`}
            type="text"
            name="cpf_rg"
            id="cpf_rg"
            maxLength={11}
            value={formik.values.cpf_rg}
            onChange={formik.handleChange}
          />
        </div>
        <small>
          A inclusão do documento garante uma solicitação mais segura contra
          fraldes.
        </small>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="telefone">Telefone</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="telefone"
            id="telefone"
            value={formik.values.telefone}
            onChange={formik.handleChange}
          />
        </div>
        <hr />
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="coordenadas">Coordenadas*</label>
          <input
            className={`border rounded mx-3 w-2/3 lg:w-full ${
              formik.errors.coordenadas && "border-red-500"
            }`}
            type="text"
            name="coordenadas"
            id="coordenadas"
            value={formik.values.coordenadas}
            onChange={formik.handleChange}
            readOnly
          />
          <button
            type="button"
            onClick={handleCoordinates}
            className="bg-green-500 rounded border-green-300 px-2 py-1 text-sm text-white hover:bg-green-600"
          >
            Carregar!
          </button>
        </div>
        {!mapState.sinalGPS && (
          <p className="text-red-500 font-semibold">
            Sem sinal de GPS! Clique em "Carregar" novamente ou selecione no
            mapa e marque a sua localização aproximada!
          </p>
        )}
        <small className="text-green-700">
          Clique em um ponto do mapa para marcar sua localização ou use o GPS do
          seu celular e clique no botão ao lado para localizar automaticamente
        </small>
        <hr />
        <div className="my-3">
          <div className="flex flex-row items-center">
            <label htmlFor="cep">CEP</label>
            <input
              className="border rounded mx-3 w-2/3 lg:w-full"
              type="text"
              name="cep"
              id="cep"
              maxLength={8}
              value={formik.values.cep}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="bg-blue-500 rounded border py-1 px-2 text-white"
              onClick={handleCep}
            >
              Pesquisar{" "}
            </button>
          </div>
          <small>
            Insira seu CEP para preencher automáticamente todos os campos
          </small>
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="rua">Rua</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="rua"
            id="rua"
            value={formik.values.rua}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="numero">Número</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="numero"
            id="numero"
            value={formik.values.numero}
            onChange={formik.handleChange}
          />
          <label htmlFor="complemento">Complemento</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="complemento"
            id="complemento"
            value={formik.values.complemento}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="bairro">Bairro</label>
          <input
            className={`border rounded mx-3 w-2/3 lg:w-full ${
              formik.errors.bairro && "border-red-500"
            }`}
            type="text"
            name="bairro"
            id="bairro"
            value={formik.values.bairro}
            onChange={formik.handleChange}
          />
          <label htmlFor="cidade">Cidade</label>
          <input
            className={`border rounded mx-3 w-2/3 lg:w-full ${
              formik.errors.cidade && "border-red-500"
            }`}
            type="text"
            name="cidade"
            id="cidade"
            value={formik.values.cidade}
            onChange={formik.handleChange}
          />
        </div>
        <hr />
        <div className="my-3 items-center">
          <div className="flex flex-row items-center">
            <label htmlFor="pessoas">Nº pessoas*</label>
            <input
              className={`border rounded mx-3 lg:w-full ${
                formik.errors.pessoas && "border-red-500"
              }`}
              type="number"
              name="pessoas"
              id="pessoas"
              value={formik.values.pessoas}
              onChange={formik.handleChange}
            />
          </div>
          <small>Quantas pessoas precisam ser resgatadas?</small>
        </div>
        <div className="my-3 items-center">
          <div className="flex flex-row items-center">
            <label htmlFor="situacao">Situação*</label>
            <input
              className={`border rounded mx-3 lg:w-full ${
                formik.errors.situacao && "border-red-500"
              }`}
              type="text"
              name="situacao"
              id="situacao"
              value={formik.values.situacao}
              onChange={formik.handleChange}
            />
          </div>
          <small>Descreva de forma breve a sua situação atual.</small>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            className="border rounded my-1 w-full"
            name="mensagem"
            id="mensagem"
            rows={5}
            value={formik.values.mensagem}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-row">
          <button
            type="button"
            disabled={!enviado ? true : false}
            className="px-5 py-2 rounded border-blue-300 bg-blue-500
            text-white hover:bg-blue-600 disabled:bg-white disabled:text-blue-500 
              disabled:border disabled:border-blue-500 cursor-pointer w-full text-center mr-2"
            onClick={() => formik.handleSubmit()}
          >
            {enviado ? "Enviar!" : "Carregando..."}
          </button>
          <Link
            href="/"
            className="px-5 py-2 rounded border-red-300 bg-red-500
         text-white hover:bg-red-600 cursor-pointer w-1/2 text-center ml-2"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
