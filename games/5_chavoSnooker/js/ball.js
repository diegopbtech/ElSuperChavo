class Ball {
    constructor(x, y, r) {
      this.pos = createVector(x, y); // POSIÇÃO INICIAL DA BOLA
      this.vel = createVector(0, 0); // VELOCIDADE INICIAL DA BOLA
      this.r = r; // RAIO DA BOLA
      this.friction = 0.95; // FORÇA DO ATRITO
      this.minSpeed = 0.1  // VELOCIDADE MÍNIMA
      this.maxSpeed = 100; // VELOCIDADE MÁXIMA
      this.trail = []; // ARRAY PARA ARMAZENAR A TRILHA DA BOLA
      this.trailLength = 10; // NÚMERO DE PONTOS DA TRILHA
    }
  
    update(posxBolao, posyBolao) {
      this.pos.x = posxBolao
      this.pos.y = posyBolao

      // LIMITAR VELOCIDADE MÍNIMA
      if (this.vel.mag() < this.minSpeed) {
        this.vel.setMag(0);
      }

      // LIMITAR VELOCIDADE MÁXIMA
      if (this.vel.mag() > this.maxSpeed) {
        this.vel.setMag(this.maxSpeed);
      }

      // ATUALIZA A TRILHA DA BOLA
      this.updateTrail();

      this.checkEdges();
      this.vel.mult(this.friction); // APLICA ATRITO

    }
    
    // COLISÕES COM A TABELA DA MESA DE SINUCA
    checkEdges(){
      
      if (this.pos.x - (this.r/2) < 300 || this.pos.x + (this.r/2) > 978) {
        // CORREÇÃO DO BUG DA BOLA FICAR PRESA NAS BORDAS
        if(this.vel.x!=0){
          this.vel.x*=-1
        }else{
          this.vel.x = 0;
        }
      }
      if (this.pos.y - (this.r/2) < 60 || this.pos.y + (this.r/2) > 440) {
        // CORREÇÃO DO BUG DA BOLA FICAR PRESA NAS BORDAS
        if(this.vel.y!=0){
            this.vel.y*=-1
        }else{
            this.vel.y = 0;
        }
      }

      //CORREÇÃO DO BUG PARA QUE A BOLA NÃO FIQUE FORA DA SINUCA
      if(!controleBolao){
        if(this.pos.x - (this.r/2) < 325){
            this.pos.x = 325
            posxBolao = 325
            posBolao.x = 325
        }else if(this.pos.x + (this.r/2) > 954){
            this.pos.x = 954
            posxBolao = 954
            posBolao.x = 954
        }
        if(this.pos.y - (this.r/2) < 85){
            this.pos.y = 85
            posyBolao = 85
            posBolao.y = 85
        }else if(this.pos.y + (this.r/2) > 415){
            this.pos.y = 415
            posyBolao = 415
            posBolao.y = 415
        }
      }
    }
  
    updateTrail() {
      // ADICIONA A POSIÇÃO ATUAL À TRILHA
      this.trail.push(createVector(this.pos.x, this.pos.y));
      
      // LIMITA O TAMANHO DA TRILHA
      if (this.trail.length > this.trailLength) {
        this.trail.splice(0, 1);
      }
    }
  
    drawTrail() {
      // DESENHA A TRILHA DA BOLA
      noFill();
      stroke(255, 100); // COR DA TRILHA
      beginShape();
      for (let i = 0; i < this.trail.length; i++) {
        let pos = this.trail[i];
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  
    show() {
      let shadowAlpha = map(0, 0, 10, 100, 0);
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';

      // DESENHA A BOLA PRINCIPAL
      fill(255, 255, 255);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.r);
      
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)';
      // DESENHA A SOMBRA INTERNA
      this.drawInnerShadow(shadowAlpha);
    }
  
    // DESENHAR SOMBRA INTERNA
    drawInnerShadow(alpha) {
      let gradientSteps = 1;
      for (let i = 0; i < gradientSteps; i++) {
        let step = map(i, 0, gradientSteps, 1, 0);
        fill(255, 255, 255, alpha * step * 1); // Transparência da sombra
        ellipse(this.pos.x, this.pos.y, this.r * step);
      }
    }

    // DETECTA SE A BOLA FOI ENCAÇAPADA
    checkGoal() {
      for (let j = 0; j < pocket.length; j++) {
        let d = dist(this.pos.x, this.pos.y, pocket[j].pos.x, pocket[j].pos.y);
        if(d < this.r / 1.6){
          // REPRODUZ SOM DE BOLA NA CAÇAPA
          const music = new Audio('sound/cacapa.mp3')
          music.play()
          music.volume = 1;
          // APLICA AS REGRAS DO JOGO
          // - SE O JOGO JÁ FOI DECIDIDO, REMOVER A BOLA DE MENOR NÚMERO DO ADVERSÁRIO
          if(numBalls!=0){
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
                // SE O JOGADOR ATUAL FOR PAR
                if(players[playNext].playTurn == 0){
                  if(balls[j].numBall % 2 == 0 && !balls[j].goal){
                    // BOLA ENCAÇAPADA
                    balls[j].goal = true;
                    numBalls++;
                    ballKill = true;
                    players[playNext].point++
                    break
                  }
                }else{
                  if(balls[j].numBall % 2 != 0 && !balls[j].goal){
                    // BOLA ENCAÇAPADA
                    balls[j].goal = true;
                    numBalls++;
                    ballKill = true;
                    players[playNext].point++
                    break
                  }
                }
            }
          }
          // POSICIONA O CARAMBOLA NO MEIO APÓS UM SUICÍDIO E RETIRA A VELOCIDADE
          posxBolao = 450;
          posyBolao = 250;
          this.vel.setMag(0);
        }
      }
    }
    
    // DETECTA A COLISÃO DO BOLÃO COM AS DEMAIS BOLAS
    checkCollision(other) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      return (d < this.r);
    }

    // RESPONDE À COLISÃO DETECTADA
    handleCollision(other) {
      let normal = p5.Vector.sub(this.pos, other.pos);
      let distance = normal.mag();

      // CORRIGE A POSIÇÃO PARA QUE NÃO HAJA SOBREPOSIÇÃO
      let overlap = (this.r + other.r - distance) / 2.0;
      let correction = normal.copy().normalize().mult(overlap);
      this.pos.add(correction);
      other.pos.sub(correction);

      normal.normalize();
      let relativeVelocity = p5.Vector.sub(this.vel, other.vel);
      let speed = relativeVelocity.dot(normal);

      if (speed > 0) {
        return;
      }

      // ALTERANDO A VELOCIDADE DE ACORDO COM O IMPACTO CAUSADO
      let impulse = speed * 2;
      let impulseVector = normal.mult(impulse);

      // ALTERA A VELOCIDADE DA BOLA IMPACTADA
      this.vel.sub(impulseVector);
      other.vel.add(impulseVector);

    }

    // EXIBE A BOLA NA GAVETA NO INÍCIO DO JOGO
    showGoal(){
      this.pos.x = 1040
      this.pos.y = 66;
      this.show();
    }

}