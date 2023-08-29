"use strict";
import { Buki, bukiList } from './buki-list';
import { bukiStars } from './buki-stars';

// フィルタを適応したブキリスト
export function applyWeaponFilters() {
    bukiStars.weaponsList = bukiList.concat();
    
    bukiStars.weaponsList = filterBukiList('type', 'weaponType', bukiStars.weaponsList);
    bukiStars.weaponsList = filterBukiList('sub', 'weaponSubType', bukiStars.weaponsList);
    bukiStars.weaponsList = filterBukiList('sp', 'weaponSPType', bukiStars.weaponsList);
    bukiStars.weaponsList = filterBukiList('season', 'weaponSeason', bukiStars.weaponsList);
    
    const minorCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--minor') as HTMLInputElement;
    if (!minorCheckbox.checked) {
        bukiStars.weaponsList = bukiStars.weaponsList.filter(buki => buki.ja === buki.original);
        bukiStars.filterOptions.minor = false;
    } else{
        bukiStars.filterOptions.minor = true;
    }
    
    const scopeCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--scope') as HTMLInputElement;
    if (!scopeCheckbox.checked) {
        bukiStars.weaponsList = bukiStars.weaponsList.filter(buki => !buki.ja.includes('スコープ'));
        bukiStars.filterOptions.scope = false;
    } else{
        bukiStars.filterOptions.scope = true;
    }
    
    const heroCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--hero') as HTMLInputElement;
    if (!heroCheckbox.checked) {
        bukiStars.weaponsList = bukiStars.weaponsList.filter(buki => !buki.ja.includes('ヒーロー'));
        bukiStars.filterOptions.hero = false;
    } else{
        bukiStars.filterOptions.hero = true;
    }
}


// ブキリスト生成
function filterBukiList(key: string, checkboxId: string, list: Buki[]): Buki[] {
    const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+checkboxId+'"]'));
    const allChecked = checkboxes.every(checkbox => checkbox.checked);
    
    if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season') return [...list];
    
    if (!allChecked) {
        const selectedTypes = checkboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        const filteredList = list.filter((buki) => selectedTypes.includes(buki[key]));
        bukiStars.filterOptions[key] = checkboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        return filteredList;
    }
    bukiStars.filterOptions[key] = [];
    return [...list];
}
