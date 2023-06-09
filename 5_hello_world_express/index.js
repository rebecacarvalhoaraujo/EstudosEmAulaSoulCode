const express = require("express");
const fs = require("fs");
const CPF = require("cpf");

// Define uma aplicação backend em Express
// Recursos pré-configurados
const app = express();

// Define um roteamento
// Manipulador de rota
app.get("/", (requisicao, resposta) => {
  resposta.send("<h2>Batata!!!!</h2>");
});

// req = requisicao do cliente
// res = resposta do servidor
app.get("/teste", (req, res) => {
  // manipulador de rota
  // req = objeto com dados do cliente/solicitante
  // res = objeto com dados p/ resposta do servidor
  res.send("<p>O que deseja amigo?</p>");
});

app.get("/inicio", (req, res) => {
  const arquivo = fs.readFileSync("./inicio.html");
  res.send(arquivo.toString());
});

app.get("/ajuda", (req, res) => {
  const arquivo = fs.readFileSync("./ajuda.html");
  res.send(arquivo.toString());
});

// Parâmetro de caminho/rota
app.get("/funcionarios/:cpf", (req, res) => {
  // req.params = guarda todos os parametros de rota
  // const cpf = req.params.cpf;
  const { cpf } = req.params;

  if (CPF.isValid(cpf)) {
    // Por padrão status é 200
    res.send("O cpf é válido!");
  } else {
    // 400 = quando o cliente manda informação
    // inválida
    res.status(400).send("O cpf é inválido!");
  }
});

app.get("/pessoas/:nome/:empresa", (req, res) => {
  // const nome = req.params.nome;
  // const empresa = req.params.empresa;
  const { nome, empresa } = req.params;
  res.send(`${nome} e ${empresa}`);
});

app.get("/imc/:peso/:altura", (req, res) => {
  const peso = Number(req.params.peso);
  const altura = Number(req.params.altura);
  const imc = peso / altura ** 2;

  res.send(`<p>IMC: ${imc.toFixed(2)}</p>`);
});

app.get("/cpfs/:numero", (req, res) => {
  const numero = Number(req.params.numero);

  for (let i = 0; i < numero; i++) {
    res.write(`<p>${CPF.generate()}</p>`);
  }
  res.end();
});

// Inicializa a escuta de requisições do servidor
app.listen(3000, () => {
  // roda sempre que o servidor inicia com sucesso
  console.log("Servidor rodando em http://localhost:3000/");
});

/** Exercício I: Crie dois arquivos html: inicio.html e
 * ajuda.html. Defina uma rota GET /inicio que lê o arquivo
 * inicio.html e responde com seu conteúdo. Defina outra
 * rota /ajuda que lê o arquivo ajuda.html e responde com
 * seu conteúdo. Dentro do arquivo inicio.html, deve haver
 * um link para a página de ajuda.
 * TEMPO = 15 min
 */
