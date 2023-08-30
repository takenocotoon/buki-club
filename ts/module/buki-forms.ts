"use strict";
import { bukiStars } from './buki-stars';
import { bukiBox } from './buki-box';
import { closeMenu } from './common';
import { localStorageData, getLocalStorageData, saveLocalStorageData, localStorageKey } from './local-storage';
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
    
    
    saveToSlot = () => {
        for (let index = 1; index <= 3; index++) {
            const slotRadioEle:HTMLInputElement|null = document.getElementById('js-saveDataSlot--'+index) as HTMLInputElement
            if (!slotRadioEle || slotRadioEle.checked == false) continue;
            let result = false;
            if (bukiStars.settings.language == 'ja') {
                result = window.confirm(`スロット${index}にデータを上書き保存します。`);
            } else if (bukiStars.settings.language == 'en') {
                result = window.confirm(`Data will be overwritten and saved in Slot ${index}.`);
            }
            if (!result) return;
            saveLocalStorageData(localStorageKey + '-' + index);
            break;
        }
    }
    
    
    loadFromSlot = () => {
        for (let index = 1; index <= 3; index++) {
            const slotRadioEle:HTMLInputElement|null = document.getElementById('js-saveDataSlot--'+index) as HTMLInputElement
            if (!slotRadioEle || slotRadioEle.checked == false) continue;
            let result = false;
            if (bukiStars.settings.language == 'ja') {
                result = window.confirm(`スロット${index}からデータを復元します。現在のデータは失われます。`);
            } else if (bukiStars.settings.language == 'en') {
                result = window.confirm(`Do you want to restore data from Slot ${index}? Current data will be lost.`);
            }
            if (!result) return;
            const newLocalStorageData = getLocalStorageData(localStorageKey + '-' + index);
            if (newLocalStorageData.hasOwnProperty('markedWeapons')) {
                bukiStars.markedWeapons = { ...newLocalStorageData['markedWeapons'] };
            }
            if (newLocalStorageData.hasOwnProperty('filterOptions')) {
                bukiStars.filterOptions = { ...newLocalStorageData['filterOptions'] };
            }
            if (newLocalStorageData.hasOwnProperty('settings')) {
                bukiStars.settings = { ...newLocalStorageData['settings'] };
            }
            this.restoreFormData();
            this.save();
            break;
        }
    }
    
    
    export = () => {
        const jsonData = JSON.stringify(getLocalStorageData(), null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        const formattedDate = now.toLocaleDateString(undefined, options).replace(/[/:,\s]/g, '');
        const filename = `buki-club_${formattedDate}.json`;
        
        const downloadLink = document.createElement('a');
        
        downloadLink.href = url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
    
    import = () => {
        const loadJsonInput:HTMLInputElement|null = document.getElementById('js-loadJson-input') as HTMLInputElement;
        if (!loadJsonInput) return;
        
        loadJsonInput.addEventListener('change', (event) => {
            if (!event.target) return;
            const selectFileEle = event.target as HTMLInputElement;
            const selectedFile = selectFileEle.files![0];
            if (selectedFile) {
                // ファイルを読み込む
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    const target = event.target as FileReader;
                    if (!target) return;
                    const fileContent = target.result;
                    try {
                        const newLocalStorageData = JSON.parse(fileContent as string);
                        if (newLocalStorageData.hasOwnProperty('markedWeapons')) {
                            bukiStars.markedWeapons = { ...newLocalStorageData['markedWeapons'] };
                        }
                        if (newLocalStorageData.hasOwnProperty('filterOptions')) {
                            bukiStars.filterOptions = { ...newLocalStorageData['filterOptions'] };
                        }
                        if (newLocalStorageData.hasOwnProperty('settings')) {
                            bukiStars.settings = { ...newLocalStorageData['settings'] };
                        }
                        this.restoreFormData();
                        this.save();
                        selectFileEle.value = '';
                    } catch (error) {
                        console.error('Error while parsing JSON file:', error);
                    }
                };
                fileReader.readAsText(selectedFile);
            }
        });
        loadJsonInput.click();
    }
    
    
    isLocalStorageData(data: any) {
        // ここで型のチェックを行う
        return (
            typeof data === 'object' &&
            typeof data.markedWeapons === 'object' &&
            Array.isArray(data.filterOptions.type) &&
            Array.isArray(data.filterOptions.sub) &&
            Array.isArray(data.filterOptions.sp) &&
            Array.isArray(data.filterOptions.season) &&
            typeof data.filterOptions.minor === 'boolean' &&
            typeof data.filterOptions.scope === 'boolean' &&
            typeof data.filterOptions.hero === 'boolean' &&
            typeof data.settings === 'object' &&
            typeof data.settings.theme === 'string' &&
            typeof data.settings.mode === 'number' &&
            typeof data.settings.language === 'string'
        );
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
        }
        
        const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+checkboxId+'"]'));
        const checkBoxALL:HTMLInputElement = document.getElementById('js-'+checkboxId+'--all') as HTMLInputElement;
        if (!checkBoxALL) return;
        
        if (bukiStars.filterOptions[key].length<1){
            for (let index=0; index<checkboxes.length; index++) {
                checkboxes[index].checked = true;
            }
            return;
        }
        
        checkBoxALL.checked = false;
        
        for (let index=0; index<checkboxes.length; index++) {
            if (!bukiStars.filterOptions[key].includes(checkboxes[index].value)) {
                checkboxes[index].checked = false;
            } else {
                checkboxes[index].checked = true;
            }
        }
    }
    
    
    // チェックボックス
    private restoreCheckbox = (key: string) => {
        if (key !== 'minor' && key !== 'scope' && key !== 'hero') return;
        const checkbox: HTMLInputElement = document.getElementById('js-weaponOption--'+key) as HTMLInputElement;
        if (!bukiStars.filterOptions[key]) {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
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
