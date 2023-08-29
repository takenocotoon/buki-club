
<main><div>
    <article>
        <section id="p-buki-box">
        </section>
        
        <button type="button" id="js-download-btn">
            <span id="js-download-btn--before">
                <i class="ri-download-2-fill"></i>
                <span lang="ja">画像として保存する</span>
                <span lang="en">Save as Image</span>
            </span>
            <span id="js-download-btn--processing" style="display:none;"><i class="ri-hourglass-line"></i> 画像生成中</span>
        </button>
        <button type="button" id="js-clear-btn">
            <i class="ri-loader-2-line"></i>
            <span lang="ja">リセット</span>
            <span lang="en">Reset</span>
        </button>
        <button type="button" id="js-random-btn">
            <i class="ri-magic-fill"></i>
            <span lang="ja">今日のブキ</span>
            <span lang="en">Today's Weapon</span>
        </button>
    </article>
</div></main>

<dialog id="js-random-weapon--box">
    <p>
        <span lang="ja">今日は <span id="js-random-weapon--nameJa"></span> を使ってみませんか？</span>
        <span lang="en">Would you like to try using <span id="js-random-weapon--nameEn"></span> today?</span>
    </p>
    <img src="./img/weapons/--.webp" id="js-random-weapon--img">
    <form method="dialog">
        <button>OK</button>
        <!-- <button id="js-random-btn2"><span lang="ja">別のブキを探す</span><span lang="en">Pick Another Weapon</span></button> -->
    </form>
</dialog>

<dialog id="js-compleat--box">
    <p>
        <span id="js-compleat--mode"></span>
        <span lang="ja">コンプリート！<br>おめでとうございます！</span>
        <span lang="en">Complete!<br>Congratulations!</span>
        <span id="js-compleat--count"></span>
    </p>
    <form method="dialog">
        <button>OK</button>
    </form>
    <canvas id="js-complete--confetti"></canvas>
</dialog>
