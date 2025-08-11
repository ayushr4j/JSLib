import * as Utility from '../utility/utility.js';

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
    }

    iterate(){

        if(this.cur.isEqualNode(this.curElem)){
            
            console.log(this.cur, this.curElem);

        }else{
            //clone node insert.
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

        before = Utility.getPseudoElementContent(elem,"::before");
        after  = Utility.getPseudoElementContent(elem,"::after" );

        elem.dataSet.typingBefore = before;
        elem.dataSet.typingAfter  = after ;

        Utility.setPseudoElementContent(elem,"::before","attr(data-typingBeforeTyped)");
        Utility.setPseudoElementContent(elem,"::after" ,"attr(data-typingBeforeTyped)");

        elem.childrens.forEach(element => {
            this.resetElem(element)
        });

    }

    animate(){

        


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