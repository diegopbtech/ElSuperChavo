// ELEMENTOR
var btnComeca
var Bola
var Jogador
var CPU
var pontosJog
var pontosComp
var setJog
var setComp
var fase=1
var tituloFase
var ganhou = false
var nivel = 5

// ANIMAÇÃO
var frames

//POSIÇÃO DOS ELEMENTOS
var posBolaY, posBolaX
var posJogadorY, posJogadorX
var posCPUY, posCPUX

//POSIÇÕES INICIAIS
var posJogadorInicialX=12, posJogadorInicialY=37.5, posCpuInicialX=86, posCpuInicialY=37.5, posBolaInicialX=49.1, posBolaInicialY=47.5

//CONTROLE DO TECLADO
var dirJogadorY

//TAMANHOS
var campoX=0, campoY=0, campoW=88, campoH=80
var barraW=1.8, barraH=25, bolaW=1.8, bolaH=4

//DIREÇÃO
var bolaX, bolaY
var jogadorY=0, cpuY=0

//VELOCIDADE
var velBola, velJogador, velCPU

//CONTROLES
var pontosJogador=0
var pontosCpu=0
var setJogador=0
var setCPU = 0
var jogo = false

    function teclaDown(){
        tecla = event.keyCode
        if(tecla==38){
            dirJogadorY=0
        } else if (tecla==40){
            dirJogadorY=0
        }
    }

    function teclaUp(){
        tecla = event.keyCode
        if(tecla==38){//CIMA
            dirJogadorY=-1
        } else if (tecla==40){//BAIXO
            dirJogadorY=+1
        }
    }

    function controlaJog(){
        if(jogo){
            posJogadorY += velJogador*dirJogadorY
            if(((posJogadorY+(barraH/2))>=campoH)||((posJogadorY)<=8)){
                posJogadorY += (velJogador*dirJogadorY)*(-1)
            }
            Jogador.style.top = posJogadorY+"%"
        }
    }

    function controlaCpu(){
        if(jogo){
            if((posBolaX>(campoW/2))&&(bolaX>0)){
                //MOVIMENTAR CPU
                if((posBolaY+(bolaH/2))>(posCPUY+(barraH/2))+velCPU){
                    //MOVER PARA BAIXO
                    if((posCPUY+barraH)<=90){
                        posCPUY+=velCPU
                    }
                } else if((posBolaY+(bolaH/2))<(posCPUY+(barraH/2))-velCPU){
                    //MOVER PARA CIMA
                    if(posCPUY>=10){
                        posCPUY-=velCPU
                    }
                }
            } else {
                //POSICIONAR CPU NO CENTRO
                if((posCPUY+(barraH/2)) < 50){
                    posCPUY += velCPU
                } else if ((posCPUY+(barraH/2)) > 50){
                    posCPUY -= velCPU
                }
            }
            CPU.style.top = posCPUY + "%"
        }
    }

    function controlaBola(){
        posBolaX+=velBola*bolaX
        posBolaY+=velBola*bolaY

        //COLISÃO COM O JOGADOR

        if((posBolaX <= posJogadorX+barraW)&&((posBolaY+bolaH >= posJogadorY)&&(posBolaY<=posJogadorY+barraH))){
            bolaY=((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/2
            bolaX*=-1
            const music = new Audio('./sound/toque_na_bola.mp3')
            music.play()
        }

        //COLISÃO COM A CPU

        if((posBolaX >= posCPUX-barraW)&&(posBolaY+bolaH >= posCPUY)&&(posBolaY <= posCPUY+barraH)){
            bolaY=((posBolaY+(bolaH/2))-(posCPUY+(barraH/2)))/nivel
            bolaX*=-1
            const music = new Audio('./sound/toque_na_bola.mp3')
            music.play()
        }

        //LIMITES INFERIOR E SUPERIOR
        if((posBolaY>=85)||(posBolaY<=10)){
            bolaY*=-1
            const music = new Audio('./sound/toque_nas_laterais.mp3')
            music.play()
        }

        //SAIU PELA DIREITA OU PELA ESQUERDA
        if(posBolaX>=(campoW-bolaW)){
            velBola=0
            posBolaX=posBolaInicialX
            posBolaY=posBolaInicialY
            posJogadorX=posJogadorInicialX
            posJogadorY=posJogadorInicialY
            jogo=false
            pontosJogador++
            Jogador.style.top = posJogadorY + "%"
            CPU.style.top = posJogadorY+"%"
            if(pontosJogador>=10){
                setJogador++
                if(((setJogador==2)&&(setCPU==0))||((setJogador==3)&&(setCPU==1))||((setJogador==3)&&(setCPU==2))){
                    pontosJogador=0
                    pontosCpu=0
                    setJogador = 0
                    setCPU = 0
                    setJog.innerHTML = setJogador
                    setComp.innerHTML = setCPU
                    btnComeca.style.display = 'block'
                    tituloFase.style.display = 'block'
                    btnComeca.innerHTML = "Próxima Fase"
                    fase++
                    faseAtual()  
                } else {
                    pontosJogador=0
                    pontosCpu=0
                    setJog.innerHTML = setJogador
                    btnComeca.style.display = 'block'
                    btnComeca.innerHTML = "Iniciar Set"
                }
                
            } else {
                setTimeout(iniciaJogo, 1000)
            }
            pontosJog.innerHTML = pontosJogador
            pontosComp.innerHTML = pontosCpu
            const music = new Audio('./sound/som_ponto.mp3')
            music.play()
        } else if(posBolaX<=12){
            velBola=0
            posBolaX=posBolaInicialX
            posBolaY=posBolaInicialY
            posJogadorX=posJogadorInicialX
            posJogadorY=posJogadorInicialY
            jogo=false
            pontosCpu++
            Jogador.style.top = posJogadorY + "%"
            CPU.style.top = posJogadorY+"%"
            if(pontosCpu>=10){
                setCPU++
                if(((setCPU==2)&&(setJogador==0))||((setCPU==3)&&(setJogador==1))||((setCPU==3)&&(setJogador==2))){
                    pontosJogador=0
                    pontosCpu=0
                    setJogador = 0
                    setCPU = 0
                    setJog.innerHTML = setJogador
                    setComp.innerHTML = setCPU
                    document.querySelector(".gameover").style.display = 'flex'
                } else {
                    pontosJogador=0
                    pontosCpu=0
                    setJog.innerHTML = setJogador
                    btnComeca.style.display = 'block'
                    btnComeca.innerHTML = "Iniciar Set"
                }
                pontosJogador=0
                pontosCpu=0
                setComp.innerHTML = setCPU
                btnComeca.style.display = 'block'
                btnComeca.innerHTML = "Iniciar Set"
            } else {
                setTimeout(iniciaJogo, 1000)
            }
            pontosJog.innerHTML = pontosJogador
            pontosComp.innerHTML = pontosCpu
            const music = new Audio('./sound/som_ponto.mp3')
            music.play()
        }

        Bola.style.top = posBolaY + "%"
        Bola.style.left = posBolaX + "%"
    }

    function game(){
        if(jogo){
            controlaJog()
            controlaBola()
            controlaCpu()
        }
        frames = requestAnimationFrame(game)
    }

    function iniciaJogo(){
        if(!jogo){
            btnComeca.style.display = 'none'
            tituloFase.style.display = 'none'
            cancelAnimationFrame(frames)
            jogo=true
            dirJogadorY=0
            bolaY=0
            velBola=1
            velJogador=velCPU=2
            if((Math.random()*10)<5){
                bolaX = -1
            } else {
                bolaX = 1
            }
            posBolaX = posBolaInicialX
            posBolaY = posBolaInicialY
            posCPUY = posCpuInicialY
            posCPUX = posCpuInicialX
            posJogadorY=posJogadorInicialY
            posJogadorX=posJogadorInicialX
            const musicSaida = new Audio('./sound/apito_inicial.mp3')
            musicSaida.play()
            game()
        }
    }

    function inicializa(){
        velBola=1
        velJogador=velCPU=2
        btnComeca = document.querySelector("#btnComeca")
        btnComeca.addEventListener('click', iniciaJogo)
        tituloFase = document.querySelector("#titulo")
        Jogador = document.querySelector("#jogador")
        CPU = document.querySelector("#cpu")
        Bola = document.querySelector("#bola")
        pontosJog = document.querySelector("#pontosJog")
        pontosComp = document.querySelector("#pontosCpu")
        setJog = document.querySelector("#setJogador")
        setComp = document.querySelector("#setCPU")
        document.addEventListener("keydown", teclaDown)
        document.addEventListener("keyup", teclaUp)
    }

    function reiniciar(){
        fase=1
        faseAtual()
        document.querySelector(".campeao").style.display = 'none'
        document.querySelector(".gameover").style.display = 'none'
        tituloFase.style.display = "block"
        btnComeca.innerHTML = "Começar Campanha"
    }

window.addEventListener('load', inicializa)
window.addEventListener('load', faseAtual)