
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