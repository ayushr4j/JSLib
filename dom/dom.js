class Node{

    constructor(){
        

        this.before = null;
        this.after = null;

        this.fontSize = "1em";
        this.lineHeight = "1em";
        this.direction = "ltr";

        this.padding = {left: 0, right: 0, top: 0, bottom: 0};
        this.margin = {left: 0, right: 0, top: 0, bottom: 0};
        
        this.width = 0;
        this.height = 0;

        this.shape = null; //define shape of the object
    }

    render(){

    }

}
class Text extends Node{

}
class PseudoElement extends Text{
    constructor(){
        
    }
}

class ContainerNode extends Node{
    _before = null
    _after = null
    _childrens = [];
    constructor(){
        
    }

    
}



class Body extends ParentNode{

}
class Head extends ParentNode{

}
class HTML extends ParentNode{
    constructor(){
        this.head = new Head()
        this.body = new Body()

        this.childrens.append(this.head);
        this.childrens.append(this.body);
    }
}

class Text extends Node{
    constructor(){
        this.text = "";
        
    }
}
class Paragraph extends Node{
    constructor(){

    }
}

class Bold extends Node{

}
class Italic extends Node{

}
class Underline extends Node{

}