"use client";

import SolicitacaoCard from "@/components/SolicitacaoCard";
import Link from "next/link";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getAllSolicitacoes,
  getAllSolicitacoesByNome,
  getAllSolicitacoesByDocumento,
} from "@/store/slices/solicitacaoSlice";
import { getAllCoordenadas } from "@/store/slices/mapSlice";
import { debounce } from "lodash";
export default function Home() {
  const dispatch = useAppDispatch();
  const solicitacoes = useAppSelector(
    (state) => state.solicitacoes.solicitacaoList
  );

  useEffect(() => {
    dispatch(getAllSolicitacoes());
    dispatch(getAllCoordenadas());
  }, []);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const setResults = useCallback(
    debounce((val) => {
      let regex = /^[0-9]+$/;
      if (val.length <= 0) {
        dispatch(getAllSolicitacoes());
      }
      if (val.match(regex)) {
        dispatch(getAllSolicitacoesByDocumento(val));
      } else {
        dispatch(getAllSolicitacoesByNome(val));
      }
    }, 800),
    []
  );

  useEffect(() => {
    setResults(search);
  }, [search]);

  const handleUpdate = () => {
    dispatch(getAllSolicitacoes()).then(() => setSearch(""));
  };

  return (
    <>
      <div className="flex flex-col text-sm text-white flex-grow items-stretch">
        <Link
          href="novaSolicitacao"
          className="bg-red-500 hover:bg-red-600 rounded shadow w-full border-red-200 px-5 py-2 text-center  my-2"
        >
          Preciso de resgate!
        </Link>
        {/* <button className="bg-green-500 hover:bg-green-600 w-full rounded border border-green-200 text-center px-5 py-2 ml-3 my-2">
          Quero ajudar!
        </button> */}
        <div className="flex flex-row text-gray-700">
          <input
            type="text"
            name="pesquisa"
            id="pesquisa"
            placeholder="Busque por nome ou CPF/RG"
            className="border my-1 p-0.5 rounded flex-1"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
            }
          />
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded px-2 text-sm bg-blue-500 ml-1 text-white hover:bg-blue-600 shadow"
          >
            Atualizar
          </button>
        </div>
        <small className="text-gray-600">
          Insira apenas letras OU números!
        </small>
      </div>
      <div className="text-gray-600 my-1">
        <h3>
          <b>Últimos registros:</b>
        </h3>
      </div>
      <hr className="shadow" />
      <div className="overflow-y-scroll lg:h-screen mt-1 px-2">
        {solicitacoes
          .map((el, key) => <SolicitacaoCard props={el} key={key} />)
          .reverse()}
      </div>
    </>
  );
}
