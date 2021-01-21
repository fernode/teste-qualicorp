<template>
  <header>
    <h2>
      <span>PROTOTIPADO POR</span>
      <a
        href="http://fernandosilva.dev/"
        target="_blank"
        rel="noopener noreferrer"
        >fernandosilva.dev</a
      >
    </h2>

    <ul>
      <li>
        <a
          href="https://www.linkedin.com/in/fernandosilvaoliveira/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/linkedin.svg" alt="Ir para linkedin" />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/fernode"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/git.svg" alt="Ir para github" />
        </a>
      </li>
      <li>
        <a
          href="https://api.whatsapp.com/send?phone=5511974273945"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/whatsapp.svg" alt="Mandar mensagem whatsapp" />
        </a>
      </li>
      <li>
        <a
          href="https://msng.link/o/?fernandosilvaoliveira=tg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/telegram.svg" alt="Mandar mensagem telegram" />
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Social",
};
</script>

<style lang="scss">
header {
  background: #ffffff;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.8rem;
  margin-left: -0.8rem;

  h2 {
    display: flex;
    flex-direction: column;
    span {
      color: #5d5d5d;
    }
  }

  ul {
    display: flex;
    li {
      list-style: none;

      &:not(:first-child) {
        margin-left: 1rem;
      }
    }
  }
}
</style>