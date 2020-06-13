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

# Sprint 4: Rotas para requisitar portabilidade dos dados e criptografia
Nessa sprint foram definidas duas rotas, uma para requisitar a portabilidade dos dados e outra para indicar que a operação ocorreu com sucesso. Além das rotas, também foi implementado a criptografia dos dados sendo portados. O diagrama a seguir demonstra a sequência de eventos entre as aplicações.

<img src="img/diag_seq.png" height=300px>

*Diagrama criado utilizando o [mermaid live editor](https://mermaid-js.github.io/mermaid-live-editor/)*

# Demonstração
Para as demonstrações, foi utilizado o software Postman [<img src="img/logo_postman.png" height=40px>](https://www.postman.com/).

## 1. Mostrando os dados dos dispositivos
<img src="img/devices.gif">

## 2. Requisitando a portabilidade, enviando a chave pública e recebendo um JSON com os dados criptografados
<img src="img/port_request.gif">

## 3. Descriptografando os dados
<img src="img/crypto_ok.gif">

## 4. Sinalizando que a operação occorreu com sucesso e apagando os dados do banco
<img src="img/port_ok.gif">