//let titulo = document.querySelector('h1');
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10";
let listaDeNumerosSorteados = []
let numeroLista = 100
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemIncial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

mensagemIncial()

function verificarChute(event) {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }

}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * (numeroLista - 1) +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    if (quantidadeDeElementosNaLista == numeroLista){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}