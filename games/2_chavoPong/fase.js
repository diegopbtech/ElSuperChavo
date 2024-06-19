var iconeCPU = document.querySelector("#iconeCPU")

function faseAtual(){
    if(fase==1){
        nivel = 6
        document.querySelector("body").style.backgroundImage = 'url(./img/fases/fase-1.jpg)'
        document.querySelector("div.fundo").style.backgroundColor = 'rgba(0, 0, 255, 0.6)'
        document.querySelector("#titulo").innerHTML = 'Primeira Fase'
        document.querySelector(".campo").style.backgroundColor = 'rgb(9, 47, 0)'
        iconeCPU.src = './img/personagens/barriga.jpg'
        CPU.style.backgroundColor = 'rgb(61, 35, 0)'
        CPU.style.border = '1px solid white'
    } else if (fase==2){
        nivel = 5
        document.querySelector("body").style.backgroundImage = 'url(./img/fases/fase-2.jpg)'
        document.querySelector("div.fundo").style.backgroundColor = 'rgba(255, 97, 210, 0.6)'
        document.querySelector("#titulo").innerHTML = 'Oitavas de Final'
        document.querySelector(".campo").style.backgroundColor = 'rgb(73, 1, 42)'
        iconeCPU.src = './img/personagens/florinda.jpg'
        CPU.style.backgroundColor = 'rgb(187, 0, 172)'

    } else if (fase==3){
        nivel = 4
        document.querySelector("body").style.backgroundImage = 'url(./img/fases/fase-3.jpg)'
        document.querySelector("div.fundo").style.backgroundColor = 'rgba(0, 0, 255, 0.6)'
        document.querySelector("#titulo").innerHTML = 'Quartas de Final'
        document.querySelector(".campo").style.backgroundColor = 'rgb(0, 179, 255)' 
        iconeCPU.src = './img/personagens/kiko.jpg'
        CPU.style.backgroundColor = 'rgb(0, 213, 255)'
    } else if (fase==4){
        nivel = 2
        document.querySelector("body").style.backgroundImage = 'url(./img/fases/fase-4.jpg)'
        document.querySelector("div.fundo").style.backgroundColor = 'rgba(120, 106, 0, 0.6)'
        document.querySelector("#titulo").innerHTML = 'Semifinal' 
        document.querySelector(".campo").style.backgroundColor = 'rgb(81, 50, 0)'
        iconeCPU.src = './img/personagens/madruga.jpg'
        CPU.style.backgroundColor = 'rgb(190, 139, 1)'
        CPU.style.border = '1px solid white' 
    } else if (fase==5){
        nivel = 1.5
        document.querySelector("body").style.backgroundImage = 'url(./img/fases/fase-5.jpg)'
        document.querySelector("div.fundo").style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
        document.querySelector("#titulo").innerHTML = 'Grande Final' 
        document.querySelector(".campo").style.backgroundColor = 'rgb(100, 0, 0)'
        iconeCPU.src = './img/personagens/chapolin.jpg'
        CPU.style.backgroundColor = 'rgb(255, 0, 00)'
        CPU.style.border = '1px solid white' 
    } else {
        document.querySelector(".campeao").style.display = 'flex'
    }
}