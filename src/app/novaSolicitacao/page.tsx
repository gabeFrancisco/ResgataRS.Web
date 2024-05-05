import React from "react";

const page = () => {
  return (
    <div className="text-sm">
      <h3>Nova solicitação:</h3>
      <hr />
      <form>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="nome">Nome</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="nome"
            id="nome"
          />
          <label htmlFor="cpf_rg">CPF/RG</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="cpf_rg"
            id="cpf_rg"
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="telefone">Telefone</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="telefone"
            id="telefone"
          />
          <label htmlFor="coordenadas">Coordenadas</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="coordenadas"
            id="coordenadas"
            readOnly
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
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="numero">Número</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="numero"
            id="numero"
          />
          <label htmlFor="complemento">Complemento</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="complemento"
            id="complemento"
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="bairro">Bairro</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="bairro"
            id="bairro"
          />
          <label htmlFor="cidade">Cidade</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="cidade"
            id="cidade"
            readOnly
          />
        </div>
        <div className="my-3 flex flex-row items-center">
          <label htmlFor="estado">Estado</label>
          <input
            className="border rounded mx-3 w-2/3 lg:w-full"
            type="text"
            name="estado"
            id="estado"
          />
        </div>
        <hr />
        <div className="my-3 items-center">
          <div className="flex flex-row items-center">
            <label htmlFor="situacao">Situação</label>
            <input
              className="border rounded mx-3 lg:w-full"
              type="text"
              name="situacao"
              id="situacao"
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
          />
        </div>
        <button
          className="px-5 py-2 rounded border bg-blue-500
         text-white hover:bg-blue-600 cursor-pointer w-full"
        >
          Enviar!
        </button>
      </form>
    </div>
  );
};

export default page;
