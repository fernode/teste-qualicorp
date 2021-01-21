<template>
  <main>
    <h1>Aqui ficará o formulário</h1>
    <form>
      <select
        name="state"
        id="state"
        v-on:change="getCities($event)"
        v-model="selectedState"
      >
        <option value="" disabled selected>Selecione seu estado</option>
        <option v-for="state in states" :key="state.sigla" :value="state.sigla">
          {{ state.sigla }}
        </option>
      </select>

      <select
        name="city"
        id="city"
        v-on:change="getOccupation($event)"
        v-model="selectedCity"
      >
        <option value="" disabled selected>Selecione sua cidade</option>
        <option v-for="city in cities" :key="city.id" :value="city.nome">
          {{ city.nome }}
        </option>
      </select>

      <select
        name="occupation"
        id="occupation"
        v-model="selectedOcupation"
        v-on:change="getEntities($event)"
      >
        <option value="" disabled selected>Selecione sua profissão</option>
        <option
          v-for="occupation in occupations"
          :key="occupation.profissao"
          :value="occupation.profissao"
        >
          {{ occupation.profissao }}
        </option>
      </select>

      <select name="entity" id="entity" v-model="selectedEntity">
        <option value="" disabled selected>Selecione sua Entidade</option>
        <option
          v-for="entity in entities"
          :key="entity.RazaoSocial"
          :value="entity.RazaoSocial"
        >
          {{ entity.NomeFantasia }} - {{ entity.RazaoSocial }}
        </option>
      </select>
    </form>
  </main>
</template>

<script>
import { ibgeEndpoint, qualicorpEndpoint } from "@/services/api.js";
import { apiKey1, apiKey2 } from "@/qualicorpKey.js";

export default {
  name: "SearchPlans",
  data() {
    return {
      states: [],
      cities: [],
      occupations: [],
      entities: [],
      selectedState: "",
      selectedCity: "",
      selectedOcupation: "",
      selectedEntity: "",
    };
  },
  mounted() {
    try {
      ibgeEndpoint.get(`?orderBy=nome`).then((res) => {
        this.states = res.data;
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getCities: async function (e) {
      const stateId = e.target.value;

      try {
        await ibgeEndpoint(`${stateId}/municipios?orderBy=nome`).then((res) => {
          this.cities = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getOccupation: async function () {
      try {
        await qualicorpEndpoint(
          `/profissao/${this.selectedState}/${this.selectedCity}?api-key=${apiKey1}`
        ).then((res) => {
          this.occupations = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getEntities: async function () {
      try {
        await qualicorpEndpoint(
          `/entidade/${this.selectedOcupation}/${this.selectedState}/${this.selectedCity}?api-key=${apiKey2}`
        ).then((res) => {
          this.entities = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>