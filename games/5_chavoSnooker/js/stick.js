// VARIÁVEIS DE CONTROLE DA TACADA
let tacoAcionado = false
let tacada = false

// OPACIDADE PARA EXIBIR/ESCONDER O TACO
let exibirTaco = 255

// FORÇA APLICADA NO TACO
let forcaTaco = {
    x: 0,
    y: 0
}

// SIMULAR O AFASTAMENTO DO TACO
let exibirForca = 0
let controleForca = true

//POSIÇÃO EM QUE O MOUSE APONTOU PARA O BOLÃO
let posBolao = {
    x: 0,
    y: 0
}

// BOLÃO EM MOVIMENTO
let controleBolao = false

// FUNÇÃO DO TACO
function Stick(){
    this.display = (x, y, jogador) => {
        let size = 180

        //CAPTURANDO A POSIÇÃO DO TACO DE ACORDO COM A POSIÇÃO DO MOUSE
        let posX = mouseX - x
        let posY = mouseY - y

        //CALCULANDO A POSIÇÃO DO TACO EM RELAÇÃO A BOLA
        let angle = Math.atan2(posY, posX) + Math.PI
        let angle2 = angle - Math.PI
        //CALCULANDO A DIREÇÃO DA BOLA
        let dx = size * cos(angle2) 
        let dy = size * sin(angle2)

        // CÓDIGO ASSIM QUE PUXAR O TACO COM O CLIQUE DO BOTÃO ESQUERDO DO MOUSE
        if(tacoAcionado && !controleBolao){
            //CONDIÇÕES PARA LIMITAR O MÍNIMO DA FORÇA NO TACO
            if(exibirForca>=0){
                if(controleForca){
                    exibirForca++
                    forcaTaco.x++
                    forcaTaco.y++
                    if(exibirForca==140){
                        controleForca=false
                    }
                }
            }
            //CONDIÇÕES PARA LIMITAR O MÁXIMO DA FORÇA NO TACO
            if(exibirForca<=140){
                    if(controleForca===false){
                        exibirForca--
                        forcaTaco.x--
                        forcaTaco.y--
                        if(exibirForca==0){
                            controleForca=true
                        }
                    }     
            }
        }

        // CÓDIGO ASSIM QUE SOLTAR O BOTÃO ESQUERDO DO MOUSE
        if(tacada){
            if(exibirForca>=-10){
                exibirForca-=3
            } else {
                exibirTaco = 0 // DESATIVA O TACO COLOCANDO A OPACIDADE COMO 0
                exibirForca = 0  // DESATIVA O TACO COLOCANDO A OPACIDADE COMO 0
                tacoAcionado = false // DESATIVA O TACO POIS O BOLÃO ESTÁ EM MOVIMENTO
                controleForca = true
                tacada = false // A TACADA JÁ FOI REALIZADA
                controleBolao = true // BOLÃO EM MOVIMENTO
                posBolao.x = dx //POSIÇÃO X EM QUE A BOLA FOI APONTADA PELO MOUSE
                posBolao.y = dy //POSIÇÃO Y EM QUE A BOLA FOI APONTADA PELO MOUSE
                ball.vel.x = (forcaTaco.x / 10) * 8 // VELOCIDADE x DA BOLA
                ball.vel.y = (forcaTaco.y / 10) * 8 // VELOCIDADE y DA BOLA
                exibirForca = 0
                //REPRODUZ O SOM DA TACADA
                const music = new Audio('sound/tacada.mp3')
                music.play()
                let vol = 0;
                if(forcaTaco.x >=0){
                    vol = forcaTaco.x
                }else{
                    vol = forcaTaco.x * -1;
                }
                if(vol>100){
                    vol=100;
                }
                forcaTaco.x = 0
                forcaTaco.y = 0
                music.volume = vol/100 // VOLUME DO SOM DE ACORDO COM A FORÇA DA TACADA
            }
        }
        
        //A TACADA FOI REALIZADA E O BOLÃO ESTÁ EM MOVIMENTO
        if(controleBolao){
            //VERIFICA SE A FORÇA DA TACADA É IGUAL OU MENOR QUE 0
            //NECESSÁRIO PARA MOSTRAR QUE A BOLA PAROU.
            if(ball.vel.x==0||ball.vel.y==0){
                
                // VERIFICA SE O JOGADOR BATEU EM ALGUMA BOLA COM O JOGO JÁ DEFINIDO
                // CASO CONTRÁRIO, REMOVER UMA BOLA DO ADVERSÁRIO
                if(players[turnPlayer].collide == 0 && numBalls>0){
                    // ÁUDIO
                    const musicSuicidio = new Audio('sound/jogadaErrada.mp3')
                    musicSuicidio.play()
                    musicSuicidio.volume = 1;

                    // BOLA JÁ REMOVIDA
                    let ballKill = false;

                    // PRÓXIMO JOGADOR
                    let playNext = turnPlayer == 1 ? 0 : 1

                    // REMOVE A BOLA DE MENOR NÚMERO DO ADVERSÁRIO
                    for (let j = 0; j < balls.length; j++ && !ballKill) {
                        // SE O JOGADOR ATUAL FOR 
                        if(players[playNext].playTurn == 0){
                            if(balls[j].numBall % 2 == 0 && !balls[j].goal){
                                // BOLA ENCAÇAPADA
                                balls[j].goal = true;
                                numBalls++;
                                ballKill = true;
                                break
                            }
                        }else{
                            if(balls[j].numBall % 2 != 0 && !balls[j].goal){
                                // BOLA ENCAÇAPADA
                                balls[j].goal = true;
                                numBalls++;
                                ballKill = true;
                                break
                            }
                        }
                    }

                    // SOMA PONTOS AO ADVERSÁRIO
                    players[playNext].point++;

                }
                
                // VERIFICA SE O JOGADOR BATEU PRIMEIRO EM UMA BOLA DO ADVERSÁRIO
                if(players[turnPlayer].adversary == 1 && numBalls>0){
                    // ÁUDIO
                    const musicSuicidio = new Audio('sound/jogadaErrada.mp3')
                    musicSuicidio.play()
                    musicSuicidio.volume = 1;

                    // BOLA JÁ REMOVIDA
                    let ballKill = false;

                    // PRÓXIMO JOGADOR
                    let playNext = turnPlayer == 1 ? 0 : 1
                    
                    // REMOVE A BOLA DE MENOR NÚMERO DO ADVERSÁRIO
                    for (let j = 0; j < balls.length; j++ && !ballKill) {
                        // SE O JOGADOR ATUAL FOR 
                        if(players[playNext].playTurn == 0){
                        if(balls[j].numBall % 2 == 0 && !balls[j].goal){
                            // BOLA ENCAÇAPADA
                            balls[j].goal = true;
                            numBalls++;
                            ballKill = true;
                            break
                        }
                        }else{
                            if(balls[j].numBall % 2 != 0 && !balls[j].goal){
                                // BOLA ENCAÇAPADA
                                balls[j].goal = true;
                                numBalls++;
                                ballKill = true;
                                break
                            }
                        }
                    }
                    players[turnPlayer].adversary = 0;
                    players[playNext].adversary = 0;

                    // SOMA PONTOS AO ADVERSÁRIO
                    players[playNext].point++;

                }
                
                // ZERA AS COLISÕES DA BOLA
                players[turnPlayer].collide = 0;

                if(players[turnPlayer].kill == 0){
                    //MUDA A VEZ DO JOGADOR
                    turnPlayer = turnPlayer == 1 ? 0 : 1 // OPERADOR TERNÁRIO
                }else{
                    players[turnPlayer].kill = 0;
                }
                
                //AGUARDA 500 MILISEGUNDOS PARA EXIBIR O TACO NOVAMENTE
                setTimeout(()=>{
                    exibirTaco = 255
                }, 500)
                //BOLA PAROU
                controleBolao=false
                
            }
            //CASO CONTRÁRIO A BOLA CONTINUA EM MOVIMENTO 
            else {
                //ATRIBUI A POSIÇÃO DO BOLÃO A DIREÇÃO DO MOUSE COM FORÇA APLICADA
                posxBolao+=(posBolao.x/300) * ball.vel.x
                posyBolao+=(posBolao.y/300) * ball.vel.y
            }
        }
        
        stroke(219, 221, 155)
        translate(x, y)
        rotate(angle)
        tint(exibirTaco,exibirTaco)
        // EXIBE O TACO DO JOGADOR DA VEZ
        if(jogador==0){
            image(img1, exibirForca, 0)
        }else{
            image(img2, exibirForca, 0)
        }
        resetMatrix()
    }
}