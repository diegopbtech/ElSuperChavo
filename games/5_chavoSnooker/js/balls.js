class Balls {
    constructor(x, y, r, numBall, cor) {
      this.posStart = createVector(x, y); // POSIÇÃO INICIAL DA BOLA
      this.pos = createVector(x, y); // POSIÇÃO DA BOLA
      this.vel = createVector(0, 0); // VELOCIDADE INICIAL DA BOLA
      this.r = r; // RAIO DA BOLA
      this.numBall = numBall; // NÚMERO DA BOLA
      this.cor = cor; // COR DA BOLA
      this.ballControl = false; // BOLA EM MOVIMENTO/PARADA
      this.friction = 0.95; // FORÇA DO ATRITO
      this.minSpeed = 0.1  // VELOCIDADE MÍNIMA
      this.maxSpeed = 80; // VELOCIDADE MÁXIMA
      this.goal = true; // VERIFICA SE A BOLA FOI ENCAÇAPADA
      this.goalDrawer = 0; // CONTROLE PARA VERIFICAR SE A BOLA ACABOU DE SER ENCAÇAPADA
      this.positionDrawer = 0; // POSIÇÃO DA BOLA NA GAVETA
    }
  
    update() {
        // LIMITAR VELOCIDADE MÍNIMA
        if (this.vel.mag() < this.minSpeed) {
          this.vel.setMag(0);
          this.ballControl = false;
        }

        // LIMITAR VELOCIDADE MÁXIMA
        if (this.vel.mag() > this.maxSpeed) {
          this.vel.setMag(this.maxSpeed);
        }
      
        this.checkEdges(); // VERIFICA SE HOUVE COLISÃO NAS TABELAS
        this.pos.add(this.vel); // ATUALIZA A VELOCIDADE DA BOLA
        this.vel.mult(this.friction); // APLICA ATRITO
    }

    // COLISÕES COM A TABELA DA MESA DE SINUCA
    checkEdges(){
      
      if (this.pos.x - (this.r/2) < 320 || this.pos.x + (this.r/2) > 978) {
        // CORREÇÃO DO BUG DA BOLA FICAR PRESA NAS BORDAS
        if(this.vel.x!=0){
          this.vel.x*=-1
        }else{
          this.vel.x = 0;
        }
      }

      if (this.pos.y - (this.r/2) < 80 || this.pos.y + (this.r/2) > 440) {
        // CORREÇÃO DO BUG DA BOLA FICAR PRESA NAS BORDAS
        if(this.vel.y!=0){
          this.vel.y*=-1
        }else{
            this.vel.y = 0;
        }
      }

      //CORREÇÃO DO BUG PARA QUE A BOLA NÃO FIQUE FORA DA SINUCA
      if(!this.ballControl){
        if(this.pos.x - (this.r/2) < 325){
            this.pos.x = 325
        }else if(this.pos.x + (this.r/2) > 954){
            this.pos.x = 954
        }
        if(this.pos.y - (this.r/2) < 85){
            this.pos.y = 85
        }else if(this.pos.y + (this.r/2) > 415){
            this.pos.y = 415
        }
      }
      
    }
  
    show() {
        let shadowAlpha = map(this.vel.mag(), 0, 10, 100, 0);
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
        // DESENHA A BOLA PRINCIPAL
        fill(this.cor);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r);
          
        fill(255)
        circle(this.pos.x, this.pos.y, 14)
        textSize(10)
        textAlign(CENTER, CENTER)
        fill(0)
        text(this.numBall, this.pos.x, this.pos.y)
        
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)';

        // DESENHA A SOMBRA INTERNA
        this.drawInnerShadow(shadowAlpha);
    }

    // EXIBE A BOLA NA GAVETA APÓS CAIR
    showGoal(){
      this.pos.x = 1040
      this.pos.y = this.positionDrawer
      this.show();
    }
  
    // DESENHAR SOMBRA INTERNA
    drawInnerShadow(alpha) {
      let gradientSteps = 1;
      for (let i = 0; i < gradientSteps; i++) {
        let step = map(i, 0, gradientSteps, 1, 0);
        fill(255, 255, 255, 255 * step * 0.2);
        ellipse(this.pos.x, this.pos.y, 12 * 2 * step);
      }
    }

    // DETECTA SE A BOLA FOI ENCAÇAPADA
    checkGoal() {
      for (let j = 0; j < pocket.length; j++) {
        let d = dist(this.pos.x, this.pos.y, pocket[j].pos.x, pocket[j].pos.y);
        if(d < this.r / 1.6){
          // O OUTRO JOGADOR
          let next = turnPlayer == 1 ? 0 : 1

          // REPRODUZ SOM DE BOLA NA CAÇAPA
          const music = new Audio('sound/cacapa.mp3')
          music.play()
          music.volume = 1;
          // BOLA ENCAÇAPADA
          this.goal = true;
          numBalls++;
          // VERIFICA SE É A PRIMEIRA BOLA ENCAÇAPADA
          if(numBalls==1){
            players[turnPlayer].point++
            players[turnPlayer].kill++
            // ENCAÇAPAR UMA BOLA PAR O JOGADOR TERÁ SEU JOGO DEFINIDO COMO PAR
            if(this.numBall % 2 == 0){
              players[turnPlayer].playTurn = 0
              players[next].playTurn = 1
            }
            // ENCAÇAPAR UMA BOLA IMPAR O JOGADOR TERÁ SEU JOGO DEFINIDO COMO IMPAR
            else{
              players[turnPlayer].playTurn = 1
              players[next].playTurn = 0
            }
          }
          // JÁ FOI ENCAÇAPADA UMA BOLA E OS JOGADORES JÁ TEM UM JOGO DEFINIDO
          if(numBalls>1){
            // SE O JOGADOR ATUAL FOR PAR
            if(players[turnPlayer].playTurn==0){
              // ENCAÇAPAR UMA BOLA PAR
              if(this.numBall % 2 == 0){
                players[turnPlayer].kill++
                players[turnPlayer].point++
              }else{
                players[next].point++
              }
            }
            // SE O JOGADOR ATUAL FOR IMPAR
            else{
              // ENCAÇAPAR UMA BOLA IMPAR
              if(this.numBall % 2 != 0){
                players[turnPlayer].kill++
                players[turnPlayer].point++
              }else{
                players[next].point++
              }
            }
          }
        }
      }
    }

    // DETECTA A COLISÃO DA BOLA COM AS DEMAIS
    checkCollision(other) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      return (d < this.r);
    }

    // RESPONDE À COLISÃO DETECTADA
    handleCollision(other) {
      // CRIAÇÃO DE UM VETOR NORMAL CRIADO PELOS DOIS PONTOS
      let normal = p5.Vector.sub(this.pos, other.pos);
      // CALCULA A DISTÂNCIA DO VECTOR GERADO
      let distance = normal.mag();

      // CORRIGE A POSIÇÃO PARA QUE NÃO HAJA SOBREPOSIÇÃO
      let overlap = (this.r + other.r - distance) / 2.0;
      let correction = normal.copy().normalize().mult(overlap);
      this.pos.add(correction);
      other.pos.sub(correction);

      // REALIZA O MOVIMENTO NA BOLA IMPACTADA
      normal.normalize();
      let relativeVelocity = p5.Vector.sub(this.vel, other.vel);
      let speed = relativeVelocity.dot(normal);

      if (speed > 0) {
        return;
      }

      // ALTERANDO A VELOCIDADE DE ACORDO COM O IMPACTO CAUSADO
      let impulse = speed;
      let impulseVector = normal.mult(impulse);

      // ALTERA A VELOCIDADE DA BOLA IMPACTADA
      this.vel.sub(impulseVector);
      other.vel.add(impulseVector);
    }

}