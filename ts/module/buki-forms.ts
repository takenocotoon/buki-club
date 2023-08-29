"use strict";
import { bukiStars } from './buki-stars';
import { bukiBox } from './buki-box';
import { closeMenu } from './common';
import { localStorageData } from './local-storage';
import { applySettings } from './apply-settings';
import { applyWeaponFilters } from './apply-filters';

class BukiForms {
    
    constructor() {
        if (localStorageData.hasOwnProperty('filterOptions')) {
            if (localStorageData.filterOptions.hasOwnProperty('type')) bukiStars.filterOptions.type = [...localStorageData.filterOptions.type];
            if (localStorageData.filterOptions.hasOwnProperty('sub')) bukiStars.filterOptions.sub = [...localStorageData.filterOptions.sub];
            if (localStorageData.filterOptions.hasOwnProperty('sp')) bukiStars.filterOptions.sp =[...localStorageData.filterOptions.sp];
            if (localStorageData.filterOptions.hasOwnProperty('season')) bukiStars.filterOptions.season = [...localStorageData.filterOptions.season];
            if (localStorageData.filterOptions.hasOwnProperty('minor')) bukiStars.filterOptions.minor = localStorageData.filterOptions.minor;
            if (localStorageData.filterOptions.hasOwnProperty('scope')) bukiStars.filterOptions.scope = localStorageData.filterOptions.scope;
            if (localStorageData.filterOptions.hasOwnProperty('hero')) bukiStars.filterOptions.hero = localStorageData.filterOptions.hero;
        }
        if (localStorageData.hasOwnProperty('settings')) {
            if (localStorageData.settings.hasOwnProperty('theme')) bukiStars.settings.theme = localStorageData.settings.theme;
            if (localStorageData.settings.hasOwnProperty('mode')) bukiStars.settings.mode = localStorageData.settings.mode;
            if (localStorageData.settings.hasOwnProperty('language')) bukiStars.settings.language = localStorageData.settings.language;
        }
    }
    
    // 設定保存
    save = () => {
        applySettings();
        applyWeaponFilters();
        bukiBox.updateLocalStorageData();
        bukiBox.renderWeapons();
        closeMenu();
    }
    
    
    // フォーム復元
    restoreFormData = () => {
        this.restoreFilterFormData();
        this.restoreSettingsFormData();
    }
    
    
    // フィルタ復元
    private restoreFilterFormData = () => {
        this.restoreALLCheckbox('type', 'weaponType');
        this.restoreALLCheckbox('sub', 'weaponSubType');
        this.restoreALLCheckbox('sp', 'weaponSPType');
        this.restoreALLCheckbox('season', 'weaponSeason');
        this.restoreCheckbox('minor');
        this.restoreCheckbox('scope');
        this.restoreCheckbox('hero');
        applyWeaponFilters();
    }
    
    
    // チェックボックスall
    private restoreALLCheckbox = (key: string, checkboxId: string) => {
        if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season') return;
        if (!Array.isArray(bukiStars.filterOptions[key])) {
            bukiStars.filterOptions[key] = [] as string[];
            return;
        }
        if (bukiStars.filterOptions[key].length<1) return;
        
        const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+checkboxId+'"]'));
        
        const checkBoxALL:HTMLInputElement = document.getElementById('js-'+checkboxId+'--all') as HTMLInputElement;
        if (!checkBoxALL) return;
        checkBoxALL.checked = false;
        
        for (let index=0; index<checkboxes.length; index++) {
            if (!bukiStars.filterOptions[key].includes(checkboxes[index].value)) {
                checkboxes[index].checked = false;
            }
        }
    }
    
    
    // チェックボックス
    private restoreCheckbox = (key: string) => {
        if (key !== 'minor' && key !== 'scope' && key !== 'hero') return;
        if (!bukiStars.filterOptions[key]) {
            const checkbox: HTMLInputElement = document.getElementById('js-weaponOption--'+key) as HTMLInputElement;
            checkbox.checked = false;
        }
    }
    
    
    // 設定復元
    private restoreSettingsFormData = () => {
        if (!localStorageData.hasOwnProperty('settings')) return;
        
        this.restoreRadio('theme', 'settingsTheme');
        this.restoreRadio('mode', 'settingsMode');
        this.restoreRadio('language', 'settingsLanguage');
        applySettings();
    }
    
    // ラジオボタン
    private restoreRadio = (key: string, radioId: string) => {
        if (key !== 'theme' && key !== 'mode' && key !== 'language') return;
        
        const radios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+radioId+'"]'));
        for (let index=0; index<radios.length; index++) {
            if (bukiStars.settings[key] == radios[index].value) {
                radios[index].checked = true;
            }
        }
    }
    
    // フィルター用チェックボックス関数
    attachAllCheckboxEvents(name:string) {
        const target = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+name+'"]'));
        target.forEach(checkbox => {
            checkbox.addEventListener('click', (event) => {
                const targetCheckbox = event.target as HTMLInputElement;
                if (targetCheckbox.id == 'js-'+targetCheckbox.name+'--all') {
                    target.forEach(checkbox => {
                        checkbox.checked = targetCheckbox.checked;
                    });
                } else {
                    const allCheckbox:HTMLInputElement = document.getElementById('js-'+targetCheckbox.name+'--all') as HTMLInputElement;
                    if (allCheckbox && allCheckbox.checked) {
                        target.forEach(checkbox => {
                            checkbox.checked = false;
                        });
                        targetCheckbox.checked = true;
                    }
                }
            });
        });
    }
}

export const bukiForms = new BukiForms();
