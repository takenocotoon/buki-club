"use strict";

import html2canvas from 'html2canvas';

// 画像生成ボタンを待機させる
export function waitingCaptureImage() {
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


// 画像として書き出す (html2canvas)
export function captureImage() {
    waitingCaptureImage();
    
    const targetEle:HTMLElement|null = document.getElementById('p-buki-box');
    if (!targetEle) return;
    
    const captureEle:HTMLDivElement = document.createElement('div');
    captureEle.id = 'p-capture-img-area';
    
    const clonedEle:HTMLElement = targetEle.cloneNode(true) as HTMLElement;
    clonedEle.className = 'p-capture-box';
    
    captureEle.appendChild(clonedEle);
    document.getElementsByTagName('body')[0].appendChild(captureEle);
    
    html2canvas(captureEle, {backgroundColor:null}).then(canvas => { 
        const downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = "buki.png";
        downloadEle.click();
    });
    captureEle.remove();
    // beforeText.style.display = 'inline';
    // processingText.style.display = 'none';
    // buttonEle.removeAttribute("disabled");
}
