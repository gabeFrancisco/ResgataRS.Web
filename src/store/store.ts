import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MapSlice } from "./slices/mapSlice";
import { SolicitacaoSlice } from "./slices/solicitacaoSlice";

export const store = configureStore({
  reducer: {
    map: MapSlice.reducer,
    solicitacoes: SolicitacaoSlice.reducer,
  },
  devTools: true,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
