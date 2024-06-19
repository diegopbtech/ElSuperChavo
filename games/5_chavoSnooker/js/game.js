// INICIALIZAÇÃO DOS OBJETOS
let mesa, ball, taco;
let balls = [];

// FICHAS DA PARTIDA
let token;

// VARIÁVEIS DE CONTROLE DA PARTIDA
let play = false;

// INICIALIZAÇÃO DOS JOGADORES
let players = [];

// POSIÇÃO INICIAL
let posxBolao = 450
let posyBolao = 250

// TACO SELECIONADO
let urlPlayer1 = "pool/pool_1.png";
let urlPlayer2 = "pool/pool_2.png";

// JOGADOR DA VEZ
let turnPlayer;

// QUANTAS BOLAS JÁ FORAM ENCAÇAPADAS
let numBalls = 0;

// CORES DO MENU
let tokensButton = [];
tokensButton[0] = 120;
tokensButton[1] = 120;
tokensButton[2] = 120;
tokensButton[3] = 120;

// HOUVE VENCEDOR
let winner = false;

//CRIANDO O ELEMENTO CANVAS E INICIALIZANDO CADA OBJETO
function setup() {
    createCanvas(1280, 600)
    turnPlayer = Math.floor(Math.random() * 2) // JOGADOR DA VEZ - 0 ou 1
    mesa = new Table()
    drawer = new Drawer()
    ball = new Ball(posxBolao, posyBolao, 28)
    prevPos = createVector(ball.pos.x, ball.pos.y)
    taco = new Stick()
    showBalls()

    // INICIALIZANDO OS JOGADORES
    players[0] = new Player("pool/pool_1.png")
    players[1] = new Player("pool/pool_2.png")

}

//INICIALIZANDO CADA BOLA COM POSIÇÃO INICIAL, COR E NÚMERO
function showBalls(){
    balls[0] = new Balls(940, 192, 28, 2, '#0004ff') // BOLA 2
    balls[7] = new Balls(940, 221, 28,  9, '#fff000') // BOLA 9
    balls[1] = new Balls(940, 250, 28,  3, '#ff0000') // BOLA 3
    balls[8] = new Balls(940, 279, 28,  10, '#0004ff') // BOLA 10
    balls[12] = new Balls(940, 308, 28,  14, '#6cd95f') // BOLA 14

    balls[3] = new Balls(915, 207, 28,  5, '#ff5500') // BOLA 5
    balls[6] = new Balls(915, 236, 28,  8, '#000') // BOLA 8
    balls[13] = new Balls(915, 265, 28,  15, '#b5790b')  // BOLA 15
    balls[9] = new Balls(915, 294, 28,  11, '#ff0000')  // BOLA 11

    balls[4] = new Balls(890, 222, 28,  6, '#6cd95f')  // BOLA 6
    balls[11] = new Balls(890, 251, 28,  13, '#ff5500')  // BOLA 13
    balls[10] = new Balls(890, 280, 28, 12, '#ff00ee')  // BOLA 12

    balls[2] = new Balls(865, 236, 28,  4, '#ff00ee')  // BOLA 4
    balls[5] = new Balls(865, 265, 28,  7, '#b5790b')  // BOLA 7
}

