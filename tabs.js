import { ClassHelper } from './classHelper.js';

const htmlElements = {
  links: document.querySelectorAll('.container .links a'),
  tabs: document.querySelectorAll('.container .tabs > div')
};

function Tabs() { }

Tabs.prototype.init = function (mode) {
  htmlElements.links.forEach(function (link) {
    link.addEventListener('click', linkClicked);
  });
  enableTab(mode);
};

function linkClicked() {
  enableTab(this.dataset.mode);
}

function enableTab(mode) {
  enableLink(mode);
  enableContent(mode);
}

function enableLink(mode) {
  ClassHelper.removeClass('selected', htmlElements.links);
  htmlElements.links.forEach(function (link) {
    if (link.dataset.mode === mode) {
      ClassHelper.addClass('selected', [link]);
    }
  });
}

function enableContent(mode) {
  ClassHelper.addClass('hidden', htmlElements.tabs);
  htmlElements.tabs.forEach(function (tab) {
    if (tab.dataset.mode === mode) {
      ClassHelper.removeClass('hidden', [tab]);
    }
  });
}

export { Tabs };
