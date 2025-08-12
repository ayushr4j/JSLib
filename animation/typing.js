function getPseudoElement(elem, which){    // which can be ::before or ::after
    const pseudoStyle = window.getComputedStyle(elem, which);
    return pseudoStyle;
}
function getPseudoElementContent(elem, which){
    style = getPseudoElement(elem,which);
    if(style instanceof CSSStyleDeclaration && style.content != 'none') return style.content;
    return "";
}

function setPseudoElementContent(elem, which, string){  //// which can be ::before or ::after
    const style = document.createElement('style');

    var uniq = 'id' + (new Date()).getTime();
    elem.classList.add(uniq)

    style.textContent = `
        .${uniq}${which} {
            content: ${string} !important;
        }`;
    document.head.appendChild(style);
}

const decodeCSSContent = s => s.replace(/^(['"])(.*)\1$/, "$2").replace(/\\([0-9a-fA-F]{1,6}\s?|.)/g, (_, esc) =>
  esc.match(/^[0-9a-fA-F]/) ? String.fromCodePoint(parseInt(esc.trim(), 16)) :
  {n:'\n', r:'\r', t:'\t', b:'\b', f:'\f', '"':'"', "'":"'", "\\":"\\"}[esc] ?? esc
);

class TypingAnimation{
    
    constructor(elem){

        this.cursor = document.createElement("span");
        this.cursor.classList.add("blinking");
        this.cursor.innerText = "|";
        this.cursor.style.cssText = `
            @keyframes blink { 
                0%, 100% {   
                    opacity: 1;
                }
                50% {
                    opacity: 0;
                }
            }
            .blinking {
                animation: blink 1s infinite;
            }`;
        

        this.elem = elem;
        this.resetElem(this.elem);

        this.copy = this.elem.cloneNode(true);
        this.cur = this.copy;
        

        this.elem.innerHTML = "";

        this.curElem = this.elem;
        this.cur = this.copy;

        if(this.elem.nodeType == document.ELEMENT_NODE){
            this.elem.dataset.typingBefore = "";
            this.elem.dataset.typingAfter = "";
        }else if(this.elem.nodeType == document.TEXT_NODE){
            this.elem.data = "";
        }
        

        
        console.log(this.cur)
        console.log(this.curElem)
        

    }

    iterate(){

        if(this.cur.nodeType == document.ELEMENT_NODE){
            var before = this.cur.dataset.typingBefore;
            console.log(before);

            if(before.length){
                this.curElem.dataset.typingBefore += this.cur.dataset.typingBefore[0];
                this.cur.dataset.typingBefore = this.cur.dataset.typingBefore.substring(1);
                return
            }

            

        }else if(this.cur.nodeType == document.TEXT_NODE){

            if(this.cur.data.length){
                this.curElem.data += this.cur.data[0];
                this.cur.data = this.cur.data.substring(1);
                return
            }

        }


        if(this.cur.childNodes.length){

            //cloneNode and insert
            var copyNode = this.cur.childNodes[0].cloneNode(false);
            if(copyNode.nodeType == document.TEXT_NODE) copyNode.data = "";
            if(copyNode.nodeType == document.ELEMENT_NODE){
                copyNode.dataset.typingBefore = "";
                copyNode.dataset.typingAfter = "";
            }

            this.curElem.appendChild(copyNode);

            this.curElem = copyNode;
            this.cur = this.cur.childNodes[0];

            

            this.iterate()

            
        }else{

            //check after

            if(this.cur.nodeType == document.ELEMENT_NODE){
                var after = this.cur.dataset.typingAfter;
                console.log(before);

                if(after.length){
                    this.curElem.dataset.typingAfter += this.cur.dataset.typingAfter[0];
                    this.cur.dataset.typingAfter = this.cur.dataset.typingAfter.substring(1);
                    return
                }
            }

            var curParent = this.cur.parentNode;

            if(curParent == null){
                return;
            }

            var curElemParent = this.curElem.parentNode;
            curParent.removeChild(this.cur);

            this.curElem = curElemParent;
            this.cur = curParent;
        
            this.iterate()

            

        }



        



        





        /*if(this.cur.isEqualNode(this.curElem)){
            
            console.log(this.cur, this.curElem);

        }else{
            //clone node insert.
        }*/

    }

    getNextNode(elem){

        if(elem.childrens.length == 0){
            if(elem.nextSibling == null){
                return elem.parentNode;               
            }else{
                return elem.nextSibling;
            }
        }else return elem.childrens[0];

    }


    resetElem(elem){

        if(elem.nodeType == document.ELEMENT_NODE){
            var before = decodeCSSContent(getPseudoElementContent(elem,"::before"));
            var after  = decodeCSSContent(getPseudoElementContent(elem,"::after" ));

            elem.dataset.typingBefore = before;
            elem.dataset.typingAfter  = after ;

            setPseudoElementContent(elem,"::before","attr(data-typing-before)");
            setPseudoElementContent(elem,"::after" ,"attr(data-typing-after)");
        }
        
        elem.childNodes.forEach(element => {
            this.resetElem(element)
        });

    }

    animate(){

        var handler = setInterval(()=>{
            this.iterate();
        },10);


    }



    start(){

    }

    pause(){

    }

    stop(){

    }

    reset(){
        this.stop()
        this.start()
    }

}