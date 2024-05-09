"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const solicitacao = useAppSelector((state) => state.solicitacoes.solicitacao);
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h3>Solicitação</h3>
        <button
          className="bg-green-500 hover:bg-green-600 rounded px-3 py-1 text-sm text-white"
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default page;
