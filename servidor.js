import http from "node:http"; //Pega a caixa de ferramentas de internet que já vem dentro do Node.js
const PORTA = 3000; //Escolhe a "porta" da casa onde o servidor vai atender

//http.createServer((req, res) => { ... }): Cria o nosso atendente. 
// Ele sempre recebe duas coisas:
//1. req (Requisição): É o bilhete com o pedido que o cliente mandou
//2. res (Resposta): É o papel em branco onde vamos escrever a resposta de volta.
const servidor = http.createServer ((req, res) => { 
    //res.writeHead(200, ...)Escreve no topo do bilhete: "Código 200 (Tudo certo!)
    //e o que estou te mandando é um texto normal (text/plain)
    //com acentos em português (utf-8)
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    //res.end(...): Escreve a frase final e fecha a porta enviando a resposta.
    //(Importante: depois do end, não dá para escrever mais nada!).
    res.end("Minha primeira API esta no ar!");
});
//Liga o servidor de verdade e avisa no terminal que ele está escutando.
servidor.listen(PORTA, () => {
    console.log(`Servidor em http://localhost:${PORTA}`);
});

//Dica de ouro do professor: o --watch faz o servidor reiniciar sozinho toda vez que você salvar uma mudança no código!
