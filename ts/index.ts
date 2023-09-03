import { bukiForms } from './module/buki-forms';
import { bukiBox } from './module/buki-box';
import { attachClickHandler, openMenu, openSubMenu } from './module/common';
import { captureImage } from './module/images';
import { pickRandomWeaponForToday } from './module/buki-random';

function main() {
    bukiForms.restoreFormData();
    bukiBox.renderWeapons();
    
    attachClickHandler('js-hamburger', openMenu);
    
    attachClickHandler('js-download-btn', captureImage);
    attachClickHandler('js-clear-btn', bukiBox.resetWeapons);
    
    const subMenus = document.getElementsByClassName('js-submenu');
    Array.from(subMenus).forEach(target => {
        attachClickHandler(target.id, () => openSubMenu(target));
    });
    const setButtons = document.getElementsByClassName('js-set');
    Array.from(setButtons).forEach(target => {
        attachClickHandler(target.id, bukiForms.save);
    });
    
    attachClickHandler('js-random-btn', pickRandomWeaponForToday);
    bukiForms.attachAllCheckboxEvents('weaponType');
    bukiForms.attachAllCheckboxEvents('weaponSubType');
    bukiForms.attachAllCheckboxEvents('weaponSPType');
    bukiForms.attachAllCheckboxEvents('weaponSeason');
    
    attachClickHandler('js-saveDataSlot-btn', bukiForms.saveToSlot);
    attachClickHandler('js-loadDataSlot-btn', bukiForms.loadFromSlot);
    attachClickHandler('js-saveJson-btn', bukiForms.export);
    attachClickHandler('js-loadJson-btn', bukiForms.import);
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js').then(function(registration) {
            console.log('ServiceWorker の登録に成功しました。スコープ: ', registration.scope);
        }).catch(function(error) {
            console.log('ServiceWorker の登録に失敗しました。', error);
        });
    }
}

window.onload = main;
