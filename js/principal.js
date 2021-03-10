var direcaoxJ,direcaoyJ,jogo;
var frame;
var velTiro;
var tamanhoTelaW,tamanhoTelaH;
var jogador,velJogador,PosicaoJogadorx,PosicaoJogadory;
var contBombas,painelBombas,bombasTotal,velBomba;
var vidaPlaneta,IntervaloBombas;
var indiceExplosao,indiceSom;

function teclaDown(){
    let tecla = event.keyCode;
    if(tecla == 38){ //para cima
        direcaoyJ=-1
    }else if(tecla == 40){ //para baixo
        direcaoyJ=1;
    }
    if(tecla == 37){ //para a esquerda 
        direcaoxJ=-1;
    }else if(tecla == 39){ // para a direita
        direcaoxJ=1;
    }
    if(tecla == 32){ //tiro
        atirar(PosicaoJogadorx+17,PosicaoJogadory);
    }
}

function teclaUp(){
    let tecla = event.keyCode;
    if((tecla == 38) || (tecla == 40)){
        direcaoyJ=0;
    }
    if((tecla == 37)|| (tecla==39)){
        direcaoxJ=0;
    }
}

function colisaoTiroBomba(tiro){
    let tam = bombasTotal.length;
    for(i=0;i<tam;i++){
        if(bombasTotal[i]){
            if(
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&& //parte cima do tiro
                    ((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) //parte de baixo do tiro
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&&//esquerda tiro com a parte direita da bomba
                    ((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) //direita tiro com a parte esquerda da bomba
                )

            ){
                criarExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop)
                bombasTotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function controlarTiros(){
    let tiros=document.getElementsByClassName("tiroJogador");
	let tam=tiros.length;
	for(var i=0;i<tam;i++){
		if(tiros[i]){
			let pt=tiros[i].offsetTop;
			pt-=velTiro;
			tiros[i].style.top=pt+"px";
			colisaoTiroBomba(tiros[i]);
			if(pt<0){
				//document.body.removeChild(tiros[i]);
				tiros[i].remove();
			}
		}
	}
}
function criarBombas(){
    if(jogo){
        let y = 0;
        let x = Math.random() * tamanhoTelaW;
        let bomba = document.createElement("div");
        let att1 = document.createAttribute("class");
        let att2 = document.createAttribute("style");
        att1.value = "bomba";
        att2.value = "top:"+y+"px;left:"+x+"px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
}

function controlarBombas(){
    bombasTotal = document.getElementsByClassName("bomba");
    let tamanho = bombasTotal.length; //retorna o valor de bombas definidas
    for(i=0;i<tamanho;i++){
        if(bombasTotal[i]){
            let pi = bombasTotal[i].offsetTop;
            pi+=velBomba;
            bombasTotal[i].style.top=pi+"px";
            if(pi>tamanhoTelaH){
                vidaPlaneta-=10;
                criarExplosao(2,bombasTotal[i].offsetLeft,null)
                bombasTotal[i].remove();
            }
        }
    }
}

function atirar(x,y){
    let t = document.createElement("div");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    att1.value = "tiroJogador"
    att2.value = "top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t)

}

function criarExplosao(tipo,x,y){

    if(document.getElementById("explosao"+(indiceExplosao-4))){
        document.getElementById("explosao"+(indiceExplosao-4)).remove();
    }
    var explosao=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");
	//Atributos para div
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");
	//Atributo para imagem
	var att4=document.createAttribute("src");
	//Atributos para audio
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+indiceExplosao;
	if(tipo==1){
		att1.value="explosaoAr";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="gifs/explosao_ar.gif?"+new Date();
	}else{
		att1.value="explosaoChao";
		att2.value="top:"+(tamanhoTelaH-57)+"px;left:"+(x-17)+"px;";
		att4.value="gifs/explosao_chao.gif?"+new Date();
	}
	att5.value="sons/exp1.mp3?"+new Date();
	att6.value="som"+indiceSom;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img);
	explosao.appendChild(som);
	document.body.appendChild(explosao);
	document.getElementById("som"+indiceSom).play();
	indiceExplosao++;
	indiceSom++;
}

function controlarJogador(){
    PosicaoJogadory+= direcaoyJ * velJogador; //sobe -5 pixels
    PosicaoJogadorx+= direcaoxJ * velJogador; //sobe -5 pixels
    jogador.style.top = PosicaoJogadory + "px";
    jogador.style.left = PosicaoJogadorx + "px";
}

function gameLoop(){
    if(jogo){
        //funcoes controles
        controlarJogador();
        controlarTiros();
        controlarBombas();
    }

    frame=requestAnimationFrame(gameLoop)// loop do game
}

function iniciar(){
    jogo = true;

    //iniTela
    tamanhoTelaH = window.innerHeight;
    tamanhoTelaW = window.innerWidth;
    //iniJogador
    direcaoxJ=direcaoyJ=0
    PosicaoJogadorx = tamanhoTelaW/2;
    PosicaoJogadory = tamanhoTelaH/2;
    velJogador=velTiro=7;
    jogador = document.getElementById("naveJog");
    jogador.style.top = PosicaoJogadory + "px";
    jogador.style.left = PosicaoJogadorx + "px";
    //controle bombas
    clearInterval(IntervaloBombas);
    contBombas=150;
    velBomba=4;
    IntervaloBombas=setInterval(criarBombas,1700);

    //controle planeta
    vidaPlaneta=300;
    //controles explosao
    indiceExplosao=indiceSom=0;
    gameLoop();
}
window.addEventListener("load",iniciar);
document.addEventListener("keydown",teclaDown);
document.addEventListener("keyup",teclaUp);
