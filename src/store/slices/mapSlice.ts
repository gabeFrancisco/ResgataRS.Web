import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapSliceState {
  coordenadas: number[];
  coordenadaSelecionada: number[] | null;
  coordenadasClick: number[];
  selecao: boolean;
  sinalGPS: boolean;
}

const initialState: MapSliceState = {
  coordenadas: [0, 0],
  coordenadaSelecionada: null,
  coordenadasClick: [0, 0],
  selecao: false,
  sinalGPS: true,
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
    setCoordenadasClick: (state, action: PayloadAction<number[]>) => {
      state.coordenadasClick = action.payload;
    },
    setSelecao: (state, action: PayloadAction<boolean>) => {
      state.selecao = action.payload;
    },
    setSinalGPS: (state, action: PayloadAction<boolean>) => {
      state.sinalGPS = action.payload;
    },
  },
});

export const {
  setCoordenadas,
  setCoordenadaSelecionada,
  setCoordenadasClick,
  setSelecao,
  setSinalGPS,
} = MapSlice.actions;
export default MapSlice.reducer;
