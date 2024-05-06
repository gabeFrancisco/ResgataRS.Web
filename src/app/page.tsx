"use client";

import SolicitacaoCard from "@/components/SolicitacaoCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../api";
import { Solicitacao } from "@/models/Solicitacao";

export default function Home() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  useEffect(() => {
    api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        setSolicitacoes(res.data as Solicitacao[]);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-row text-sm text-white flex-grow items-stretch ">
        <Link
          href="novaSolicitacao"
          className="bg-red-500 hover:bg-red-600 rounded border w-full border-red-200 px-5 py-2 text-center  my-2"
        >
          Preciso de resgate!
        </Link>
        <button className="bg-green-500 hover:bg-green-600 w-full rounded border border-green-200 text-center px-5 py-2 ml-3 my-2">
          Quero ajudar!
        </button>
      </div>
      <div>
        <h3>
          <b>Últimos registros:</b>
        </h3>
      </div>
      <hr />
      {solicitacoes.map((el, key) => (
        <SolicitacaoCard props={el} key={key} />
      ))}
    </>
  );
}
