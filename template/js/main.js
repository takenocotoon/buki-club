"use strict";
import { bukiList } from './buki.js';
const localStorageKey = 'buki-stars';
class BukiStars {
    constructor() {
        this.localStorageData = getLocalStorageData();
        this.markedWeapons = {};
        this.filterOptions = {
            type: [],
            sub: [],
            sp: [],
            season: [],
            minor: true,
            scope: true,
            hero: true,
        };
        this.settings = {
            theme: 'lite',
            mode: 1,
            language: 'ja',
        };
        this.weaponsList = bukiList.concat();
        // ブキ選択をリセットする
        this.resetWeapons = () => {
            this.markedWeapons = {};
            this.saveLocalStorageData();
            this.renderWeapons();
        };
        // ブキ画像リスト描写
        this.renderWeapons = () => {
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
            const boxEle = document.getElementById('p-buki-box');
            if (!boxEle)
                return;
            boxEle.innerHTML = '';
            const boxTrTemplateEle = document.createElement('div');
            boxTrTemplateEle.className = 'p-tr';
            const boxTdTemplateEle = document.createElement('div');
            boxTdTemplateEle.className = 'p-td';
            const weaponTemplateEle = document.createElement('div');
            const weaponImageTemplateEle = document.createElement('img');
            // const weaponStarTemplateEle: HTMLSpanElement = document.createElement('span');
            // 縦横サイズ
            let numCols = 1;
            const windowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
                aspectRatio: window.innerWidth / window.innerHeight,
            };
            for (numCols = 1;; numCols++) {
                if (numCols / (this.weaponsList.length / numCols) > windowSize.aspectRatio) {
                    break;
                }
                ;
            }
            let numRows = Math.ceil(this.weaponsList.length / numCols);
            // 描画
            let index = 0;
            for (let row = 0; row < numRows; row++) {
                const boxTrEle = boxTrTemplateEle.cloneNode(true);
                for (let col = 0; col < numCols; col++) {
                    const weaponEle = weaponTemplateEle.cloneNode(true);
                    const weaponImageEle = weaponImageTemplateEle.cloneNode(true);
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
                            weaponEle.classList.add('p-done--' + this.markedWeapons[this.weaponsList[index]['id']]);
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
            const weaponCountEle = document.createElement('div');
            weaponCountEle.id = 'p-weapon-count-box';
            boxEle.appendChild(weaponCountEle);
            // ブキ数更新
            this.renderWeaponsCount();
        };
        // ブキチェック切り替え
        this.toggleMark = (event, index, id) => {
            const myWeaponEle = document.getElementById('js-weapon-' + id);
            if (!myWeaponEle)
                return;
            const imgEle = myWeaponEle.querySelector('img');
            if (!imgEle)
                return;
            if (this.markedWeapons.hasOwnProperty(id) && Number.isInteger(this.markedWeapons[id])) {
                if (this.markedWeapons[id] >= 5) {
                    if (myWeaponEle.classList.contains('p-done'))
                        myWeaponEle.classList.remove('p-done');
                    if (myWeaponEle.classList.contains('p-done--5'))
                        myWeaponEle.classList.remove('p-done--5');
                    delete this.markedWeapons[id];
                }
                else {
                    const myWeaponClasses = Array.from(myWeaponEle.classList);
                    for (const className of myWeaponClasses) {
                        const match = className.match(/p-done--(\d+)/);
                        if (match) {
                            myWeaponEle.classList.remove(className);
                        }
                    }
                    this.markedWeapons[id]++;
                    myWeaponEle.classList.add('p-done--' + this.markedWeapons[id]);
                }
            }
            else {
                this.markedWeapons[id] = 1;
                myWeaponEle.classList.add('p-done');
                myWeaponEle.classList.add('p-done--1');
            }
            if (!myWeaponEle.classList.contains('is-done'))
                myWeaponEle.classList.add('is-done');
            // データ保存
            this.saveLocalStorageData();
            this.renderWeaponsCount();
        };
        // 今日のブキ
        this.pickRandomWeaponForToday = () => {
            const buki = this.getRandomWeapon();
            const dialogEle = document.getElementById('js-random-weapon--box');
            const dialogWeaponTxtJaEle = document.getElementById('js-random-weapon--nameJa');
            const dialogWeaponTxtEnEle = document.getElementById('js-random-weapon--nameEn');
            const dialogWeaponImgEle = document.getElementById('js-random-weapon--img');
            if (!buki || !dialogEle || !dialogWeaponTxtJaEle || !dialogWeaponTxtEnEle || !dialogWeaponImgEle)
                return;
            dialogWeaponTxtJaEle.innerText = buki.ja;
            dialogWeaponTxtEnEle.innerText = buki.en;
            dialogWeaponImgEle.src = './img/weapons/' + buki.id + '.webp';
            dialogEle.showModal();
            // if (this.settings.language == 'ja') alert('今日は'+buki.ja+'を使ってみませんか？');
            // if (this.settings.language == 'en') alert('Would you like to try using ' + buki.en + ' today?');
        };
        this.getRandomWeapon = () => {
            if (this.weaponsList.length === 0) {
                const randomIndex = Math.floor(Math.random() * bukiList.length);
                return bukiList[randomIndex];
            }
            const eligibleWeapons = this.weaponsList.filter((weapon) => {
                const weaponId = weapon.id;
                const markedWeaponValue = this.markedWeapons[weaponId];
                return (!markedWeaponValue ||
                    (markedWeaponValue <= this.settings.mode));
            });
            if (eligibleWeapons.length === 0) {
                const randomIndex = Math.floor(Math.random() * this.weaponsList.length);
                return this.weaponsList[randomIndex];
            }
            const randomIndex = Math.floor(Math.random() * eligibleWeapons.length);
            return eligibleWeapons[randomIndex];
        };
    }
    // ブキ数表示
    renderWeaponsCount() {
        const weaponCountEle = document.getElementById('p-weapon-count-box');
        const count = Object.keys(this.markedWeapons).filter(key => {
            const id = parseInt(key);
            return this.weaponsList.some(item => item.id === id) && this.markedWeapons[id] > this.settings.mode;
        }).length;
        weaponCountEle.innerText = count + '/' + Object.keys(this.weaponsList).length;
    }
    // ブキリスト生成
    filterBukiList(key, checkboxId, list) {
        const checkboxes = Array.from(document.querySelectorAll('input[name="' + checkboxId + '"]'));
        const allChecked = checkboxes.every(checkbox => checkbox.checked);
        if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season')
            return [...list];
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
    // フィルタを適応したブキリスト
    applyWeaponFilters() {
        this.weaponsList = bukiList.concat();
        this.weaponsList = this.filterBukiList('type', 'weaponType', this.weaponsList);
        this.weaponsList = this.filterBukiList('sub', 'weaponSubType', this.weaponsList);
        this.weaponsList = this.filterBukiList('sp', 'weaponSPType', this.weaponsList);
        this.weaponsList = this.filterBukiList('season', 'weaponSeason', this.weaponsList);
        const minorCheckbox = document.getElementById('js-weaponOption--minor');
        if (!minorCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => buki.ja === buki.original);
            this.filterOptions.minor = false;
        }
        else {
            this.filterOptions.minor = true;
        }
        const scopeCheckbox = document.getElementById('js-weaponOption--scope');
        if (!scopeCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => !buki.ja.includes('スコープ'));
            this.filterOptions.scope = false;
        }
        else {
            this.filterOptions.scope = true;
        }
        const heroCheckbox = document.getElementById('js-weaponOption--hero');
        if (!heroCheckbox.checked) {
            this.weaponsList = this.weaponsList.filter(buki => !buki.ja.includes('ヒーロー'));
            this.filterOptions.hero = false;
        }
        else {
            this.filterOptions.hero = true;
        }
    }
    // 設定適応
    applySettings() {
        const bodyEle = document.getElementsByTagName('body')[0];
        // カラーテーマ
        const settingsThemeRadios = document.querySelectorAll('input[name="settingsTheme"]');
        settingsThemeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue = radio.value;
                this.settings.theme = selectedValue;
                bodyEle.className = 'theme-' + selectedValue;
            }
        });
        // モード
        const modeRadios = document.querySelectorAll('input[name="settingsMode"]');
        modeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue = parseInt(radio.value, 10); // 10進数として解釈
                if (!isNaN(selectedValue)) {
                    this.settings.mode = selectedValue;
                    const boxEle = document.getElementById('p-buki-box');
                    if (boxEle) {
                        boxEle.className = '';
                        for (let index = 0; index < selectedValue; index++) {
                            boxEle.classList.add('mode-star' + (index + 1));
                        }
                    }
                }
            }
        });
        // 言語
        const languageRadios = document.querySelectorAll('input[name="settingsLanguage"]');
        languageRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue = radio.value;
                this.settings.language = selectedValue;
                bodyEle.lang = selectedValue;
            }
        });
    }
    // 画像生成ボタンを待機させる
    waitingCaptureImage() {
        const beforeText = document.getElementById('js-download-btn--before');
        const processingText = document.getElementById('js-download-btn--processing');
        if (!beforeText || !processingText)
            return;
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
            const minorCheckbox = document.getElementById('js-weaponOption--minor');
            minorCheckbox.checked = false;
        }
        if (!this.filterOptions.scope) {
            const scopeCheckbox = document.getElementById('js-weaponOption--scope');
            scopeCheckbox.checked = false;
        }
        if (!this.filterOptions.hero) {
            const heroCheckbox = document.getElementById('js-weaponOption--hero');
            heroCheckbox.checked = false;
        }
        if (this.localStorageData && this.localStorageData.hasOwnProperty('settings')) {
            this.settings = this.localStorageData['settings'];
        }
        this.restoreRadioFormData('theme', 'settingsTheme');
        this.restoreRadioFormData('mode', 'settingsMode');
        this.restoreRadioFormData('language', 'settingsLanguage');
    }
    restoreALLFormData(key, checkboxId) {
        const checkboxes = Array.from(document.querySelectorAll('input[name="' + checkboxId + '"]'));
        if (key !== 'type' && key !== 'sub' && key !== 'sp' && key !== 'season')
            return;
        if (this.filterOptions[key].length < 1)
            return;
        const checkBoxALL = document.getElementById('js-' + checkboxId + '--all');
        if (!checkBoxALL)
            return;
        checkBoxALL.checked = false;
        for (let index = 0; index < checkboxes.length; index++) {
            if (!this.filterOptions[key].includes(checkboxes[index].value)) {
                checkboxes[index].checked = false;
            }
        }
    }
    restoreRadioFormData(key, radioId) {
        const radios = Array.from(document.querySelectorAll('input[name="' + radioId + '"]'));
        if (key !== 'theme' && key !== 'mode' && key !== 'language')
            return;
        for (let index = 0; index < radios.length; index++) {
            if (this.settings[key] == radios[index].value) {
                radios[index].checked = true;
            }
        }
    }
}
// localStorageからJSONデータを取得する
function getLocalStorageData() {
    const jsonData = localStorage.getItem(localStorageKey);
    if (jsonData) {
        try {
            const parsedData = JSON.parse(jsonData);
            return parsedData;
        }
        catch (error) {
            console.error('Error parsing JSON data:', error);
            return {};
        }
    }
    return {};
}
// イベントリスナー登録
function attachClickHandler(id, f) {
    const target = document.getElementById(id);
    if (target)
        target.addEventListener('click', f, false);
}
// フィルター用チェックボックス関数
function attachAllCheckboxEvents(name) {
    const target = Array.from(document.querySelectorAll('input[name="' + name + '"]'));
    target.forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            const targetCheckbox = event.target;
            if (targetCheckbox.id == 'js-' + targetCheckbox.name + '--all') {
                target.forEach(checkbox => {
                    checkbox.checked = targetCheckbox.checked;
                });
            }
            else {
                const allCheckbox = document.getElementById('js-' + targetCheckbox.name + '--all');
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
function getCheckedValues(checkboxes) {
    return checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}
// subメニューを一瞬たたむ
function hideSubMenu(id) {
    const target = document.getElementById(id);
    if (!target)
        return;
    // target.classList.remove('is_active');
    target.classList.add('is_not_active');
    setTimeout(function () {
        if (target.classList.contains('is_not_active'))
            target.classList.remove('is_not_active');
    }, 1000);
}
const bukiStars = new BukiStars;
// 実行
window.onload = function () {
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
