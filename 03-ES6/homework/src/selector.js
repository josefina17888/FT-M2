var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)){
    resultSet.push(startEl)
  }
  for (let i = 0; i < startEl.children.length; i++){
    let elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...elements];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if (selector[0] === '#') return 'id';
  if (selector[0] === '.') return 'class';
  if (selector.includes('.')) return 'tag.class';
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = function(el){
    return `#${el.id}` === selector;
   }
  } else if (selectorType === "class") {
    matchFunction = function(el){
      let clases = el.classList;
      let result = false;
      clases.forEach(e => {if (`.${e}` === selector) result = true;});
      return result;
    }
  } else if (selectorType === "tag.class") {
    
    matchFunction = function(elemento){
      const [tag, clas] = selector.split(".")
      // const tag = elemts[0]
      // const clas = elemts[1]
      const classFn = matchFunctionMaker(`.${clas}`)
      const tagFn = matchFunctionMaker(tag)
      // if(tagFn(elemento)){
      //   if(classFn(elemento)){
      //     return true
      //   }
      // }else{
      //   return false
      // } 
      return tagFn(elemento) && classFn(elemento)
    }
  } else if (selectorType === "tag") {
    matchFunction = function(elemento){
      const elementTag = elemento.tagName;
      if(selector.toUpperCase() === elementTag) return true;
      else return false;
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
