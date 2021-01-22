# Teste Front-end Qualicorp

Aplicação feita em VueJS. Com o objetivo de consultar planos de saúde, que leva alguns dados em consideração para fazer essa busca.

## Consumo de API's

Este projeto utiliza 5 api's principais, fazendo 4 requisições do tipo GET e uma do tipo POST. Todas as chamadas estão separadas em métodos.

### GET

- A primeira requisição é feita assim que a página é carregada, trazendo os estados
- A segunda requisição é feita no momento em que o estado é selecionado para obter as cidades é necessário passar o estado como parâmetro
- A terceira requisicão é feita para obter a lista de cidades que são renderizados no select, sendo necessário passar a UF e a cidade.
- Quarta requisição obtemos a entidade, para isso passamos a profissão, UF e cidade como parâmetro

## POST

- Ultima parte da requisição é o POST, que tem o objetivo de trazer todos os planos. Para isso devemos passar no body todos os dados necessários obtidos até aqui para a consulta.

## URL do projeto online

[Consulta de planos qualicorp](https://consulta-planos-quarlicorp.netlify.app/)
