"use strict";

// ハンバーガー
const openMenu = function() {
    const nav = document.getElementsByTagName('nav')[0];
    const hamburger = document.getElementsByClassName('c-hamburger')[0];
    
    if (!nav || !hamburger) return;
    
    if (!nav.classList.toggle('is_active')) {
        nav.classList.add('is_not_active');
    } else {
        nav.classList.remove('is_not_active');
    };
    if (!hamburger.classList.toggle('is_active')) {
        hamburger.classList.add('is_not_active');
    } else {
        hamburger.classList.remove('is_not_active');
    };
};

const openSubMenu = function(element:HTMLElement) {
    element.classList.toggle('is_active');
}
