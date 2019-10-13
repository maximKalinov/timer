function addClass(className, elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add(className);
  }
}

function removeClass(className, elements) {
  elements.forEach(function (element) {
    element.classList.remove(className);
  });
}

function ClassHelper() { }
ClassHelper.addClass = addClass;
ClassHelper.removeClass = removeClass;

export { ClassHelper };
