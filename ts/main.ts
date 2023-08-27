"use strict";

import { bukiList, Buki } from './buki.js';
const localStorageKey = 'buki-stars';

class BukiStars {
    localStorageData = getLocalStorageData();
    markedWeapons: { [key: number]: number } = {};
    filterOptions = {
        type: [] as string[],
        sub: [] as string[],
        sp: [] as string[],
        season: [] as string[],
        minor: true,
        scope: true,
        hero: true,
    };
    settings = {
        theme: 'lite',
        mode: 1,
        language: 'ja',
    };
    weaponsList = bukiList.concat();
    
    
    // ブキ選択をリセットする
    resetWeapons = () => {
        
        let result = false;
        if (this.settings.language == 'ja') {
            result = window.confirm('本当にリセットしても良いですか？');
        } else if (this.settings.language == 'en') {
            result = window.confirm('Do you really want to reset?');
        }
        
        if (!result) return;
        
        this.markedWeapons = {};
        this.saveLocalStorageData();
        this.renderWeapons();
    }
    
    
    // ブキ画像リスト描写
    renderWeapons = () => {
        if (this.localStorageData && this.localStorageData.hasOwnProperty('markedWeapons')) {
            this.markedWeapons = this.localStorageData['markedWeapons'];
        }
        hideSubMenu('js-menu--filter');
        hideSubMenu('js-menu--settings');
        
        // 設定適応
        this.applySettings();
        
        // ブキフィルタ
        this.applyWeaponFilters();
        
        // データ保存
        this.saveLocalStorageData();
        
        // const weaponsList = bukiList.concat();
        const boxEle: HTMLElement| null = document.getElementById('p-buki-box');
        if (!boxEle) return;
        boxEle.innerHTML = '';
        const boxTrTemplateEle: HTMLDivElement = document.createElement('div');
        boxTrTemplateEle.className = 'p-tr';
        const boxTdTemplateEle: HTMLDivElement = document.createElement('div');
        boxTdTemplateEle.className = 'p-td';
        const weaponTemplateEle: HTMLDivElement = document.createElement('div');
        const weaponImageTemplateEle: HTMLImageElement = document.createElement('img');
        // const weaponStarTemplateEle: HTMLSpanElement = document.createElement('span');
        
        // 縦横サイズ
        let numCols: number = 1;
        const windowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
            aspectRatio: window.innerWidth / window.innerHeight,
        };
        for (numCols=1; ; numCols++) {
            if (numCols / (this.weaponsList.length / numCols) > windowSize.aspectRatio ) { break };
        }
        let numRows: number = Math.ceil(this.weaponsList.length / numCols);
        
        // 描画
        let index: number = 0;
        for (let row=0; row<numRows; row++) {
            const boxTrEle: HTMLDivElement = boxTrTemplateEle.cloneNode(true) as HTMLDivElement;
            
            for (let col=0; col<numCols; col++) {
                const weaponEle: HTMLDivElement = weaponTemplateEle.cloneNode(true) as HTMLDivElement;
                const weaponImageEle: HTMLImageElement = weaponImageTemplateEle.cloneNode(true) as HTMLImageElement;
                // const weaponStarEle: HTMLSpanElement = weaponStarTemplateEle.cloneNode(true) as HTMLSpanElement;
                
                weaponImageEle.src = './img/weapons/--.webp';
                if (index < this.weaponsList.length) {
                    weaponImageEle.src = './img/weapons/' + this.weaponsList[index]['id'] + '.webp';
                    weaponImageEle.alt = this.weaponsList[index]['ja'];
                    weaponImageEle.title = this.weaponsList[index]['ja'];
                    weaponEle.classList.add('p-td');
                    weaponEle.id = 'js-weapon-' + this.weaponsList[index]['id'];
                    // weaponEle.style.backgroundImage = 'url(./img/weapons/' + weaponsList[index]['id'] + '.webp)';
                    
                    if (this.markedWeapons.hasOwnProperty(this.weaponsList[index]['id']) && Number.isInteger(this.markedWeapons[this.weaponsList[index]['id']]) && this.markedWeapons[this.weaponsList[index]['id']] <= 5) {
                        weaponEle.classList.add('p-done');
                        weaponEle.classList.add('p-done--'+this.markedWeapons[this.weaponsList[index]['id']]);
                        // weaponStarEle.innerText = '★'.repeat(this.markedWeapons[weaponsList[index]['id']]);
                    }
                    
                    const currentIndex = index;
                    weaponEle.addEventListener('click', (event) => this.toggleMark(event, currentIndex, this.weaponsList[currentIndex]['id']));
                }
                    
                    weaponEle.appendChild(weaponImageEle);
                    // weaponEle.appendChild(weaponStarEle);
                    boxTrEle.appendChild(weaponEle);
                
                index++;
            }
            boxEle.appendChild(boxTrEle);
            
        }
        
