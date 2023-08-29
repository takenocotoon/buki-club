"use strict";
import { bukiStars } from './buki-stars';

// 設定適応
export function applySettings() {
    const bodyEle:HTMLElement = document.getElementsByTagName('body')[0];
    
    // カラーテーマ
    const settingsThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsTheme"]');
    settingsThemeRadios.forEach(radio => {
        if (radio.checked) {
            const selectedValue:string = radio.value;
            bukiStars.settings.theme = selectedValue;
            bodyEle.className = 'theme-'+selectedValue;
        }
    });
    
    // モード
    const modeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsMode"]');
    modeRadios.forEach(radio => {
        if (radio.checked) {
            const selectedValue = parseInt(radio.value, 10); // 10進数として解釈
            if (!isNaN(selectedValue)) {
                bukiStars.settings.mode = selectedValue;
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
            bukiStars.settings.language = selectedValue;
            bodyEle.lang = selectedValue;
        }
    });
    
}
