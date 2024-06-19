let currentStage = 0

// CONTEÚDO DO QUADRO QUE SE TIRA O ELEMENTO
let areaOcupada = null;

let quadroPrincipal = true;

function iniciaJogo(){
    if(etapas[currentStage]!=null){
        let itens = document.querySelector('.areaNeutral')
        let areas = document.querySelector('.areas')
        let fase = etapas[currentStage].itens
        let dicas = etapas[currentStage].dicas
        let qtd = 0

        itens.innerHTML = ''
        areas.innerHTML = ''
        for(let i in fase){
            itens.innerHTML += `<div class='item' id='itens' draggable='true'>${fase[i]}</div>`
            areas.innerHTML += `<div class="area" data-name="${i}">${dicas[i]}</div>`
            qtd++
        }

        document.querySelector('.areas').style.width = qtd*115 + 'px'
        document.querySelector('.areaNeutral').style.width = qtd*115 + 'px'

        document.querySelectorAll('#itens').forEach(item=>{
            item.addEventListener('dragstart', dragStart)
            item.addEventListener('dragend', dragEnd)
        })

        document.querySelectorAll('.area').forEach(item=>{
            item.addEventListener('dragover', dragOverEvent)
            item.addEventListener('dragleave', dragLeaveEvent)
            item.addEventListener('drop', dropEvent)
        })
    } else {
        document.querySelector('.areas').style.display = 'none'
        document.querySelector('.areaNeutral').style.display = 'none'
        document.querySelector('.fim').style.display = 'flex'
    }

}

// EVENTOS


//EVENTS NEUTRAL ÁREA

document.querySelector('.areaNeutral').addEventListener('dragover', dragOverNeutral)
document.querySelector('.areaNeutral').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.areaNeutral').addEventListener('drop', dropNeutral)

// PASSANDO POR CIMA DA ÁREA DAS DICAS E DOS QUADROS
function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

// SOLTANDO POR CIMA DA ÁREA DAS DICAS
function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

// PASSANDO POR CIMA DA ÁREA DAS DICAS
function dragOverEvent(e){
    e.preventDefault()
    if(e.currentTarget.querySelector('.item')===null){
        e.currentTarget.classList.add('hover')
    }
}

// PASSANDO POR CIMA DA ÁREA DAS DICAS E DOS QUADROS
function dragLeaveEvent(e){
    e.currentTarget.classList.remove('hover')
}

// SOLTANDO NA ÁREA DAS DICAS
function dropEvent(e){
    e.currentTarget.classList.remove('hover')
    if(e.currentTarget.querySelector('.item')===null){
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.innerHTML = ""
        e.currentTarget.appendChild(dragItem)
        updateAreas()
    }
    carregarDicas()
}

//EVENTS DA NEUTRAL ÁREA

// PASSANDO POR CIMA DA ÁREA DAS DICAS E DOS QUADROS
function dragOverNeutral(e){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}

// PASSANDO POR CIMA DOS QUADROS
function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}

// SOLTANDO SOBRE OS QUADROS
function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
    updateAreas()
    carregarDicas()
}

//LÓGICA DA FUNÇÃO

function updateAreas(){
    let areas = etapas[currentStage].areas
    let result = etapas[currentStage].result
    let tam = 0
    let ct = 0
    let cn = 0

    document.querySelectorAll('.area').forEach(area=>{
        let name = area.getAttribute('data-name')
        tam++
        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML
            cn++
        } else {
            areas[name] = null
        }
    })

    for(let i in result){
        if(areas[i]==result[i]){
            ct++
        }
    }

    if(ct==tam){
        currentStage++
        iniciaJogo()
    } else if(cn==tam){
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }
}

function recomecar(){
    document.querySelector('.areaNeutral').style.display = 'flex'
    document.querySelector('.areas').style.display = 'flex'
    document.querySelector('.fim').style.display = 'none'
    currentStage=0
    iniciaJogo()
}

function carregarDicas(){
        let dicas = etapas[currentStage].dicas

        document.querySelectorAll('.area').forEach(area => {
            let name = area.getAttribute('data-name');
            
            if (!area.textContent.trim()) {
                area.innerHTML = dicas[name];
            }
        });
}

window.addEventListener('load', iniciaJogo)