//DESENHAR NO CANVAS (ATUALIZANDO)
function draw() {

    // VERIFICA SE O MOUSE TÁ SOBRE UMA DETERMINADA ÁREA
    isMouseOver()

    background('aqua'); // COR DA PÁGINA PRINCIPAL
    mesa.display(); // DESENHA A MESA DE SINUCA
    drawer.display(); // DESENHA A GAVETA COM AS BOLAS

    
    let posToken = 170;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0)'
    if (tokenImg) {
        for (let l = 1; l < token; l++) {
          tint(255, 255); // Reseta a cor para imagem
          image(tokenImg, 240, posToken, 20, 20);
          posToken += 30;
        }
    }

    if(play){
        mesa.playersPoints() // EXIBE OS JOGADORES

        //RETORNA O CURSOR AO NORMAL
        cursor(ARROW);

        // EXIBE TODAS AS BOLAS (LÁ ELE)
        for(let i in balls){
            if(!balls[i].goal){
                // EXIBE A BOLA (LÁ ELE)
                balls[i].show()
                // VERIFICA SE A BOLA FOI ENCAÇAPADA
                balls[i].checkGoal()
                // ATUALIZA A POSIÇÃO
                balls[i].update()
            }
        }

        // ATUALIZA A POSIÇÃO DA BOLA DE ACORDO COM A TACADA
        ball.update(posxBolao, posyBolao)

        // DESENHA O TACO NA POSIÇÃO EM QUE O BOLÃO ESTIVER
        taco.display(posxBolao, posyBolao, turnPlayer)
        
        // DESENHA A TRILHA DO BOLÃO
        ball.drawTrail()
        
        // DESENHA O BOLÃO
        ball.show()

        // VERIFICA SE O BOLÃO FOI ENCAÇAPADO
        ball.checkGoal()

        // COLISÃO DO BOLÃO COM AS DEMAIS BOLAS
        for (let j = 0; j < balls.length; j++) {
            // VERIFICA SE HOUVE COLISÃO
            if (ball.checkCollision(balls[j]) && !balls[j].goal) {

                // HOUVE COLISÃO PORTANTO O JOGADOR BATEU EM UMA BOLA
                players[turnPlayer].collide++;

                // APLICA AS REGRAS CASO A PRIMEIRA TACADA SEJA EM UMA BOLA DO ADVERSÁRIO
                if(players[turnPlayer].collide==1 && numBalls > 0){
                    // O JOGADOR É PAR
                    if(((players[turnPlayer].playTurn + 2) % 2) == 0){
                        // SE A BOLA FOR IMPAR, REMOVER UMA DO ADVERSÁRIO
                        if(balls[j].numBall % 2 != 0){
                            players[turnPlayer].adversary = 1
                        }
                    }
                    // O JOGADOR É IMPAR
                    else{
                        // SE A BOLA FOR PAR, REMOVER UMA DO ADVERSÁRIO
                        if(balls[j].numBall % 2 == 0){
                            players[turnPlayer].adversary = 1
                        }
                    }
                }

                //REPRODUZ O SOM DA COLISÃO
                const music = new Audio('sound/tacada.mp3')
                music.play()
                let vol = 0;
                if(ball.vel.x>=0){
                    vol = ball.vel.x;
                }else{
                    vol = ball.vel.x * -1;
                }
                if(vol>100){
                    vol=100;
                }

                // VOLUME DE ACORDO COM A FORÇA APLICADA
                music.volume = vol/100
                // HOUVE CONTATO E A BOLA ESTARÁ EM MOVIMENTO
                balls[j].ballControl = true
                // ACIONA A RESPOSTA AO CONTATO REALIZADO SOBRE A BOLA
                ball.handleCollision(balls[j]);

            }
        }

        // COLISÃO DE UMA BOLA COM AS DEMAIS BOLAS (LÁ ELE)
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                // VERIFICA SE HOUVE COLISÃO
                // SE HOUVE COLISÃO, VERIFICAR SE A BOLA SE ENCONTRA NA MESA OU JÁ FOI ENCAÇAPADA
                if (balls[i].checkCollision(balls[j]) && !balls[j].goal) {
                    //REPRODUZ O SOM DA COLISÃO
                    const music = new Audio('sound/tacada.mp3')
                    music.play()
                    let vol = 0;
                    if(balls[i].vel.x>=0){
                        vol = balls[i].vel.x;
                    }else{
                        vol = balls[i].vel.x * -1;
                    }
                    if(vol>100){
                        vol=100;
                    }

                    // VOLUME DE ACORDO COM A FORÇA APLICADA
                    music.volume = vol/100
                    // ACIONA A RESPOSTA AO CONTATO REALIZADO SOBRE A BOLA
                    balls[i].handleCollision(balls[j]);
                }
            }
        }
    }
    // MENU INICIAL DO JOGO ANTES DO INÍCIO
    else{
        ball.showGoal();
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)'
        // Configura a cor e a espessura do contorno
        stroke(0); // Cor do contorno (preto)
        strokeWeight(2); // Espessura do contorno
        // 1 FICHA
        fill(0, 250, 154, tokensButton[0])
        rect(440, 360, 100, 30, 10)
        // TEXTO
        noStroke()
        textSize(15)
        textAlign(CENTER, CENTER)
        fill(0)
        text("1 FICHA", 490, 375)

        // 3 FICHAS
        stroke(0); // Cor do contorno (preto)
        strokeWeight(2); // Espessura do contorno
        fill(0, 250, 154, tokensButton[1])
        rect(550, 360, 100, 30, 10)
        noStroke()
        // TEXTO
        textSize(15)
        textAlign(CENTER, CENTER)
        fill(0)
        text("3 FICHAS", 600, 375)

        // 5 FICHAS
        stroke(0); // Cor do contorno (preto)
        strokeWeight(2); // Espessura do contorno
        fill(0, 250, 154, tokensButton[2])
        rect(660, 360, 100, 30, 10)
        // TEXTO
        noStroke();
        textSize(15);
        textAlign(CENTER, CENTER);
        fill(0)
        text("5 FICHAS", 710, 375)

        // 7 FICHAS
        stroke(0); // Cor do contorno (preto)
        strokeWeight(2); // Espessura do contorno
        fill(0, 250, 154, tokensButton[3])
        rect(770, 360, 100, 30, 10)
        // TEXTO
        noStroke()
        textSize(15)
        textAlign(CENTER, CENTER)
        fill(0)
        text("7 FICHAS", 820, 375)
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)'
    }
    
    //CHECA SE HOUVE UM VENCEDOR
    checkGame()

}

