import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../api";
import { Coordenada } from "@/models/Coordenada";

interface MapSliceState {
  coordenadas: number[];
  coordenadaSelecionada: number[] | null;
  coordenadasClick: number[];
  selecao: boolean;
  sinalGPS: boolean;
  coordenadasList: Array<Coordenada>;
}

const initialState: MapSliceState = {
  coordenadas: [-30.032003, -51.227988],
  coordenadaSelecionada: null,
  coordenadasClick: [0, 0],
  selecao: false,
  sinalGPS: true,
  coordenadasList: new Array<Coordenada>(),
};

export const getAllCoordenadas = createAsyncThunk(
  "mapa/coordenadas",
  async () =>
    await api.get("/solicitacoes/coordenadas").then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
);

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
  extraReducers: (builder) => {
    builder.addCase(getAllCoordenadas.fulfilled, (state, action) => {
      state.coordenadasList = action.payload;
    });
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
