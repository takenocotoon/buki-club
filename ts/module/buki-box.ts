"use strict";
import { bukiStars } from './buki-stars';
import { localStorageKey, localStorageData, saveLocalStorageData } from './local-storage';
import { applySettings } from './apply-settings';
import { applyWeaponFilters } from './apply-filters';
import * as confetti from 'canvas-confetti';

class BukiBox {
    count = 0;
    
    // コンストラクタ
    constructor() {
        if (localStorageData.hasOwnProperty('markedWeapons')) {
            bukiStars.markedWeapons = { ...localStorageData['markedWeapons'] };
        }
    }
    
    
    // ブキ選択をリセットする
    resetWeapons = () => {
        let result = false;
        if (bukiStars.settings.language == 'ja') {
            result = window.confirm('本当にリセットしても良いですか？');
        } else if (bukiStars.settings.language == 'en') {
            result = window.confirm('Do you really want to reset?');
        }
        
        if (!result) return;
        
        bukiStars.markedWeapons = {};
        this.updateLocalStorageData();
        this.renderWeapons();
    }
    
    
    // 設定を保存
    updateLocalStorageData = () => {
        saveLocalStorageData();
        // localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    }
    
    
    // ブキチェック切り替え
    toggleMark = (id:number) =>  {
        const myWeaponEle: HTMLElement| null = document.getElementById('js-weapon-'+id);
        if (!myWeaponEle) return;
        const imgEle = myWeaponEle.querySelector('img');
        if (!imgEle) return;
        
        if (bukiStars.markedWeapons.hasOwnProperty(id) && Number.isInteger(bukiStars.markedWeapons[id])) {
            if (bukiStars.markedWeapons[id] >= 5) {
                if (myWeaponEle.classList.contains('p-done')) myWeaponEle.classList.remove('p-done');
                if (myWeaponEle.classList.contains('p-done--5')) myWeaponEle.classList.remove('p-done--5');
                delete bukiStars.markedWeapons[id];
            } else {
                const myWeaponClasses = Array.from(myWeaponEle.classList);
                for (const className of myWeaponClasses) {
                    const match = className.match(/p-done--(\d+)/);
                    if (match) {
                        myWeaponEle.classList.remove(className);
                    }
                }
                bukiStars.markedWeapons[id]++;
                myWeaponEle.classList.add('p-done--'+bukiStars.markedWeapons[id]);
            }
        } else {
            bukiStars.markedWeapons[id] = 1;
            myWeaponEle.classList.add('p-done');
            myWeaponEle.classList.add('p-done--1');
        }
        if (!myWeaponEle.classList.contains('is-done')) myWeaponEle.classList.add('is-done');
        
        // データ保存
        this.updateLocalStorageData();
        this.renderWeaponsCount(true);
    }
    
    
    // ブキ数表示
    private renderWeaponsCount = (isConfettiEnabled:boolean = false) => {
        const weaponCountEle: HTMLDivElement = document.getElementById('p-weapon-count-box') as HTMLDivElement;
        const count = Object.keys(bukiStars.markedWeapons).filter(key => {
            const id = parseInt(key);
            return bukiStars.weaponsList.some(item => item.id === id) && bukiStars.markedWeapons[id] > bukiStars.settings.mode;
        }).length;
        weaponCountEle.innerText = count + '/' + Object.keys(bukiStars.weaponsList).length;
        
        if (isConfettiEnabled && this.count < count && count >= Object.keys(bukiStars.weaponsList).length) this.showCompletionMessage();
        this.count = count;
    }
    
    
    // コンプリート！
    private showCompletionMessage  = () => {
        const target:HTMLDialogElement|null = document.getElementById('js-compleat--box') as HTMLDialogElement;
        const targetText:HTMLElement|null = document.getElementById('js-compleat--mode');
        const myCanvas:HTMLCanvasElement|null = document.getElementById('js-complete--confetti') as HTMLCanvasElement;
        
        if (!target || !targetText || !myCanvas) return;
        
        let texts = [] as string[];
        if (bukiStars.settings.language == 'ja') {
            texts = ['ライセンス', 'ブキステッカー', 'ホロブキステッカー', 'ブキバッジ', '金ブキバッジ'];
        } else if (bukiStars.settings.language == 'en') {
            texts = ['License', 'Sticker', 'Holo Sticker', 'Badge', 'Golden Badge'];
        }
        if (texts) targetText.innerText = texts[bukiStars.settings.mode];
        target.showModal();
        
        let myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true
        });
        myConfetti({
            angle: (Math.random() * (100 - 80) + 80),
            particleCount: (Math.random() * (300 - 80) + 80),
            spread: (Math.random() * (200 - 50) + 50),
            origin: { y: 0.5 }
        });
    }
    
    
    // ブキ画像リスト描写
    renderWeapons = () => {
        // hideSubMenu('js-menu--filter');
        // hideSubMenu('js-menu--settings');
        
        // 設定適応
        // applySettings();
        
        // ブキフィルタ
        // applyWeaponFilters();
        
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
            if (numCols / (bukiStars.weaponsList.length / numCols) > windowSize.aspectRatio ) { break };
        }
        let numRows: number = Math.ceil(bukiStars.weaponsList.length / numCols);
        
        // 描画
        let index: number = 0;
        for (let row=0; row<numRows; row++) {
            const boxTrEle: HTMLDivElement = boxTrTemplateEle.cloneNode(true) as HTMLDivElement;
            
            for (let col=0; col<numCols; col++) {
                const weaponEle: HTMLDivElement = weaponTemplateEle.cloneNode(true) as HTMLDivElement;
                const weaponImageEle: HTMLImageElement = weaponImageTemplateEle.cloneNode(true) as HTMLImageElement;
                // const weaponStarEle: HTMLSpanElement = weaponStarTemplateEle.cloneNode(true) as HTMLSpanElement;
                
                weaponImageEle.src = './img/weapons/--.webp';
                if (index < bukiStars.weaponsList.length) {
                    const weaponId = bukiStars.weaponsList[index]['id'];
                    const weaponJa = bukiStars.weaponsList[index]['ja'];
                    const weaponEn = bukiStars.weaponsList[index]['en'];
                    
                    weaponImageEle.src = './img/weapons/' + weaponId + '.webp';
                    if (bukiStars.settings.language == 'en') {
                        weaponImageEle.alt = weaponEn;
                        weaponEle.title = weaponEn;
                    } else {
                        weaponImageEle.alt = weaponJa;
                        weaponEle.title = weaponJa;
                    }
                    
                    weaponEle.classList.add('p-td');
                    weaponEle.id = 'js-weapon-' + weaponId;
                    // weaponEle.style.backgroundImage = 'url(./img/weapons/' + weaponsList[index]['id'] + '.webp)';
                    
                    if (bukiStars.markedWeapons.hasOwnProperty(weaponId) && Number.isInteger(bukiStars.markedWeapons[weaponId]) && bukiStars.markedWeapons[weaponId] <= 5) {
                        weaponEle.classList.add('p-done');
                        weaponEle.classList.add('p-done--'+bukiStars.markedWeapons[weaponId]);
                        // weaponStarEle.innerText = '★'.repeat(this.markedWeapons[weaponsList[index]['id']]);
                    }
                    
                    const currentIndex = index;
                    weaponEle.addEventListener('click', (event) => this.toggleMark(weaponId));
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
        this.renderWeaponsCount(false);
    }
}

export const bukiBox = new BukiBox();
