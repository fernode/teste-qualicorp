<template>
  <main>
    <div class="text-box">
      <img src="../assets/logo.svg" alt="Logo qualicorp" />
      <h1>Busca por plano de saúde</h1>
    </div>

    <form>
      <span>Moro em</span>
      <select
        class="input--state"
        name="state"
        id="state"
        v-on:change="getCities($event)"
        v-model="selectedState"
      >
        <option value="" disabled selected>UF</option>
        <option v-for="state in states" :key="state.sigla" :value="state.sigla">
          {{ state.sigla }}
        </option>
      </select>
      ,
      <select
        class="input--city"
        name="city"
        id="city"
        v-on:change="getOccupation($event)"
        v-model="selectedCity"
      >
        <option value="" disabled selected>cidade</option>
        <option v-for="city in cities" :key="city.id" :value="city.nome">
          {{ city.nome }}
        </option>
      </select>
      ,
      <span>nasci em</span>
      <input class="input--date" type="date" v-model="selectedDate" />
      <br />
      <span>eu sou</span>
      <select
        class="input--occupation"
        name="occupation"
        id="occupation"
        v-model="selectedOcupation"
        v-on:change="getEntities($event)"
      >
        <option value="" disabled selected>profissão</option>
        <option
          v-for="occupation in occupations"
          :key="occupation.profissao"
          :value="occupation.profissao"
        >
          {{ occupation.profissao }}
        </option>
      </select>

      , <span>associado a</span>
      <select
        class="input--entity"
        name="entity"
        id="entity"
        v-model="selectedEntity"
      >
        <option value="" disabled selected>entidade</option>
        <option
          v-for="entity in entities"
          :key="entity.NomeFantasia"
          :value="entity.NomeFantasia"
        >
          {{ entity.NomeFantasia }}
        </option>
      </select>

      <button class="search-button">
        <font-awesome-icon icon="search" />
        Ver planos disponíveis
      </button>
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
      selectedDate: "",
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

<style lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text-box {
  text-align: center;
  color: #ffffff;

  img {
    margin-top: 3rem;
  }

  h1 {
    margin-top: 5rem;
    margin-bottom: 3rem;
    font-weight: 300;
  }
}

form {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 300;

  select,
  input,
  input:not([type="date"]) {
    background: transparent;
    border: none;
    color: #ffba3f;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: dashed #ffba3f 1px;
  }

  .input {
    &--state {
      width: 6rem;
    }

    &--city {
      width: 11rem;
    }

    &--entity {
      width: 13rem;
    }

    &--occupation {
      width: 14rem;
    }

    &--date {
      width: 15.2rem;
      &::-webkit-calendar-picker-indicator {
        filter: invert(78%) sepia(95%) saturate(2297%) hue-rotate(325deg)
          brightness(101%) contrast(101%);
        margin-left: -0.9rem;
        padding: 0;
      }
    }
  }

  .search-button {
    background: #ffba3f;
    display: block;
    text-align: center;
    margin: 3rem auto 0 auto;
    padding: 0.7rem;
    border: none;
    border-radius: 2rem;
    font-weight: bold;
    text-transform: uppercase;
  }
}

/* Mobile */
@media (max-width: 768px) {
  form {
    text-align: center;
    font-size: 2.5rem;
  }
}
</style>