// Variável para controlar a reprodução do áudio
let musicPlayed = false;

function checkGame(){
    if(players[0].point == 7 || players[1].point == 7){
        numBalls = 0;
        for(let i in balls){
            balls[i].goal = false;
            balls[i].pos.x = balls[i].posStart.x;
            balls[i].pos.y = balls[i].posStart.y;
            balls[i].vel.setMag(0);
        }
        token--;
        posxBolao = 450
        posyBolao = 250
        if(players[0].point == 7){
            players[0].winning++;
        }else{
            players[1].winning++;
        }
        players[0].point = 0;
        players[1].point = 0;
    }

    if(token == 0 && play){
            // SOMBREADO
            noStroke();
            fill(152, 251, 152, 40);
            rect(274, 36, 730, 430, 20);

            drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
            noStroke();
            textSize(70);
            textAlign(CENTER, CENTER);
            fill(0);
            text("Vencedor", 650, 150);

            // EXIBE VENCEDOR
            tint(255, 255); // OPACIDADE
            if (players[0].winning > players[1].winning) {
                image(ch, 500, 190);
            } else {
                image(ki, 500, 190);
            }

            // REPRODUZ O SOM DA COLISÃO IMEDIATAMENTE
            if (!musicPlayed) {
                const music = new Audio('sound/jogoEncerrado.mp3');
                music.play();
                musicPlayed = true;
            }

            // ATRASA A LÓGICA RESTANTE
            setTimeout(function() {
                winner = false;
                play = false;
                exibeLogo = 255;
                for (let i in balls) {
                    balls[i].goal = true;
                }
                players[0].winning = 0;
                players[1].winning = 0;
                musicPlayed = false;
            }, 4000);
    }
}

// ACIONAR TACO
function mousePressed(){
    if(play){
        tacoAcionado=true
    }else{
        // 1 FICHA
        if(mouseX > 440 && mouseX < 540 && mouseY > 360 && mouseY < 390){
            play = true;
            token = 1;
            playGame();
        }
        // 3 FICHAS
        else if(mouseX > 550 && mouseX < 650 && mouseY > 360 && mouseY < 390){
            play = true;
            token = 3;
            playGame();
        }
        // 5 FICHAS
        else if(mouseX > 660 && mouseX < 760 && mouseY > 360 && mouseY < 390){
            play = true;
            token = 5;
            playGame();
        }
        // 7 FICHAS
        else if(mouseX > 770 && mouseX < 870 && mouseY > 360 && mouseY < 390){
            play = true;
            token = 7;
            playGame();
        }
    }
}

//SOLTAR TACO
function mouseReleased() {
    tacoAcionado=false
    tacada=true
}

let img1, img2, logo

// PASSAR MOUSE POR CIMA
function isMouseOver(){
    if(!play){
        // 1 FICHA
        if(mouseX > 440 && mouseX < 540 && mouseY > 360 && mouseY < 390){
            tokensButton[0] = 255;
            cursor(HAND);
        }
        // 3 FICHAS
        else if(mouseX > 550 && mouseX < 650 && mouseY > 360 && mouseY < 390){
            tokensButton[1] = 255;
            cursor(HAND);
        }
        // 5 FICHAS
        else if(mouseX > 660 && mouseX < 760 && mouseY > 360 && mouseY < 390){
            tokensButton[2] = 255;
            cursor(HAND);
        }
        // 7 FICHAS
        else if(mouseX > 770 && mouseX < 870 && mouseY > 360 && mouseY < 390){
            tokensButton[3] = 255;
            cursor(HAND);
        }else{
            tokensButton[0] = 120;
            tokensButton[1] = 120;
            tokensButton[2] = 120;
            tokensButton[3] = 120;
            cursor(ARROW);
        }
    }
}

//CARREGAR IMAGENS
function preload(){
    img1 = loadImage(urlPlayer1)
    img2 = loadImage(urlPlayer2)

    ch = loadImage(chaves)
    ki = loadImage(kiko)

    tokenImg = loadImage(tok)

    logo = loadImage(urlLogo)
}

function playGame(){
    exibeLogo = 50;
    for(let i in balls){
        balls[i].goal = false;
        balls[i].pos.x = balls[i].posStart.x;
        balls[i].pos.y = balls[i].posStart.y;
    }
    posxBolao = 450
    posyBolao = 250
}