let pocket = [];
let exibeLogo = 255;

function Table(){

    this.display = () => {

        // ADICIONANDO SOMBRA
        drawingContext.shadowOffsetX = 4
        drawingContext.shadowOffsetY = 4
        drawingContext.shadowBlur = 2
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)'

        // MESA
        noStroke()
        fill(156, 53, 42)
        rect(274, 36, 730, 430, 20)

        // PROTEÇÃO DA CAÇAPA
        noStroke()
        fill(255)
        rect(274, 36, 50, 50, 20, 0, 0, 0)

        noStroke()
        fill(255)
        rect(274, 416, 50, 50, 0, 0, 0, 20)

        noStroke()
        fill(255)
        rect(954, 36, 50, 50, 0, 20, 0, 0)

        noStroke()
        fill(255)
        rect(954, 416, 50, 50, 0, 0, 20, 0)

        noStroke()
        fill(255)
        rect(615, 36, 50, 50)

        noStroke()
        fill(255)
        rect(615, 416, 50, 50)

        //PANO
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)' // REMOVER SOMBRA DO PANO
        noStroke()
        fill(57, 155, 61)
        rect(290, 50, 700, 400)
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)' // ADICIONAR SOMBRA SOBRE O RESTANTE DOS ELEMENTOS

        //TABELAS
        noStroke()
        fill(49, 209, 54)
        rect(290, 84, 18, 332, 0, 50, 50, 0)
        
        noStroke()
        fill(49, 209, 54)
        rect(324, 50, 298, 18, 0, 0, 50, 50)

        noStroke()
        fill(49, 209, 54)
        rect(658, 50, 298, 18, 0, 0, 50, 50)

        //INVERTENDO A SOMBRA PARA SIMULAR O EFEITO SOBRE AS TABELAS OPOSTAS
        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = -4;
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)';

        noStroke()
        fill(49, 209, 54)
        rect(972, 84, 18, 332, 50, 0, 0, 50)

        noStroke()
        fill(49, 209, 54)
        rect(324, 432, 298, 18, 50, 50, 0, 0)

        noStroke()
        fill(49, 209, 54)
        rect(658, 432, 298, 18, 50, 50, 0, 0)

        //SIMULANDO PROFUNDIDADE NAS CAÇAPAS
        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = -4;
        fill(156, 53, 42)
        circle(305, 65, 42)
        noStroke()

        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = 4;
        fill(156, 53, 42)
        circle(305, 436, 42)
        noStroke()

        drawingContext.shadowOffsetX = 4;
        drawingContext.shadowOffsetY = -4;
        fill(156, 53, 42)
        circle(975, 65, 42)
        noStroke()

        drawingContext.shadowOffsetX = 4;
        drawingContext.shadowOffsetY = 4;
        fill(156, 53, 42)
        circle(975, 436, 42)
        noStroke()

        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
        fill(156, 53, 42)
        circle(640, 58, 38)
        noStroke()

        fill(156, 53, 42)
        circle(640, 444, 38)
        noStroke()

        //CAÇAPAS
        fill(0)
        circle(307, 68, 38)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[0] = new Pocket(307, 68, 38)
        noStroke()

        fill(0)
        circle(307, 434, 38)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[1] = new Pocket(307, 434, 38)
        noStroke()

        fill(0)
        circle(972, 68, 38)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[2] = new Pocket(972, 68, 38)
        noStroke()

        fill(0)
        circle(972, 434, 38)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[3] = new Pocket(972, 434, 38)
        noStroke()

        fill(0)
        circle(640, 60, 35)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[4] = new Pocket(640, 60, 35)
        noStroke()

        fill(0)
        circle(640, 442, 35)
        // ADICIONA A POSIÇÃO DA CAÇAPA A UM OBJETO DA CLASSE POCKET
        // NECESSÁRIO PARA CAPTAR QUANDO A BOLA FOR ENCAÇAPADA
        pocket[5] = new Pocket(640, 442, 35)
        noStroke()
        
        // EXIBINDO LOGO NO MEIO DA SINUCA
        tint(exibeLogo,exibeLogo) // OPACIDADE
        image(logo, 390, 170)

        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)'; // ADICIONA SOMBRA NOVAMENTE

    }

    // EXIBIR OS JOGADORES
    this.playersPoints = () => {
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
        stroke(0);
        strokeWeight(2);
        // PLACAR
        fill(0,250,154)
        rect(520, 475, 245, 50, 5)
        noStroke();
        // JOGADOR DA VEZ
        if(turnPlayer == 0){
            fill(250,0,0)
            rect(520, 475, 80, 50, 5)
            noStroke();
        }else{
            fill(250,0,0)
            rect(680, 475, 85, 50, 5)
            noStroke();
        }

        tint(255,255) // OPACIDADE
        image(ch, 520, 475, 45, 45)
        image(ki, 715, 475, 48, 48)

        // JOGO DO JOGADOR DA VEZ
        fill(0,100,0)
        rect(590, 475, 98, 50)

        // 1° JOGADOR
        noStroke();
        textSize(35);
        textAlign(CENTER, CENTER);
        fill(0)
        text(players[0].winning, 575, 500)

        // 2° JOGADOR
        noStroke();
        textSize(35);
        textAlign(CENTER, CENTER);
        fill(0)
        text(players[1].winning, 704, 500)

        // JOGO DO JOGADOR DA VEZ
        noStroke();
        textSize(25);
        textAlign(CENTER, CENTER);
        fill(255)
        let gameName = players[turnPlayer].playTurn  == 1 ? "IMPAR" : "PAR"
        if(numBalls > 0){
            text(gameName, 640, 500)
        }else {
            text(" - ", 640, 500)
        }

    }
}

