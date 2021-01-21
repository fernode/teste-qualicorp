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
        <option value="default" disabled selected>Selecione seu estado</option>
        <option v-for="state in states" :key="state.sigla" :value="state.sigla">
          {{ state.sigla }}
        </option>
      </select>

      <select name="city" id="city" v-on:change="getCarrer($event)">
        <option value="default" disabled selected>Selecione sua cidade</option>
        <option v-for="city in cities" :key="city.id" :value="city.nome">
          {{ city.nome }}
        </option>
      </select>
    </form>
  </main>
</template>

<script>
import { ibgeEndpoint, qualicorpEndpoint } from "@/services/api.js";
import apiKey from "@/qualicorpKey.js";

export default {
  name: "SearchPlans",
  data() {
    return {
      states: [],
      cities: [],
      selectedState: "",
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
    getCarrer: async function (e) {
      const city = e.target.value;

      try {
        await qualicorpEndpoint(
          `/profissao/${this.selectedState}/${city}?api-key=${apiKey}`
        ).then((res) => {
          console.log(res.data);
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