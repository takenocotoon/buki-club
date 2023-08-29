"use strict";
import { Buki, bukiList } from './buki-list';
import { bukiStars } from './buki-stars';

// 今日のブキ
export function pickRandomWeaponForToday() {
    const buki = getRandomWeapon();
    const dialogEle:HTMLDialogElement|null = document.getElementById('js-random-weapon--box') as HTMLDialogElement;
    const dialogWeaponTxtJaEle:HTMLElement|null = document.getElementById('js-random-weapon--nameJa') as HTMLElement;
    const dialogWeaponTxtEnEle:HTMLElement|null = document.getElementById('js-random-weapon--nameEn') as HTMLElement;
    const dialogWeaponImgEle:HTMLImageElement|null = document.getElementById('js-random-weapon--img') as HTMLImageElement;
        
    if (!buki || !dialogEle || !dialogWeaponTxtJaEle || !dialogWeaponTxtEnEle || !dialogWeaponImgEle) return null;
    
    dialogWeaponTxtJaEle.innerText = buki.ja;
    dialogWeaponTxtEnEle.innerText = buki.en;
    dialogWeaponImgEle.src = './img/weapons/' + buki.id + '.webp';
    dialogEle.showModal();
}


function getRandomWeapon():Buki {
    if (bukiStars.weaponsList.length === 0) {
        const randomIndex = Math.floor(Math.random() * bukiList.length);
        return bukiList[randomIndex];
    }
    
    const eligibleWeapons = bukiStars.weaponsList.filter((weapon) => {
        const weaponId = weapon.id;
        const markedWeaponValue = bukiStars.markedWeapons[weaponId];
        return (
            !markedWeaponValue ||
            (markedWeaponValue <= bukiStars.settings.mode)
        );
    });
    
    if (eligibleWeapons.length === 0) {
        const randomIndex = Math.floor(Math.random() * bukiStars.weaponsList.length);
        return bukiStars.weaponsList[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * eligibleWeapons.length);
    return eligibleWeapons[randomIndex];
}
