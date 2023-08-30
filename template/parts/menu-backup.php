            <div>
                <div class="p-setting-form">
                    <div>
                        <span lang="ja">データ保存スロット</span>
                        <span lang="en">Data Storage Slots</span>
                    </div><?php 
                        $saveDataSlot = array(
                            '1' => '1',
                            '2' => '2',
                            '3' => '3',
                        );
                        echo "\n                    ";
                        foreach ($saveDataSlot as $id => $name) {
                            echo "<input type=\"radio\" name=\"saveDataSlot\" value=\"{$id}\" id=\"js-saveDataSlot--{$id}\"";
                            if ($id=='ja') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-saveDataSlot--{$id}\">{$name}</label>";
                        } ?>
                        <button type="button" id="js-saveDataSlot-btn">
                            <span lang="ja">保存</span>
                            <span lang="en">Save</span>
                        </button>
                        <button type="button" id="js-loadDataSlot-btn">
                            <span lang="ja">復元</span>
                            <span lang="en">Restore</span>
                        </button>
                </div>
                <div class="p-setting-form">
                    <div>
                        Export
                    </div>
                        <button type="button" id="js-saveJson-btn">
                            <span lang="ja">バックアップデータをダウンロード</span>
                            <span lang="en">Download Backup Data</span>
                        </button>
                </div>
                <div class="p-setting-form">
                    <div>
                        Import
                    </div>
                        <input type="file" id="js-loadJson-input"><button type="button" id="js-loadJson-btn">
                            <span lang="ja">ファイルからデータを読み込む</span>
                            <span lang="en">Load Data from File</span>
                        </button>
                </div>
                <!-- <button type="button" id="js-set-star1-button">Clear</button> -->
            </div>