        const weaponCountEle: HTMLDivElement = document.createElement('div');
        weaponCountEle.id = 'p-weapon-count-box';
        boxEle.appendChild(weaponCountEle);
        // ブキ数更新
        this.renderWeaponsCount();
    }
    
    // ブキ数表示
    renderWeaponsCount() {
        const weaponCountEle: HTMLDivElement = document.getElementById('p-weapon-count-box') as HTMLDivElement;
        const count = Object.keys(this.markedWeapons).filter(key => {
            const id = parseInt(key);
            return this.weaponsList.some(item => item.id === id) && this.markedWeapons[id] > this.settings.mode;
        }).length;
        weaponCountEle.innerText = count + '/' + Object.keys(this.weaponsList).length;
    }
    
    // ブキリスト生成
    filterBukiList(key: string, checkboxId: string, list: Buki[]): Buki[] {
        const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+checkboxId+'"]'));
        const allChecked = checkboxes.every(checkbox => checkbox.checked);
        
        if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season') return [...list];
        
        if (!allChecked) {
            const selectedTypes = checkboxes
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            const filteredList = list.filter((buki) => selectedTypes.includes(buki[key]));
            this.filterOptions[key] = checkboxes
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            return filteredList;
        }
        this.filterOptions[key] = [];
        return [...list];
    }
    
    
    // ブキチェック切り替え
    toggleMark = (event:Event, index:number, id:number) =>  {
        const myWeaponEle: HTMLElement| null = document.getElementById('js-weapon-'+id);
        if (!myWeaponEle) return;
        const imgEle = myWeaponEle.querySelector('img');
        if (!imgEle) return;
        
        if (this.markedWeapons.hasOwnProperty(id) && Number.isInteger(this.markedWeapons[id])) {
            if (this.markedWeapons[id] >= 5) {
                if (myWeaponEle.classList.contains('p-done')) myWeaponEle.classList.remove('p-done');
                if (myWeaponEle.classList.contains('p-done--5')) myWeaponEle.classList.remove('p-done--5');
                delete this.markedWeapons[id];
            } else {
                const myWeaponClasses = Array.from(myWeaponEle.classList);
                for (const className of myWeaponClasses) {
                    const match = className.match(/p-done--(\d+)/);
                    if (match) {
                        myWeaponEle.classList.remove(className);
                    }
                }
                this.markedWeapons[id]++;
                myWeaponEle.classList.add('p-done--'+this.markedWeapons[id]);
            }
        } else {
            this.markedWeapons[id] = 1;
            myWeaponEle.classList.add('p-done');
            myWeaponEle.classList.add('p-done--1');
        }
        if (!myWeaponEle.classList.contains('is-done')) myWeaponEle.classList.add('is-done');
        
        // データ保存
        this.saveLocalStorageData();
        
        this.renderWeaponsCount();
    }
    
    
    // フィルタを適応したブキリスト
    applyWeaponFilters() {
        this.weaponsList = bukiList.concat();
        
        this.weaponsList = this.filterBukiList('type', 'weaponType', this.weaponsList);
        this.weaponsList = this.filterBukiList('sub', 'weaponSubType', this.weaponsList);
        this.weaponsList = this.filterBukiList('sp', 'weaponSPType', this.weaponsList);
        this.weaponsList = this.filterBukiList('season', 'weaponSeason', this.weaponsList);
        
        const minorCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--minor') as HTMLInputElement;
        if (!minorCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => buki.ja === buki.original);
            this.filterOptions.minor = false;
        } else{
            this.filterOptions.minor = true;
        }
        
        const scopeCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--scope') as HTMLInputElement;
        if (!scopeCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => !buki.ja.includes('スコープ'));
            this.filterOptions.scope = false;
        } else{
            this.filterOptions.scope = true;
        }
        
        const heroCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--hero') as HTMLInputElement;
        if (!heroCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => !buki.ja.includes('ヒーロー'));
            this.filterOptions.hero = false;
        } else{
            this.filterOptions.hero = true;
        }
    }
    
    
    // 設定適応
    applySettings() {
        const bodyEle:HTMLElement = document.getElementsByTagName('body')[0];
        // カラーテーマ
        const settingsThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsTheme"]');
        settingsThemeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                this.settings.theme = selectedValue;
                bodyEle.className = 'theme-'+selectedValue;
            }
        });
        
        // モード
        const modeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsMode"]');
        modeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue = parseInt(radio.value, 10); // 10進数として解釈
                if (!isNaN(selectedValue)) {
                    this.settings.mode = selectedValue;
                    const boxEle: HTMLElement| null = document.getElementById('p-buki-box');
                    if (boxEle) {
                        boxEle.className = '';
                        for (let index=0; index<selectedValue; index++) {
                            boxEle.classList.add('mode-star'+(index+1));
                        }
                    }
                }
            }
        });
        
        // 言語
        const languageRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsLanguage"]');
        languageRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                this.settings.language = selectedValue;
                bodyEle.lang = selectedValue;
            }
        });
        
    }
    
    // 画像生成ボタンを待機させる
    waitingCaptureImage() {
        const beforeText:HTMLElement|null = document.getElementById('js-download-btn--before');
        const processingText:HTMLElement|null = document.getElementById('js-download-btn--processing');
        if (!beforeText || !processingText) return;
        
        beforeText.style.display = 'none';
        processingText.style.display = 'inline';
        // buttonEle.setAttribute("disabled", true);
        
        setTimeout(function () {
            beforeText.style.display = 'inline';
            processingText.style.display = 'none';
        }, 5000);
    }
    
    // ローカルストレージに保存
    saveLocalStorageData() {
        this.localStorageData['markedWeapons'] = this.markedWeapons;
        this.localStorageData['filterOptions'] = this.filterOptions;
        this.localStorageData['settings'] = this.settings;
        localStorage.setItem(localStorageKey, JSON.stringify(this.localStorageData));
    }
    
    // フィルターフォーム復元
    restoreFormData() {
        // filterOptions = {
        //     type: [] as string[],
        //     sub: [] as string[],
        //     sp: [] as string[],
        //     season: [] as string[],
        //     minor: true,
        //     scope: true,
        // };
        if (this.localStorageData && this.localStorageData.hasOwnProperty('filterOptions')) {
            this.filterOptions = this.localStorageData['filterOptions'];
        }
        
        this.restoreALLFormData('type', 'weaponType');
        this.restoreALLFormData('sub', 'weaponSubType');
        this.restoreALLFormData('sp', 'weaponSPType');
        this.restoreALLFormData('season', 'weaponSeason');
        
        if (!this.filterOptions.minor) {
            const minorCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--minor') as HTMLInputElement;
            minorCheckbox.checked = false;
        }
        if (!this.filterOptions.scope) {
            const scopeCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--scope') as HTMLInputElement;
            scopeCheckbox.checked = false;
        }
        if (!this.filterOptions.hero) {
            const heroCheckbox: HTMLInputElement = document.getElementById('js-weaponOption--hero') as HTMLInputElement;
            heroCheckbox.checked = false;
        }
        
        if (this.localStorageData && this.localStorageData.hasOwnProperty('settings')) {
            this.settings = this.localStorageData['settings'];
        }
        this.restoreRadioFormData('theme', 'settingsTheme');
        this.restoreRadioFormData('mode', 'settingsMode');
        this.restoreRadioFormData('language', 'settingsLanguage');
    }
    restoreALLFormData(key: string, checkboxId: string) {
        const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+checkboxId+'"]'));
        
        if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season') return;
        if (this.filterOptions[key].length<1) return;
        
        const checkBoxALL:HTMLInputElement = document.getElementById('js-'+checkboxId+'--all') as HTMLInputElement;
        if (!checkBoxALL) return;
        checkBoxALL.checked = false;
        
        for (let index=0; index<checkboxes.length; index++) {
            if (!this.filterOptions[key].includes(checkboxes[index].value)) {
                checkboxes[index].checked = false;
            }
        }
    }
    restoreRadioFormData(key: string, radioId: string) {
        const radios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+radioId+'"]'));
        if (key !== 'theme' && key !== 'mode' && key !== 'language') return;
        for (let index=0; index<radios.length; index++) {
            if (this.settings[key] == radios[index].value) {
                radios[index].checked = true;
            }
        }
    }
    
    // 今日のブキ
    pickRandomWeaponForToday = () => {
        const buki = this.getRandomWeapon();
        const dialogEle:HTMLDialogElement|null = document.getElementById('js-random-weapon--box') as HTMLDialogElement;
        const dialogWeaponTxtJaEle:HTMLElement|null = document.getElementById('js-random-weapon--nameJa') as HTMLElement;
        const dialogWeaponTxtEnEle:HTMLElement|null = document.getElementById('js-random-weapon--nameEn') as HTMLElement;
        const dialogWeaponImgEle:HTMLImageElement|null = document.getElementById('js-random-weapon--img') as HTMLImageElement;
            
        if (!buki || !dialogEle || !dialogWeaponTxtJaEle || !dialogWeaponTxtEnEle || !dialogWeaponImgEle) return;
        
        dialogWeaponTxtJaEle.innerText = buki.ja;
        dialogWeaponTxtEnEle.innerText = buki.en;
        dialogWeaponImgEle.src = './img/weapons/' + buki.id + '.webp';
        dialogEle.showModal();
            // if (this.settings.language == 'ja') alert('今日は'+buki.ja+'を使ってみませんか？');
            // if (this.settings.language == 'en') alert('Would you like to try using ' + buki.en + ' today?');
    }
    getRandomWeapon = () : Buki | null =>  {
        if (this.weaponsList.length === 0) {
            const randomIndex = Math.floor(Math.random() * bukiList.length);
            return bukiList[randomIndex];
        }
        
        const eligibleWeapons = this.weaponsList.filter((weapon) => {
            const weaponId = weapon.id;
            const markedWeaponValue = this.markedWeapons[weaponId];
            return (
                !markedWeaponValue ||
                (markedWeaponValue <= this.settings.mode)
            );
        });
        
        if (eligibleWeapons.length === 0) {
            const randomIndex = Math.floor(Math.random() * this.weaponsList.length);
            return this.weaponsList[randomIndex];
        }
        
        const randomIndex = Math.floor(Math.random() * eligibleWeapons.length);
        return eligibleWeapons[randomIndex];
    }

}

