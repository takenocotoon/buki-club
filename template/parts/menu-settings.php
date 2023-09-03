            <div>
                <button type="button" id="js-set-setting-btn-t" class="js-set">Set</button>
                <div class="p-setting-form">
                    <div>
                        <span lang="ja">カラーテーマ</span>
                        <span lang="en">Color Scheme</span>
                    </div><?php 
                        $settingsTheme = array(
                            'default' => ['システム設定に従う', 'Follow System Setting'],
                            'light' => ['ライト', 'Light'],
                            'dark' => ['ダーク', 'Dark'],
                            // 'splat' => ['スプラ', 'Splat'],
                        );
                        echo "\n                    ";
                        foreach ($settingsTheme as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsTheme\" value=\"{$id}\" id=\"js-settingsTheme--{$id}\"";
                            if ($id=='lite') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsTheme--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                </div>
                <div class="p-setting-form">
                    <div>
                        <span lang="ja">モード</span>
                        <span lang="en">Mode</span>
                    </div><?php 
                        $settingsMode = array(
                            '0' => ['ライセンスあつめ部', 'License Collection'],
                            '1' => ['ブキステッカーあつめ部', 'Sticker Collection'],
                            '2' => ['ホロブキステッカーあつめ部', 'Holo Sticker Collection'],
                            '3' => ['ブキバッジあつめ部', 'Badge Collection'],
                            '4' => ['金バッジあつめ部', 'Golden Badge Collection'],
                        );
                        echo "\n                    ";
                        foreach ($settingsMode as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsMode\" value=\"{$id}\" id=\"js-settingsMode--{$id}\"";
                            if ($id==1) { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsMode--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                </div>
                <div class="p-setting-form">
                    <div>Language</div><?php 
                        $settingsLanguage = array(
                            'ja' => '日本語',
                            'en' => 'English',
                        );
                        echo "\n                    ";
                        foreach ($settingsLanguage as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsLanguage\" value=\"{$id}\" id=\"js-settingsLanguage--{$id}\"";
                            if ($id=='ja') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsLanguage--{$id}\">{$name}</label>";
                        } ?>
                </div>
                <button type="button" id="js-set-setting-btn-b" class="js-set">Set</button>
            </div>
