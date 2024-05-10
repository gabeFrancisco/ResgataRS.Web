import { Solicitacao } from "@/models/Solicitacao";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

interface SolicitacaoState {
  solicitacao: Solicitacao;
  solicitacaoList: Array<Solicitacao>;
  hash: string;
  validated: boolean;
}

const initialState: SolicitacaoState = {
  solicitacao: {
    situacao: "",
    mensagem: "",
    numeroPessoas: 0,
    ativa: true,
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
      coordenadas: "",
      numero: "",
      rua: "",
    },
  },
  solicitacaoList: new Array<Solicitacao>(),
  hash: "",
  validated: true,
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

export const getSolicitacaoById = createAsyncThunk(
  "solicitacao/getById",
  async (data: number) =>
    await api.get(`/solicitacoes/${data}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    })
);

export const getAllSolicitacoesByNome = createAsyncThunk(
  "solicitacao/getAllByName",
  async (data: string) =>
    await api.get(`/solicitacoes/byNome/${data}`).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
);

export const getAllSolicitacoesByDocumento = createAsyncThunk(
  "solicitacao/getAllByDocumento",
  async (data: string) =>
    await api.get(`/solicitacoes/byDocumento/${data}`).then((res) => {
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
          return res.data as Solicitacao;
        }
      })
      .catch((err) => alert(err));
  }
);

export const validateSolicitacao = createAsyncThunk(
  "solicitacao/validate",
  async (data: { hash: string; id: number }) => {
    return await api
      .get(`/solicitacoes/hash?hash=${data.hash}&id=${data.id}`)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
      });
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
    builder.addCase(getAllSolicitacoesByNome.fulfilled, (state, action) => {
      state.solicitacaoList = action.payload!;
    });
    builder.addCase(
      getAllSolicitacoesByDocumento.fulfilled,
      (state, action) => {
        state.solicitacaoList = action.payload;
      }
    );
    builder.addCase(getSolicitacaoById.fulfilled, (state, action) => {
      state.solicitacao = action.payload;
    });
    builder.addCase(postSolicitacao.fulfilled, (state, action) => {
      var payload = action.payload as Solicitacao;
      state.hash = payload.hash!;
    });
    builder.addCase(validateSolicitacao.fulfilled, (state, action) => {
      state.validated = action.payload;
    });
  },
});

export const {} = SolicitacaoSlice.actions;
export default SolicitacaoSlice.reducer;
