import * as utility from "../utility/pseudoElem.js"

class TypingAnimation{

    

    static initialize(){
        var uniq = "typingAnimation"
        const style = document.createElement('style');
        style.id = uniq;
        style.textContent = `
            .${uniq}::before {
                content: attr(data-typing-before) !important;
            }
            .${uniq}::after {
                content: attr(data-typing-after) !important;
            }`;

        document.head.appendChild(style);

        return uniq;
    }
    static typingCssClass = TypingAnimation.initialize();
    
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
        
        

    }

    iterate(){
        console.log("Iterating")
        console.log("Cur", this.cur)
        console.log("CurElem", this.curElem)
        console.log(" ")


        if(this.cur.nodeType == document.ELEMENT_NODE){
            var before = this.cur.dataset.typingBefore;
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

        this.nextNode();
        


        
    

    }

    nextNode(){
        if(this.cur.childNodes.length){

            //cloneNode and insert
            var copyNode = this.cur.childNodes[0].cloneNode(false);
            

            this.curElem.appendChild(copyNode);

            this.curElem = copyNode;
            this.cur = this.cur.childNodes[0];

            if(copyNode.nodeType == document.TEXT_NODE){
                if(copyNode.data.trim().length == 0){
                    this.nextNode();
                }

                copyNode.data = "";
            }
            if(copyNode.nodeType == document.ELEMENT_NODE){
                copyNode.dataset.typingBefore = "";
                copyNode.dataset.typingAfter = "";
            }
            

            this.iterate()

            
        }else{

            //check after

            if(this.cur.nodeType == document.ELEMENT_NODE){
                var after = this.cur.dataset.typingAfter;
                

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
            var before = utility.getPseudoElementContent(elem,"::before");
            var after  = utility.getPseudoElementContent(elem,"::after" );

            elem.dataset.typingBefore = before;
            elem.dataset.typingAfter  = after ;

            elem.classList.add(TypingAnimation.typingCssClass);

        }
        
        elem.childNodes.forEach(element => {
            this.resetElem(element)
        });

    }

    animate(){

        var handler = setInterval(()=>{
            this.iterate();
        },36);


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