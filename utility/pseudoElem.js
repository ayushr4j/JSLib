
const decodeCSSContent = s => s.replace(/^(['"])(.*)\1$/, "$2").replace(/\\([0-9a-fA-F]{1,6}\s?|.)/g, (_, esc) =>
  esc.match(/^[0-9a-fA-F]/) ? String.fromCodePoint(parseInt(esc.trim(), 16)) :
  {n:'\n', r:'\r', t:'\t', b:'\b', f:'\f', '"':'"', "'":"'", "\\":"\\"}[esc] ?? esc
);

export function getPseudoElementStyle(elem, which){    // which can be ::before or ::after
    const pseudoStyle = window.getComputedStyle(elem, which);
    return pseudoStyle;
}
export function getPseudoElementContent(elem, which){
    style = getPseudoElementStyle(elem,which);
    if(style instanceof CSSStyleDeclaration && style.content != 'none') return decodeCSSContent(style.content);
    return "";
}

export function setPseudoElementContent(elem, which, string){  //// which can be ::before or ::after
    const style = document.createElement('style');

    var uniq = 'id' + (new Date()).getTime();
    elem.classList.add(uniq)

    style.textContent = `
        .${uniq}${which} {
            content: ${string} !important;
        }`;
    document.head.appendChild(style);

    return uniq;
}