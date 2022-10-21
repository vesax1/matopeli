window.onload=function() {
    canv=document.getElementById("gc"); 
    ctx=canv.getContext("2d"); // yhteys canvasiin
    document.addEventListener("keydown",keyPush); //näppäinkuuntelija
    const interval = setInterval(game,1000/6); // päivitysnopeus
}
px=py=10; // madon paikka
gs=tc=20; // pikselin koko
ax=ay=10; // omenan paikka
xv=yv=0;  // madon suunta ja nopeus
trail=[]; // mato
tail = 5;  // madon pituus
function game() {
    // madon paikan päivitys
    px+=xv; 
    py+=yv;
    if(px<0) {
        clearInterval(interval);
    }
    if(px>tc-1) {
        clearInterval(interval);
    }
    if(py<0) {
        clearInterval(interval);
    }
    if(py>tc-1) {
        clearInterval(interval);
    }
    // canvasin tyhjennys
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
    // madon piirto
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        // jos mato osuu häntäänsä
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
        }
    }
    trail.push({x:px,y:py}); // uusi paikka matoon
    while(trail.length>tail) { // madon ylimääräisen pituuden poisto
        trail.shift();
    }
    // omenan syönti ja uusi omenan paikka
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    //omenan piirto
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
// näppäinpainallusten käsittely
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
        case 32:
                window.location.reload();
                break;
    }
}