// Initial Date
let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
}

let player = ''
let warning = ''
let playing = false
let nivel = 1
let result = [{p1: 0, p2: 0}]

// Events

reset()

document.querySelector('.reset').addEventListener('click', reset)

document.querySelectorAll('.area').forEach(item=>{
    item.addEventListener('click', itemClick)
})

// Functions

    function atualizarNivel(){
        nivel = document.getElementById('dificuldade').value
    }

function selectedSquare(event){
    let selected = event.target.classList.contains('selecionado')
    if(selected==false){
        let img = document.createElement("img")
        img.src = `./images/${player}.png`
        event.target.appendChild(img)
    }
}

function removeSelected(event){
    let selected = event.target.classList.contains('selecionado')
    if(selected==false){
        event.target.querySelector('img').remove()
    }
}

function reset(){
    let random = Math.floor(Math.random()*2)
    if(nivel==4){
        player = (random === 0) ? 'chavo' : 'kiko'
    } else {
        player = 'chavo'
    }
    

    for(let i in square){
        square[i] = ''
        let img = document.querySelector(`div[data-item=${i}]`)
        img.classList.remove('selecionado')
        if(img.querySelector('img')){
            img.querySelector('img').remove()
        }
    }

    warning = 'none'

    playing = true
    renderInfo()
}

function itemClick(event){
    let item = event.target.getAttribute('data-item')
    if(playing && square[item] === ''){
        square[item] = player
        if(nivel == 4){
            togglePlayer()
            renderSquare()
            renderInfo()
        } else {
            renderSquare()
            player = 'kiko'
            renderInfo()
            setTimeout(cpuJoga, 400)
        }
        
    }
}

function cpuJoga(){
    var posCPU = ['a1','a2','a3','b1','b2','b3','c1','c2','c3']
    if(playing && nivel == 1){
        do{
            var elemento = posCPU[Math.floor(Math.random() * posCPU.length)]
        } while (square[elemento]!="")
        square[elemento] = "kiko"
        player = 'chavo'
        renderSquare()
        renderInfo()
    } else if(playing && nivel == 2){
        nivelDois()
    } else if(playing && nivel == 3){
        nivelTres()
    }
    
}

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`)
        if(square[i]!=''){
            let selected = item.classList.contains('selecionado')
            if(selected == false){
                item.classList.add('selecionado')
                let img = document.createElement("img")
                img.src = `./images/${square[i]}.png`
                item.appendChild(img)     
            }
        }
        
    }
    
    checkGame()

}

function togglePlayer(){
    player = (player==='chavo')?'kiko':'chavo'
    renderInfo()
}

function checkGame(){
    if(checkWinnerFor('chavo')){
        warning = 'chavo'
        result[0].p1 ++
        playing = false
        const music = new Audio('./sound/audio_chaves.wav')
        music.play()
    } else if(checkWinnerFor('kiko')){
        warning = 'kiko'
        result[0].p2 ++
        playing = false
        const music = new Audio('./sound/audio_kiko.wav')
        music.play()
    } else if(isFull()){
        warning = 'draw'
        playing = false
    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ]
    for(let w in pos){
        let pArray = pos[w].split(',')
        let hasWon = pArray.every((option)=>{
            if(square[option] === player){
                return true
            } else {
                return false
            }
        })
        if(hasWon){
            return true
        }
    }
    return false
}

function isFull(){
    for(let i in square){
        if(square[i]===''){
            return false
        }
    }
    return true
}

function renderInfo(){
    document.querySelector('.vez img').src = `./images/${player}.png`
    document.querySelector('.player span.p1').innerHTML = result[0].p1
    document.querySelector('.player span.p2').innerHTML = result[0].p2
    if(warning === ''){
        document.querySelector('.resultado img').src = `./images/none.png`
    } else {
        document.querySelector('.resultado img').src = `./images/${warning}.png`
    }
}