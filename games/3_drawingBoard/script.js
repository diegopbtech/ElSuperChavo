//DADOS INICIAIS
let corSelecionada = document.getElementById("cores")
let corInput = document.getElementById("cores")
let screen = document.querySelector("#tela")
let contexto = screen.getContext('2d')
let canDraw = false
let mouseX=0, mouseY=0
let tamanho = document.querySelector('#tamanho').value
let tamanhoBorracha = document.querySelector('#tamanhoBorracha').value
let borracha = false
let corBorracha = 'white'
//EVENTOS
document.querySelectorAll('.color').forEach(element => {
    element.addEventListener('click', alterarCor)
});
document.querySelector('#tela').addEventListener('mousedown', ()=>{
    corSelecionada = document.getElementById("cores").value
})
document.querySelector('#tela').addEventListener('mousedown', mouseDownEvent)
document.querySelector('#tela').addEventListener('mousemove', mouseMoveEvent)
document.querySelector('#tela').addEventListener('mouseup', mouseUpEvent)
document.querySelector('#tela').addEventListener('mouseout', mouseUpEvent)
document.querySelector('.ferramenta.clear').addEventListener('click', clearScreen)
document.querySelector('.ferramenta.tinta').addEventListener('click', mudarFundo)
document.querySelector('.ferramenta.borracha').addEventListener('click', usarBorracha)
document.querySelector('.ferramenta.pincel').addEventListener('click', pincel)
document.querySelector('.ferramenta.download').addEventListener('click', downloadTela)

//FUNÇÕES
function alterarCor(e){
    let color = e.target.getAttribute('data-color')
    corInput.value = color
    document.querySelector(".color.active").classList.remove('active')
    e.target.classList.add('active')
    
}

function mouseDownEvent(e){
    canDraw=true
    mouseX = e.pageX - screen.offsetLeft
    mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY)
    }
}

function mouseUpEvent(){
    canDraw=false
}

function draw(x,y){
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    if(borracha){
        contexto.clearRect(mouseX, mouseY, (tamanhoBorracha*10), (tamanhoBorracha*10))
    } else {
        contexto.beginPath()
        contexto.lineWidth = tamanho
        contexto.lineJoin = 'round'
        contexto.moveTo(mouseX, mouseY)
        contexto.lineTo(pointX, pointY)
        contexto.closePath()
        contexto.strokeStyle = corSelecionada
        contexto.stroke()
    }

    

    mouseX = pointX
    mouseY = pointY
}

function pincel(){
    borracha=false
    document.querySelector('#tela').style.cursor = "url(./img/cursor/pincel.cur), default"
    document.querySelector('#tamanho').style.display = 'inline-block'
    document.querySelector('#tamanhoBorracha').style.display = 'none'
}

function clearScreen(){
    contexto.setTransform(1,0,0,1,0,0)
    contexto.clearRect(0,0,contexto.canvas.width, contexto.canvas.height)
}

function mudarFundo(){
    document.querySelector('#tela').style.backgroundColor = corInput.value
}

function usarBorracha(){
    document.querySelector('#tamanho').style.display = 'none'
    document.querySelector('#tamanhoBorracha').style.display = 'inline-block'
    document.querySelector('#tela').style.cursor = "url(./img/cursor/clear.cur), default"
    borracha=true
}

function atualizaTamanho(){
    tamanho = document.querySelector('#tamanho').value
}

function atualizaTamanhoBorracha(){
    tamanhoBorracha = document.querySelector('#tamanhoBorracha').value
}

function downloadTela(){
    let dataUri = screen.toDataURL('image/png', 1.0)
    
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function () {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(xhr.response)
        a.download = 'image_name.png'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
      xhr.open('GET', dataUri)
      xhr.send()

}