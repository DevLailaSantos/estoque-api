//CODIGO 1: PRIMEIRO PASSO
//-----------------------------
// import http from "node:http"; //Pega a caixa de ferramentas de internet que já vem dentro do Node.js
// const PORTA = 3000; //Escolhe a "porta" da casa onde o servidor vai atender

//http.createServer((req, res) => { ... }): Cria o nosso atendente. 
// Ele sempre recebe duas coisas:
//1. req (Requisição): É o bilhete com o pedido que o cliente mandou
//2. res (Resposta): É o papel em branco onde vamos escrever a resposta de volta.
// const servidor = http.createServer ((req, res) => { 
    //res.writeHead(200, ...)Escreve no topo do bilhete: "Código 200 (Tudo certo!)
    //e o que estou te mandando é um texto normal (text/plain)
    //com acentos em português (utf-8)
  //  res.writeHead(200, {
        // "Content-Type": "text/plain; charset=utf-8"
    // });
    //res.end(...): Escreve a frase final e fecha a porta enviando a resposta.
    //(Importante: depois do end, não dá para escrever mais nada!).
   // res.end("Minha primeira API esta no ar!");
// });
//Liga o servidor de verdade e avisa no terminal que ele está escutando.
// servidor.listen(PORTA, () => {
//    console.log(`Servidor em http://localhost:${PORTA}`);
// });

//Dica de ouro do professor: o --watch faz o servidor reiniciar sozinho toda vez que você salvar uma mudança no código!
//(node --watch servidor.js)

//Inicie o repositório local e salve os arquivos no Git:
//git init (Initialized empty Git repository in C:/Users/CRC/estoque-api/.git/)
//git add . (warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it)
//git commit -m "Aula 1: API de estoque com rotas GET" (O terminal deve listar a criação dos arquivos package.json e servidor.js no histórico do commit.)




//CODIGO PARTE 2: colocar todas as rotas pedidas e já deixar tudo atualizado no seu GitHub.
//---------------------------------------------------------------
import http from "node:http";
const PORTA = 3000;

// Lista de produtos na mémoria (Desafio 2)
const produtos = [
    { id: 1, nome: "Mouse", preco: 79.90, estoque: 12},
    { id: 2, nome: "Teclado", preco: 149.90, estoque: 5}
];

//Função para transformar objetos JS em textos JSON e enviar a resposta
function enviarJSON(res, status, dados) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8"}
);
res.end(JSON.stringify(dados));
}

const servidor = http.createServer((req, res) => {
    const caminho = new URL(req.url, "http://localhost").pathname;

    //Bloqueia metodos diferentes de GET (ex: POST, DELETE)
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return enviarJSON(res, 405, { erro: "Metodo não permitido"});
    }

    //Rota 1: Página inicial
    if (caminho === "/") {
        return enviarJSON(res, 200, {mensagem: "API de estoque"});
    }
    
    //Rota 2: Saúde do servidor
    if (caminho === "/saude") {
        return enviarJSON(res, 200, { status: "ok"});

    }

    //Rota 3: Sobre (Desafio 1)
    if (caminho === "/sobre") {
        return enviarJSON(ResizeObserver, 200, {
            projeto: "API de estoque",
            versao: "1.0"
        });
    }

    //Rota 4: Produtos (Desafio 2)
    if (caminho === "/produtos") {
        return enviarJSON(ResizeObserver, 200, {
            total: produtos.length,
            produtos: produtos
        });
    }

    //Rota 5: Categoria (desafio 3)
    if (caminho === "/categorias") {
        return enviarJSON(res, 200, {
            categorias: ["Periféricos", "Informática"]
        });
    }

    //Se nenhum caminho acima bateu, devolva erro 404
    return enviarJSON(res, 404, {
        erro: "Rota não encontrada"
    });
});

servidor.listen(PORTA, () => {
    console.log(`Servidor em http://localhost:${PORTA}`);
});
