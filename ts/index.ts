import { bukiForms } from './module/buki-forms';
import { bukiBox } from './module/buki-box';
import { attachClickHandler, openMenu, openSubMenu } from './module/common';
import { captureImage } from './module/images';
import { pickRandomWeaponForToday } from './module/buki-random';

function main() {
    bukiForms.restoreFormData();
    bukiBox.renderWeapons();
    
    attachClickHandler('js-hamburger', openMenu);
    // attachClickHandler('js-hamburger', openMenu);
    
    attachClickHandler('js-download-btn', captureImage);
    attachClickHandler('js-clear-btn', bukiBox.resetWeapons);
    
    // attachClickHandler('js-clear-btn', () => hideSubMenu('js-menu--filter'));
    const subMenus = document.getElementsByClassName('js-submenu');
    Array.from(subMenus).forEach(target => {
        attachClickHandler(target.id, () => openSubMenu(target));
    });
    const setButtons = document.getElementsByClassName('js-set');
    Array.from(setButtons).forEach(target => {
        attachClickHandler(target.id, bukiForms.save);
    });
    
    attachClickHandler('js-random-btn', pickRandomWeaponForToday);
    // attachClickHandler('js-random-btn2', pickRandomWeaponForToday);
    bukiForms.attachAllCheckboxEvents('weaponType');
    bukiForms.attachAllCheckboxEvents('weaponSubType');
    bukiForms.attachAllCheckboxEvents('weaponSPType');
    bukiForms.attachAllCheckboxEvents('weaponSeason');
}

window.onload = main;
