import axios from "axios";

const ibgeEndpoint = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
});

const qualicorpEndpoint = axios.create({
  baseURL: 'https://apisimulador.qualicorp.com.br'
});

export {
  ibgeEndpoint,
  qualicorpEndpoint
}
// Estados
// https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios?orderBy=nome