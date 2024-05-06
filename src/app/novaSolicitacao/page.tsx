"use client";

import { useFormik, validateYupSchema } from "formik";
import React from "react";
import * as Yup from "yup";
import api from "../../../api";
import { Solicitacao } from "@/models/Solicitacao";

const page = () => {
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
      cpf_rg: Yup.string().required("CPF ou RG são obrigatórios!"),
      coordenadas: Yup.string().required(
        "Clique no mapa para pegar coordenadas!"
      ),
      cep: Yup.string().required("CEP é obrigatório!"),
      rua: Yup.string().required("Informe o nome da rua!"),
      numero: Yup.string().required("Informe o número"),
      bairro: Yup.string().required("Bairro é obrigatório!"),
      cidade: Yup.string().required("Cidade é obrigatório"),
      pessoas: Yup.number().min(1).required("Informe o número de pessoas!"),
      situacao: Yup.string().required("Situação obrigatória!"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
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
          coordernadas: values.coordenadas,
        },
      };

      console.log(solicitacao);
      api
        .post("/solicitacoes", solicitacao)
        .then(() => alert("Solicitação processada com successo!"))
        .catch((err) => alert(err));
    },
  });
  return (
    <div className="text-sm h-full">
      <h3>Nova solicitação:</h3>
      <hr />
      {formik.errors.nome ?? (
        <small className="my-2 text-red-500">{formik.errors.nome}</small>
      )}
      <form method="post">
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="nome">Nome</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="nome"
            id="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
          <label htmlFor="cpf_rg">CPF/RG</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="cpf_rg"
            id="cpf_rg"
            value={formik.values.cpf_rg}
            onChange={formik.handleChange}
          />
        </div>
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
          <label htmlFor="coordenadas">Coordenadas</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="coordenadas"
            id="coordenadas"
            value={formik.values.coordenadas}
            onChange={formik.handleChange}
            // readOnly
          />
        </div>
        <hr />
        <div className="my-3">
          <div className="flex flex-row items-center">
            <label htmlFor="cep">CEP</label>
            <input
              className="border rounded mx-3 w-2/3 lg:w-full"
              type="text"
              name="cep"
              id="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
            />
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
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="bairro"
            id="bairro"
            value={formik.values.bairro}
            onChange={formik.handleChange}
          />
          <label htmlFor="cidade">Cidade</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
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
            <label htmlFor="pessoas">Nº pessoas</label>
            <input
              className="border rounded mx-3 lg:w-full"
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
            <label htmlFor="situacao">Situação</label>
            <input
              className="border rounded mx-3 lg:w-full"
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
        <button
          type="button"
          className="px-5 py-2 rounded border bg-blue-500
         text-white hover:bg-blue-600 cursor-pointer w-full"
          onClick={() => formik.handleSubmit()}
        >
          Enviar!
        </button>
      </form>
    </div>
  );
};

export default page;