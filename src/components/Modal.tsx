import { Solicitacao } from "@/models/Solicitacao";
import React, { MouseEventHandler } from "react";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  toggleAction: () => void;
  title?: string;
}

const Modal = (props: ModalProps) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex flex-col items-center bg-opacity-70 justify-center bg-gray-400">
      <div className="bg-gray-50 rounded border w-10/12 lg:w-9/12 p-4 shadow">
        <div className="flex flex-row justify-between px-3 py-1 border-b text-gray-600 font-semibold">
          {props.title ?? "Modal"}
        </div>
        <div className="text-gray-600 p-2">{props.children}</div>
        <div className="flex flex-row justify-between lg:justify-center p-2">
          <button
            type="button"
            onClick={props.toggleModal}
            className="bg-red-500 rounded  hover:bg-red-600 shadow p-1 text-white mr-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={props.toggleAction}
            className="bg-blue-500 rounded hover:bg-blue-600 shadow p-1 text-white ml-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
