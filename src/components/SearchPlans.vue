<template>
  <main>
    <section class="loading" v-show="loading">
      <spring-spinner
        class="loading__icon"
        :animation-duration="1200"
        :size="60"
        color="#ffba3f"
      />
    </section>

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
        required
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

      <button class="search-button" type="button" v-on:click="getPlans($event)">
        <font-awesome-icon icon="search" />
        Ver planos disponíveis
      </button>
    </form>

    <section class="plans" v-show="showPlans">
      <h2 class="plans__title">Planos de saúde disponíveis para você</h2>
      <span class="plans__description"
        >Encontramos {{ plans.total }} opções</span
      >
      <ul>
        <li v-for="(plan, index) in plans.planos" :key="index">
          <div class="container">
            <div class="plans__info">
              <img :src="plan.operadoraLogo" :alt="plan.plano" />
              <h3>{{ plan.nome_plano_ans }}</h3>
              <p>{{ plan.segmentacao }}</p>
            </div>

            <span class="plans__price">
              <img
                src="../assets/dollar.svg"
                alt="Ilustração representando uma moeda"
              />
              R$ {{ plan.precos.total }}
            </span>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { ibgeEndpoint, qualicorpEndpoint } from "@/services/api.js";
import { apiKey1, apiKey2, apiKey3 } from "@/qualicorpKey.js";
import { SpringSpinner } from "epic-spinners";

export default {
  name: "SearchPlans",
  components: {
    SpringSpinner,
  },
  data() {
    return {
      loading: false,
      showPlans: false,
      states: [],
      cities: [],
      occupations: [],
      entities: [],
      plans: [],
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
      this.loading = true;

      try {
        await ibgeEndpoint(`${stateId}/municipios?orderBy=nome`).then((res) => {
          this.cities = res.data;
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    getOccupation: async function () {
      this.loading = true;
      try {
        await qualicorpEndpoint(
          `/profissao/${this.selectedState}/${this.selectedCity}?api-key=${apiKey1}`
        ).then((res) => {
          this.occupations = res.data;
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    getEntities: async function () {
      this.loading = true;

      try {
        await qualicorpEndpoint(
          `/entidade/${this.selectedOcupation}/${this.selectedState}/${this.selectedCity}?api-key=${apiKey2}`
        ).then((res) => {
          this.entities = res.data;
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    getPlans: async function () {
      this.loading = true;
      this.showPlans = false;

      try {
        await qualicorpEndpoint({
          method: "post",
          url: `/plano?api-key=${apiKey3}`,
          data: {
            entidade: this.selectedEntity,
            uf: this.selectedState,
            cidade: this.selectedCity,
            datanascimento: [this.selectedDate],
          },
        }).then((res) => {
          this.plans = res.data;
          console.log(this.selectedDate);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.showPlans = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: #060369;
  opacity: 0.6;
  top: 0;
  left: 0;
  z-index: 99;
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
    font-size: 2.5rem;
  }
}

form {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 300;
  text-align: center;

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
    margin: 5rem auto 0 auto;
    padding: 0.9rem 2rem;
    border: none;
    border-radius: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }
}

.plans {
  margin-top: 6rem;
  background: #3e3b8b;
  width: 100vw;
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: 3.5rem;
    margin-top: 3rem;
    color: white;
    font-weight: bold;
    text-align: center;
  }

  &__description {
    font-size: 1.4rem;
    color: white;
    margin-bottom: 3rem;
    text-align: center;
  }

  &__info {
    img {
      max-width: 10rem;
      margin-top: 1rem;
      height: 6rem;
    }

    h3 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    p {
      font-size: 1.4rem;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;

    img {
      margin-right: 1rem;
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 3.6rem;

    li {
      .container {
        max-width: 85%;
        height: 100%;
        margin: 0 auto;
      }

      list-style: none;
      background: white;
      width: 26rem;
      margin-top: 3rem;
      border-radius: 10px;
      height: 25rem;
    }
  }
}

/* Mobile */
@media (max-width: 768px) {
  form {
    margin: 2rem;
    font-size: 2.5rem;

    .search-button {
      padding: 1.2rem 2rem;
    }
  }

  .plans {
    ul {
      padding-left: 0;
      grid-template-columns: 1fr;
    }
  }
}
</style>