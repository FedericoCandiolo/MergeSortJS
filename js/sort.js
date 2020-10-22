/* 
function mergeSort(l){
    let len = l.length;
    if (len == 1) return l;
    let fst_half = l.slice(0,l.length / 2);
    let snd_half = l.slice(l.length / 2);
    fst_half = mergeSort(fst_half);
    snd_half = mergeSort(snd_half);
    let result = [];
    while(0 < fst_half.length && 0 < snd_half.length){
        if(fst_half[0] <= snd_half[0]){
            result = result.concat(fst_half[0]);
            fst_half = fst_half.splice(1);
        }
        else{
            result = result.concat(snd_half[0]);
            snd_half = snd_half.splice(1);
        }
    }
    result = result.concat(fst_half).concat(snd_half);
    return result;
}
 */

function mergeSort(l){

    function moveAndDestroy(min_node, node, top, left){
        console.log(top,left);
        setTimeout(move(min_node,top,left),0);
        setTimeout(()=>{
            node.value = min_node.value;
            node.innerHTML = min_node.innerHTML;
            node.text = min_node.text;
            node.classList.toggle("green_border");
            min_node.classList.toggle("hide");
        },1000);
        //setTimeout(copyAndDelete(min_node,node),1000);
    }

    let len = l.length;
    if (len == 1) l[0].classList.toggle("green_border");
    else{
        let fst_half = l.slice(0,l.length / 2);
        let snd_half = l.slice(l.length / 2);
        let fst_copied = copyNodes(fst_half);
        let snd_copied = copyNodes(snd_half);
        let moves = 0;
        //COPIAR
        setTimeout(()=>{
            for(let i=0; i<fst_copied.length;i++) setTimeout(()=>move(fst_copied[i], 80, -40), 1000*i);
        },1000*moves);
        moves+=fst_copied.length;
        setTimeout(()=>{
            for(let i=0; i<snd_copied.length;i++) setTimeout(()=>move(snd_copied[i], 80, 40), 1000*i);
        },1000*moves);
        moves+=snd_copied.length;
        //RECURSION
        setTimeout(()=>{
            mergeSort(fst_copied);        
        }, 1000*moves);
        moves+=fst_copied.length * 2 * Math.ceil(Math.log2(fst_copied.length));
        setTimeout(()=>{
            mergeSort(snd_copied);        
        }, 1000*moves);
        moves+=snd_copied.length * 2 * Math.ceil(Math.log2(snd_copied.length));
        //CONTRAER
        setTimeout(function(){
            let i=0, j=0;
            let min_node;
            console.log("NUEVO FOR",l);
            for(node of l){
                console.log(`First: ${fst_copied.length}\tSecond: ${snd_copied.length}`);
                if(i<fst_copied.length && j<snd_copied.length){
                    if(fst_copied[i].value <= snd_copied[j].value){
                        min_node = fst_copied[i];
                        i++;
                    } else{
                        min_node = snd_copied[j];
                        j++;
                    }
                } else{
                    if(i<fst_copied.length){
                        min_node = fst_copied[i];
                        i++;
                    }
                    else if(j<snd_copied.length){
                        min_node = snd_copied[j];
                        j++;
                    }
                }
                let min_node_left = parseInt(min_node.style.left.split("px")[0]);
                let node_left = parseInt(node.style.left.split("px")[0]);
                console.log(i+j);
                setTimeout(moveAndDestroy(min_node, node, -80, node_left-min_node_left),2000*(i+j));

            }           
        }, 1000*moves);
        
    }
}

function sort(){ //Wrapper
    let children = Array.from(document.getElementById("section_boxes").children);
    mergeSort(children);
}





//VER EL VALOR DE LA BARRA amount-boxes
addEventListener('load', ()=>{
    document.getElementById("amount_boxes").addEventListener('input',()=>{
        document.getElementById("show_amount").innerHTML = document.getElementById("amount_boxes").value;
    },false);
}, false);

//CREAR CAJAS

function createBox(i, amount){
    let box_margin = 10 
    let box_width = 50 + 2 * box_margin;

    let new_element = document.createElement('div');
    new_element.setAttribute("class","number_box");
    new_element.innerHTML = "<p>" + i.toString() + "</p>";
    new_element.style.position = "absolute";
    new_element.style.top = "250px";
    new_element.style.left = (window.innerWidth / 2 - box_margin + (-amount/2 + i-1) * box_width).toString() + "px";
    new_element.value = i;
    document.getElementById("section_boxes").appendChild(new_element);
}

function createBoxes(){
    let amount = document.getElementById("amount_boxes").value;
    document.getElementById("section_boxes").innerHTML = "";
    for(let i = 1; i <= amount; i++){
        createBox(i, amount);
    }
}

function changeValues(){
    for(box of document.getElementById("section_boxes").children){
        box.value = (Math.random() * 99).toFixed();
        box.innerHTML = "<p>" + box.value + "</p>";
    }
}

//MOVER
var fps = 20;

function move(node, top, left){
    let top_orig = parseInt(node.style.top.split("px")[0]);
    let left_orig = parseInt(node.style.left.split("px")[0]);
    let ms = 1000;
    
    for(let i = 1; i < fps; i++){
        setTimeout(()=>{
            move2(node,top/fps,left/fps);
        },1000/fps*i);
    }
    setTimeout(()=>{
        node.style.top = (top_orig+top).toString() + "px";
        node.style.left = (left_orig+left).toString() + "px";
    },1000);
        
}

function move2(node, top, left){
    node.style.top = (parseInt(node.style.top.split("px")[0])+top).toString() + "px";
    node.style.left = (parseInt(node.style.left.split("px")[0])+left).toString() + "px";
}


//COPIAR NODOS

function copyNodes(l){
    let new_l = [];
    for(index in l){
        let node = l[index];
        let new_node = node.cloneNode();
        new_node.value = node.value;
        new_node.innerHTML = "<p>" + node.value + "</p>";
        document.getElementById("section_boxes").appendChild(new_node);
        new_l = new_l.concat(new_node);
    }
    return new_l;
}

function copyAndDelete(min_node, node){
    node.value = min_node.value;
    node.innerHTML = min_node.innerHTML;
    node.text = min_node.text;
    node.classList.toggle("green_border");
    min_node.classList.toggle("hide");
}