// localStorageからJSONデータを取得する
function getLocalStorageData(): any | null {
    const jsonData = localStorage.getItem(localStorageKey);
    if (jsonData) {
        try {
            const parsedData = JSON.parse(jsonData);
            return parsedData;
        } catch (error) {
        console.error('Error parsing JSON data:', error);
        return {};
        }
    }
    return {};
}


// イベントリスナー登録
function attachClickHandler(id:string, f:(event: MouseEvent) => void) {
    const target: HTMLElement = document.getElementById(id) as HTMLElement;
    if (target) target.addEventListener('click', f, false);
}


// フィルター用チェックボックス関数
function attachAllCheckboxEvents(name:string) {
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


// チェックボックスの値リストを取得
function getCheckedValues(checkboxes: HTMLInputElement[]): string[] {
    return checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}


// subメニューを一瞬たたむ
function hideSubMenu(id:string) {
    const target:HTMLElement = document.getElementById(id) as HTMLElement;
    if (!target) return;
    if (target.classList.contains('is_active')) target.classList.remove('is_active');
    target.classList.add('is_not_active');
    setTimeout(function () {
        if (target.classList.contains('is_not_active')) target.classList.remove('is_not_active');
    }, 1000);
}

const bukiStars = new BukiStars;
// 実行
window.onload = function() {
    bukiStars.restoreFormData();
    bukiStars.renderWeapons();
    attachClickHandler('js-download-btn', bukiStars.waitingCaptureImage);
    attachClickHandler('js-clear-btn', bukiStars.resetWeapons);
    attachClickHandler('js-clear-btn', () => hideSubMenu('js-menu--filter'));
    attachClickHandler('js-set-filer-btn-t', bukiStars.renderWeapons);
    attachClickHandler('js-set-filer-btn-b', bukiStars.renderWeapons);
    attachClickHandler('js-set-setting-btn-t', bukiStars.renderWeapons);
    attachClickHandler('js-set-setting-btn-b', bukiStars.renderWeapons);
    attachClickHandler('js-random-btn', bukiStars.pickRandomWeaponForToday);
    attachClickHandler('js-random-btn2', bukiStars.pickRandomWeaponForToday);
    attachAllCheckboxEvents('weaponType');
    attachAllCheckboxEvents('weaponSubType');
    attachAllCheckboxEvents('weaponSPType');
    attachAllCheckboxEvents('weaponSeason');
};
