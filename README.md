<img src="img/logo_fatecsjc.png" height=150px>

# Seguranca da Informacao
Projeto sobre LGPD desenvolvido nas aulas de Seguranca da Informação da Fatec SJC.

Para o desenvolvimento do projeto, foi escolhido um sistema para o gerenciamento de dispositivos IoT.

## Integrantes: 
Victor de Souza Dias Carvalho Goulart

## Tema: 
Portabilidade de dados

## Tecnologias utilizadas:
- [<img src="img/logo_nodejs.png" height=40px>](https://nodejs.org/en/) Node.js

- [<img src="img/logo_react.png" height=40px>](https://reactjs.org/) React

- [<img src="img/logo_postgresql.png" height=40px>](https://www.postgresql.org/) PostgreSQL

# Sprint 2: Rotas para requisitar portabilidade dos dados
Nessa sprint foram definidas duas rotas, uma para requisitar a portabilidade dos dados e outra para indicar que a operação ocorreu com sucesso. O diagrama a seguir demonstra a sequência de eventos entre as aplicações.

<img src="img/diag_seq.png" height=300px>

*Diagrama criado utilizando o [mermaid live editor](https://mermaid-js.github.io/mermaid-live-editor/)*

# Demonstração
Para as demonstrações, foi utilizado o software Postman [<img src="img/logo_postman.png" height=40px>](https://www.postman.com/).

## 1. Mostrando os dados dos dispositivos
<img src="img/devices.gif">

## 2. Requisitando a portabilidade e recebendo um JSON com os dados
<img src="img/port_request.gif">

## 3. Sinalizando que a operação occorreu com sucesso e apagando os dados do banco
<img src="img/port_ok.gif">