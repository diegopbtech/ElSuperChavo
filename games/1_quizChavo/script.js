let nome
let currentQuestion = 0
let correctQuestion = 0

document.querySelector('button#comecar').addEventListener('click', comecarJogo)
document.querySelector('button#reiniciar').addEventListener('click', reiniciar)
document.querySelector('button#finalizar').addEventListener('click', finalizar)

function comecarJogo(){
    nome = document.querySelector('#nome').value
    if(nome==''){
        document.querySelector('.alerta').style.opacity = 1
    } else {
        nome = document.querySelector('#nome').value
        document.querySelector('.menuInicial').style.display = 'none'
        introducao()
    }
}

function introducao(){
    document.querySelector('.sejaBemVindo').style.display = 'flex'
    document.querySelector('.sejaBemVindo h1').innerHTML = `Vamos la ${nome}!`
    setTimeout(iniciarQuiz, 800)
}

function iniciarQuiz(){

    if(questions[currentQuestion]){
        let q = questions[currentQuestion]
        let pct = Math.floor((currentQuestion/questions.length)*100)

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.sejaBemVindo').style.display = 'none'
        document.querySelector('.quiz').style.display = 'flex'
        document.querySelector('.question').innerHTML = q.question

        let optionHtml = ''
        for(let i in q.options){
            optionHtml += `<option value='${i}'>${q.options[i]}</option>`
        }

        document.querySelector('.alternativas').innerHTML = optionHtml
        document.querySelectorAll('.alternativas option').forEach(item => {
            item.addEventListener('click', nextQuestion)
        })
    } else {
        finishQuiz()
    }
}

function nextQuestion(e){
    let clickOption = parseInt(e.target.value)

    if(questions[currentQuestion].answer === clickOption){
        correctQuestion++
    }

    currentQuestion++
    iniciarQuiz()

}

function finishQuiz(){

    let media = Math.floor((correctQuestion/questions.length)*100)

    document.querySelector('.progress--bar').style.width = '0%'
    document.querySelector('.quiz').style.display = 'none'
    document.querySelector('.result').style.display = 'flex'

    if(media<40){
        document.querySelector('.result h1').innerHTML = `${nome}, assista mais um pouco!`
        document.querySelector('.result .porcentagem').innerHTML = `${media}%`
        document.querySelector('.result .porcentagem').style.color = '#ff0000'
        document.querySelector('.result .pontuacao').innerHTML = `Você acertou ${correctQuestion} de ${questions.length} perguntas!`
        document.querySelector('#desempenho').src = "./img/derrota.png"
    } else if(media>=40&&media<80){
        document.querySelector('.result h1').innerHTML = `Boa ${nome}!`
        document.querySelector('.result .porcentagem').innerHTML = `${media}%`
        document.querySelector('.result .porcentagem').style.color = '#fffb00'
        document.querySelector('.result .pontuacao').innerHTML = `Você acertou ${correctQuestion} de ${questions.length} perguntas!`
        document.querySelector('#desempenho').src = "./img/metade.png"
    } else if(media>=80&&media<99){
        document.querySelector('.result h1').innerHTML = `Tá bem demais ${nome}!`
        document.querySelector('.result .porcentagem').innerHTML = `${media}%`
        document.querySelector('.result .porcentagem').style.color = '#ff8c00'
        document.querySelector('.result .pontuacao').innerHTML = `Você acertou ${correctQuestion} de ${questions.length} perguntas!`
        document.querySelector('#desempenho').src = "./img/vitoria.png"
    } else {
        document.querySelector('.result h1').innerHTML = `O homem e uma maquina: ${nome}!!`
        document.querySelector('.result .porcentagem').innerHTML = `${media}%`
        document.querySelector('.result .porcentagem').style.color = '#00ff1a'
        document.querySelector('.result .pontuacao').innerHTML = `Você acertou ${correctQuestion} de ${questions.length} perguntas!`
        document.querySelector('#desempenho').src = "./img/vitoria.png"
    }

}

function reiniciar(){
    document.querySelector('.result').style.display = 'none'
    correctQuestion = 0
    currentQuestion = 0
    introducao()
}

function finalizar(){
    document.querySelector('.result').style.display = 'none'
    correctQuestion = 0
    currentQuestion = 0
    nome = ''
    document.querySelector('.menuInicial').style.display = 'flex'
}