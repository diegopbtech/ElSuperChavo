// ETAPA ATUAL
let currentStage = 0

// ARRAY PARA SEPARAR AS CARTAS ALEATORIAMENTE
let etapasAleatorio;

// CARTAS VIRADAS
let cartaVirada = 0;
let cartaViradaContend = null;

// PONTOS
let pontos = 0;

// CARTA ENCONTRADA
let cartaLimpa;

// GAME OVER
let gameOver = false;

// FUNÇÃO PARA EMBALHAR AS CARTAS CONTIDAS NO OBJETO DE ETAPAS
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para marcar gameover como verdadeiro após um tempo
function iniciarContagemTempo(limiteTempo, etapaMomento) {
    setTimeout(() => {
      if(etapaMomento == currentStage){
        gameOver = true;
        console.log("Tempo esgotado. Game over!");
      }
    }, limiteTempo);
  }

function verificarEstadoDoJogo() {
    if (gameOver) {
        document.querySelector('.gameover').style.display = 'flex';
    }
}

function iniciaJogo(){
    if(etapas[currentStage]!=null && !gameOver){
        segundo = 0;
        contSegundos = 100 / (etapas[currentStage].time / 1000);

        iniciarContagemTempo(etapas[currentStage].time, currentStage);

        let cartaGame = document.querySelector('.cartas')
        let cartinhas = etapas[currentStage].cartasImg

        // PEGA OS VALORES DE CARTASIMG DA ETAPA ATUAL
        let cartasArray = Object.values(etapas[currentStage].cartasImg);

        // CHAMA A FUNÇÃO DE EMBARALHAR AS CARTAS E ADICIONA AO ETAPAS ALEATÓRIO
        etapasAleatorio = shuffle(cartasArray);

        cartaGame.innerHTML = ""

        for(let i in cartinhas){
            cartaGame.innerHTML += `<li class="carta" data-name="${i}"><img src="../../img/icone.png"></li>`
        }

        // EVENTOS

        // CLIQUE NA CARTA
        const cartasPecas = document.querySelectorAll('.carta');

        // REDIMENCIONAR A GRADE DE ACORDO COM A QUANTIDADE
        cartasPecas.forEach(function(carta) {
            carta.style.maxWidth = etapas[currentStage].quant;
        })

        // DETECTAR O CLIQUE SOBRE A CARTA
        cartasPecas.forEach(function(carta) {
            carta.addEventListener('click', function() {
                let img = this.querySelector('img');
                let cartaSelecionada = carta.getAttribute('data-name')
                
                if(img) {
                    if(cartaVirada<=1 && img.src != cartaLimpa){
                        
                        img.src = etapasAleatorio[cartaSelecionada];

                        if(cartaVirada==1){
                            if(cartaViradaContend.querySelector('img').src == img.src){
                                pontos++;
                                cartaVirada = 2;
                                if(pontos == etapas[currentStage].points[0]){
                                    currentStage++;
                                    pontos = 0;
                                    cartaVirada = 0
                                    cartaViradaContend = null;
                                    iniciaJogo();
                                }else{
                                    setTimeout(()=>{
                                        img.src = "./img/limpo.png"
                                        cartaViradaContend.querySelector('img').src = "./img/limpo.png"
                                        cartaLimpa = img.src
                                        cartaVirada = 0
                                        cartaViradaContend = null;
                                    }, 500)
                                }
                            }else{
                                cartaVirada = 2;
                                setTimeout(()=>{
                                    img.src = "../../img/icone.png"
                                    cartaViradaContend.querySelector('img').src = "../../img/icone.png"
                                    cartaVirada = 0
                                    cartaViradaContend = null;
                                }, 500)
                            }
                        }else {
                            cartaViradaContend = carta
                            cartaVirada++;
                        }
                    }
                } else {
                    console.error('Imagem não encontrada dentro do elemento .carta');
                }

            });
        });

    } else {
        document.querySelector('.cartas').style.display = 'none'
        document.querySelector('.fim').style.display = 'flex'
    }
}

function recomecar(){
    document.querySelector('.cartas').style.display = 'flex'
    document.querySelector('.fim').style.display = 'none'
    document.querySelector('.gameover').style.display = 'none'
    gameOver = false;
    currentStage=0
    iniciaJogo()
}

setInterval(verificarEstadoDoJogo, 1000); // VERICA REPETIDAMENTE SE O JOGADOR ATINGIU

window.addEventListener('load', iniciaJogo)