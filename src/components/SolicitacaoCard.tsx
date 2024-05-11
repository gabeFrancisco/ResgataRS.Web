"use client";

import { Solicitacao } from "@/models/Solicitacao";
import { setCoordenadas } from "@/store/slices/mapSlice";
import { getSolicitacaoById } from "@/store/slices/solicitacaoSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

const SolicitacaoCard = ({ props }: { props: Solicitacao }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const date = new Date(props.createdAt!).toISOString();

  return (
    <div
      onClick={() => {
        dispatch(
          setCoordenadas(props.endereco.coordenadas.split(",").map(Number))
        );
        router.push(`/solicitacao/${props.id}`);
      }}
      className={`flex flex-col border ${
        !props.ativa && "border-green-400"
      } rounded p-2 my-2 shadow hover:bg-gray-50 cursor-pointer`}
    >
      <div className="flex flex-row justify-between items-baseline">
        <h2>{props.solicitante.nome}</h2>
        <p>
          {new Date(date).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>
      <h4>{props.situacao}</h4>
      <div className="text-gray-600">
        {/* <p>{props.mensagem}</p> */}
        <p>
          Local: {props.endereco.cidade} - {props.endereco.bairro}
        </p>
        <p className="text-gray-600">
          Número de pessoas: {props.numeroPessoas}
        </p>
        {!props.ativa && (
          <h4 className="text-md font-bold text-green-500">Resgatado!</h4>
        )}
      </div>
    </div>
  );
};

export default SolicitacaoCard;
