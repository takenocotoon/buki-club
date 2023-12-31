            <div>
                <button type="button" id="js-set-filer-btn-t" class="js-set">Set</button>
                <div class="p-filter-form">
                    <div>
                        <span lang="ja">ブキ種</span>
                        <span lang="en">Class</span>
                    </div><?php 
                        $weaponTypes = array(
                            'shooter' => 'シューター',
                            'blaster' => 'ブラスター',
                            'roller' => 'ローラー',
                            'brush' => 'フデ',
                            'charger' => 'チャージャー',
                            'slosher' => 'スロッシャー',
                            'splatling' => 'スピナー',
                            'dualies' => 'マニューバー',
                            'brella' => 'シェルター',
                            'stringer' => 'ストリンガー',
                            'splatana' => 'ワイパー',
                        );
                        echo "                    ";
                        echo "<input type=\"checkbox\" name=\"weaponType\" id=\"js-weaponType--all\" checked>";
                        echo "<label for=\"js-weaponType--all\" class=\"p-filter-form--strong\">";
                        echo "<span lang=\"ja\">全て</span>";
                        echo "<span lang=\"en\">All</span>";
                        echo "</label>\n";
                        foreach ($weaponTypes as $en => $jp) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"weaponType\" value=\"{$en}\" id=\"js-weaponType--{$en}\" checked>";
                            echo "<label for=\"js-weaponType--{$en}\">";
                            echo "<span lang=\"ja\">{$jp}</span>";
                            echo "<span lang=\"en\">{$en}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div class="p-filter-form">
                    <div>
                        <span lang="ja">サブ</span>
                        <span lang="en">Sub</span>
                    </div><?php 
                        $weaponSubTypes = array(
                            'splashbomb' => ['スプラッシュボム', 'Splat Bomb'],
                            'quickbomb' => ['クイックボム', 'Burst Bomb'],
                            'kyubanbomb' => ['キューバンボム', 'Suction Bomb'],
                            'curlingbomb' => ['カーリングボム', 'Curling Bomb'],
                            'robotbomb' => ['ロボットボム', 'Autobomb'],
                            'tansanbomb' => ['タンサンボム', 'Fizzy Bomb'],
                            'torpedo' => ['トーピード', 'Torpedo'],
                            'sprinkler' => ['スプリンクラー', 'Sprinkler'],
                            'jumpbeacon' => ['ジャンプビーコン', 'Squid Beakon'],
                            'splashshield' => ['スプラッシュシールド', 'Splash Wall'],
                            'trap' => ['トラップ', 'Ink Mine'],
                            'poisonmist' => ['ポイズンミスト', 'Toxic Mist'],
                            'pointsensor' => ['ポイントセンサー', 'Point Sensor'],
                            'linemarker' => ['ラインマーカー', 'Angle Shooter'],
                        );
                        echo "                    ";
                        echo "<input type=\"checkbox\" name=\"weaponSubType\" id=\"js-weaponSubType--all\" checked>";
                        echo "<label for=\"js-weaponSubType--all\" class=\"p-filter-form--strong\">";
                        echo "<span lang=\"ja\">全て</span>";
                        echo "<span lang=\"en\">All</span>";
                        echo "</label>\n";
                        foreach ($weaponSubTypes as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"weaponSubType\" value=\"{$id}\" id=\"js-weaponSubType--{$id}\" checked>";
                            echo "<label for=\"js-weaponSubType--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div class="p-filter-form">
                    <div>
                        <span lang="ja">スペシャル</span>
                        <span lang="en">Special</span>
                    </div><?php 
                        $weaponSPTypes = array(
                            'amefurashi' => ['アメフラシ', 'Ink Storm'],
                            'ultrashot' => ['ウルトラショット', 'Trizooka'],
                            'ultrahanko' => ['ウルトラハンコ', 'Ultra Stamp'],
                            'energystand' => ['エナジースタンド', 'Tacticooler'],
                            'kanitank' => ['カニタンク', 'Crab Tank'],
                            'kyuinki' => ['キューインキ', 'Ink Vac'],
                            'greatbarrier' => ['グレートバリア', 'Big Bubbler'],
                            'sameride' => ['サメライド', 'Reefslider'],
                            'shokuwander' => ['ショクワンダー', 'Zipcaster'],
                            'jetpack' => ['ジェットパック', 'Inkjet'],
                            'tripletornado' => ['トリプルトルネード', 'Triple Inkstrike'],
                            'nicedama' => ['ナイスダマ', 'Booyah Bomb'],
                            'hopsonar' => ['ホップソナー', 'Wave Breaker'],
                            'missile' => ['マルチミサイル', 'Tenta Missiles'],
                            'megaphone51' => ['メガホンレーザー5.1ch', 'Killer Wail 5.1'],
                            'decoy' => ['デコイチラシ', 'Super Chump'],
                            'teioika' => ['テイオウイカ', 'Kraken Royale'],
                        );
                        echo "                    ";
                        echo "<input type=\"checkbox\" name=\"weaponSPType\" id=\"js-weaponSPType--all\" checked>";
                        echo "<label for=\"js-weaponSPType--all\" class=\"p-filter-form--strong\">";
                        echo "<span lang=\"ja\">全て</span>";
                        echo "<span lang=\"en\">All</span>";
                        echo "</label>\n";
                        foreach ($weaponSPTypes as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"weaponSPType\" value=\"{$id}\" id=\"js-weaponSPType--{$id}\" checked>";
                            echo "<label for=\"js-weaponSPType--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div class="p-filter-form">
                    <div>
                        <span lang="ja">オプション</span>
                        <span lang="en">Option</span>
                    </div><?php 
                        $weaponOption = array(
                            'minor' => ['マイナーチェンジブキ', 'Variant Weapons'],
                            'scope' => ['スコープ', 'Scopes'],
                            'hero' => ['ヒーローブキ', 'Hero Weapons'],
                        );
                        foreach ($weaponOption as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"weaponOption--{$id}\" value=\"true\" id=\"js-weaponOption--{$id}\" checked>";
                            echo "<label for=\"js-weaponOption--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div class="p-filter-form">
                    <div>
                        <span lang="ja">シーズン</span>
                        <span lang="en">Season</span>
                    </div><?php 
                        $weaponSeason = array(
                            '0' => ['シーズン1：2022秋 Drizzle Season', 'season1:Drizzle Season 2022'],
                            '2' => ['シーズン2：2022冬 Chill Season', 'season2:Chill Season 2022'],
                            '3' => ['シーズン3：2023春 Fresh Season', 'season3:Fresh Season 2023'],
                            '4' => ['シーズン4：2023夏 Sizzle Season', 'season4:Sizzle Season 2023'],
                            '5' => ['シーズン5：2023秋 Drizzle Season', 'season5:Drizzle Season 2023'],
                        );
                        echo "                    ";
                        echo "<input type=\"checkbox\" name=\"weaponSeason\" id=\"js-weaponSeason--all\">";
                        echo "<label for=\"js-weaponSeason--all\" class=\"p-filter-form--strong\">";
                        echo "<span lang=\"ja\">全て</span>";
                        echo "<span lang=\"en\">All</span>";
                        echo "</label>\n";
                        foreach ($weaponSeason as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"weaponSeason\" value=\"{$id}\" id=\"js-weaponSeason--{$id}\"";
                            echo " checked";
                            echo ">";
                            echo "<label for=\"js-weaponSeason--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <button type="button" id="js-set-filer-btn-b" class="js-set">Set</button>
                <!-- <button type="button" id="js-set-star1-button">Clear</button> -->
            </div>
