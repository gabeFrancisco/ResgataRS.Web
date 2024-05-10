import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <h1>Sobre o Resgate RS:</h1>
      <hr className="mt-1" />
      <p className="my-1">
        É um projeto que busca ajudar no resgate de pessoas em situação de risco
        em decorrência das enchentes ocorridas em nosso estado.
      </p>
      <p className="my-1">
        O projeto é gratuito e voluntário, sem fins lucrativos, apenas para
        ajudar pessoas e equipes de resgate nesse momento tão difícil.
      </p>
      <p className="my-1">
        Me chamo Gabriel Francisco e desenvolvi esse site apenas com meus
        prórios recursos. Sinta-se a vontade para ajudar com qualquer valor para
        manter o projeto no ar e ajudar a resgatar mais vidas!
      </p>
      <p className="my-1">
        Qualquer dúvida, sugestão ou doação, entre em contato através do email:
        <p>
          <a
            href="mailto:contatoresgaters@gmail.com"
            className="underline text-green-600"
          >
            contatoresgaters@gmail.com
          </a>
          <span> (chave pix)</span>
        </p>
      </p>
    </div>
  );
};

export default page;