let position = 460 // LOCAL ONDE A BOLA ESTÁ NA GAVETA

// EXTRUTURA ONDE AS BOLAS SERÃO GUARDADAS APÓS ENCAÇAPADA (GAVETA)
function Drawer(){
    this.display = () => {
        //GAVETA
        noStroke()
        fill(126, 23, 12)
        rect(1020, 36, 40, 450, 0, 0, 50, 50)

        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
        // SIMULANDO UM EFEITO 3D DE PROFUNDIDADE
        draw3DRect(1025, 35, 30, 445, 4, color(100, 100, 100), 5);

        // VERIFICA QUAL DAS BOLAS JÁ FORAM ENCAÇAPADAS
        for(let i in balls){
            // GOAL É VERDADEIRO QUANDO A BOLA JÁ FOI ENCAÇAPADA
            if(balls[i].goal){
                // EXIBE A BOLA NA GAVETA
                balls[i].showGoal()
                // VERIFICA SE A BOLA ACABOU DE SER ENCAÇAPADA
                if(balls[i].goalDrawer == 0){
                    balls[i].positionDrawer = position; // POSICIONA A BOLA NA POSIÇÃO DISPONÍVEL
                    balls[i].goalDrawer++ // NECESSÁRIO PARA QUE NAS PRÓXIMAS VERIFICAÇÕES A POSIÇÃO NÃO FOR ALTERADA
                    position -= 28 //APÓS ENCAÇAPAR UMA BOLA, GERAR UMA NOVA POSIÇÃO DISPONÍVEL
                }
            }
        }

    }
}

// FUNÇÃO PARA SIMULAR NOÇÃO DE PROFUNDIDADE
function draw3DRect(x, y, w, h, depth, baseColor, layerGap) {
    for (let i = 0; i < depth; i++) {
      let layerX = x + i * layerGap;
      let layerY = y + i * layerGap;
      let layerW = w - i * layerGap * 2;
      let layerH = h - i * layerGap * 2;
  
      let c = lerpColor(baseColor, color(0, 0, 0), i / depth); // GRADIENTE DE COR
  
      noStroke();
      fill(c);
      rect(layerX, layerY, layerW, layerH, 0, 0, max(50 - i * layerGap, 0), max(50 - i * layerGap, 0));
    }
  }

//CAMINHO DA LOGO
let urlLogo = "img/logo.png"

//CAMINHO DAS FICHAS
let tok = "img/token.png"
