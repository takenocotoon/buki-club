// 画像として書き出す (html2canvas)
function captureImage(buttonEle) {
    const targetEle = document.getElementById('p-buki-box');
    if (!targetEle || !buttonEle) return;
    
    const captureEle= document.createElement('div');
    captureEle.id = 'p-capture-img-area';
    
    const clonedEle = targetEle.cloneNode(true);
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
