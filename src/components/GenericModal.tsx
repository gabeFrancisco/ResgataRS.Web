"use client";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

const GenericModal = (props: ModalProps) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex flex-col items-center bg-opacity-70 justify-center bg-gray-400">
      <div className="bg-gray-50 rounded border w-10/12 lg:w-6/12 p-4 shadow">
        <div className="flex flex-row justify-between px-3 py-1 border-b text-gray-600 font-semibold">
          {props.title ?? "Modal"}
        </div>
        <div className="text-gray-600 p-2">{props.children}</div>
      </div>
    </div>
  );
};

export default GenericModal;
