import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapSliceState {
  coordenadas: number[];
}

const initialState: MapSliceState = {
  coordenadas: [-30.032554, -51.227918],
};

export const MapSlice = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {
    setCoordenadas: (state, action: PayloadAction<number[]>) => {
      state.coordenadas = action.payload;
    },
  },
});

export const { setCoordenadas } = MapSlice.actions;
export default MapSlice.reducer;
