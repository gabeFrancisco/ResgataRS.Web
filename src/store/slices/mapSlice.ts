import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapSliceState {
  coordenadas: number[];
  coordenadaSelecionada: number[] | null;
  selecao: boolean;
}

const initialState: MapSliceState = {
  coordenadas: [0, 0],
  coordenadaSelecionada: null,
  selecao: false,
};

export const MapSlice = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {
    setCoordenadas: (state, action: PayloadAction<number[]>) => {
      state.coordenadas = action.payload;
    },
    setCoordenadaSelecionada: (state, action: PayloadAction<number[]>) => {
      state.coordenadaSelecionada = action.payload;
    },
    setSelecao: (state, action: PayloadAction<boolean>) => {
      state.selecao = action.payload;
    },
  },
});

export const { setCoordenadas, setCoordenadaSelecionada, setSelecao } =
  MapSlice.actions;
export default MapSlice.reducer;
