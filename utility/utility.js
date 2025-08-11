export function getPseudoElement(elem, which){    // which can be ::before or ::after
    const pseudoStyle = window.getComputedStyle(elem, which);
    return pseudoStyle;
}
export function getPseudoElementContent(elem, which){
    style = getPseudoElements(elem,which);
    if(style instanceof CSSStyleDeclaration) return style.content;
    return "";
}

export function setPseudoElementContent(elem, which, string){  //// which can be ::before or ::after
    const style = document.createElement('style');

    var uniq = 'id' + (new Date()).getTime();
    elem.classList.add(uniq)

    style.textContent = `
        .${uniq}${which} {
            content: "${string} !important";
        }`;
    document.head.appendChild(style);
}