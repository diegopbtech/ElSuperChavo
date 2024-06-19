// CONTROLE DE TEMPO
let segundo = 0;
let contSegundos = 0;

var el = document.getElementById('timeProgress');

var options = {
    percent:  el.getAttribute('data-percent') || 25,
    size: 80,
    lineWidth: 8,
    rotate: el.getAttribute('data-rotate') || 0
}

var canvas = document.createElement('canvas');
    
if (typeof(G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 80;

el.appendChild(canvas);

ctx.translate(40, 40);
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

var radius = (options.size - options.lineWidth) / 2;

var drawCircle = function(color, lineWidth, percent) {
		percent = Math.min(Math.max(0, percent || 1), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
		ctx.strokeStyle = color;
        ctx.lineCap = 'round';
		ctx.lineWidth = lineWidth
		ctx.stroke();
};

function segundos(){
    drawCircle('#efefef', 8, 100 / 100);
    drawCircle('#006400', 8, segundo / 100);
    segundo+=contSegundos
}

setInterval(segundos, 1000);