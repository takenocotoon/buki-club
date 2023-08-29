"use strict";

// イベントリスナー登録
export function attachClickHandler(id:string, f:(event: MouseEvent) => void) {
    const target: HTMLElement = document.getElementById(id) as HTMLElement;
    if (target) target.addEventListener('click', f, false);
}

// ハンバーガー
export function openMenu() {
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

// サブメニューアコーディオン
export function openSubMenu(element:Element) {
    if (element) element.classList.toggle('is_active');
}

// 全部閉じる
export function closeMenu() {
    openMenu();
    const targets = document.getElementsByClassName('is_active');
    while (targets.length > 0) {
        targets[0].classList.remove('is_active');
    }
    
    const submenus = document.getElementsByClassName('js-submenu');
    Array.from(submenus).forEach(target => {
        target.classList.add('is_not_active');
        
        setTimeout(function () {
            if (target.classList.contains('is_not_active')) {
                target.classList.remove('is_not_active');
            }
        }, 1000);
    });
}
