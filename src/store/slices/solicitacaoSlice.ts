import { Solicitacao } from "@/models/Solicitacao";
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import api from "../../../api";

interface SolicitacaoState {
  solicitacao: Solicitacao;
  solicitacaoList: Array<Solicitacao>;
}

const initialState: SolicitacaoState = {
  solicitacao: {
    situacao: "",
    mensagem: "",
    numeroPessoas: 0,
    solicitante: {
      cpf_rg: "",
      nome: "",
      telefone: "",
    },
    endereco: {
      bairro: "",
      cep: "",
      cidade: "",
      complemento: "",
      coordernadas: "",
      numero: "",
      rua: "",
    },
  },
  solicitacaoList: new Array<Solicitacao>(),
};

export const getAllSolicitacoes = createAsyncThunk(
  "solicitacao/getAll",
  async () =>
    await api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
);

export const postSolicitacao = createAsyncThunk(
  "solicitacao/post",
  async (data: Solicitacao, thunkAPI) => {
    return await api
      .post("/solicitacoes", data)
      .then((res) => {
        if (res.status === 200) {
          thunkAPI.dispatch(getAllSolicitacoes());
          return res.data;
        }
      })
      .catch((err) => alert(err));
  }
);

export const SolicitacaoSlice = createSlice({
  name: "SolicitacoesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSolicitacoes.fulfilled, (state, action) => {
      state.solicitacaoList = action.payload;
    });
  },
});

export const {} = SolicitacaoSlice.actions;
export default SolicitacaoSlice.reducer;
