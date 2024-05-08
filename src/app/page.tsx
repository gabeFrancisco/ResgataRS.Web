"use client";

import SolicitacaoCard from "@/components/SolicitacaoCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../api";
import { Solicitacao } from "@/models/Solicitacao";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllSolicitacoes } from "@/store/slices/solicitacaoSlice";

export default function Home() {
  const solicitacoes = useAppSelector(
    (state) => state.solicitacoes.solicitacaoList
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSolicitacoes());
  }, []);
  return (
    <>
      <div className="flex flex-row text-sm text-white flex-grow items-stretch">
        <Link
          href="novaSolicitacao"
          className="bg-red-500 hover:bg-red-600 rounded border w-full border-red-200 px-5 py-2 text-center  my-2"
        >
          Preciso de resgate!
        </Link>
        {/* <button className="bg-green-500 hover:bg-green-600 w-full rounded border border-green-200 text-center px-5 py-2 ml-3 my-2">
          Quero ajudar!
        </button> */}
      </div>
      <div>
        <h3>
          <b>Últimos registros:</b>
        </h3>
      </div>
      <hr />
      <div className="overflow-y-scroll lg:h-screen px-2">
        {solicitacoes
          .map((el, key) => <SolicitacaoCard props={el} key={key} />)
          .reverse()}
      </div>
    </>
  );
}
