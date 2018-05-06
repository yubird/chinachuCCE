<?php
// chinachuのrecorded.jsonを指定
define('RECORDED_FILE', '/usr/local/chinachu/data/recorded.json');
// chinachu API経由のrecorded
define('RECORDED_API', 'http://yubird:mf411Dcas22@192.168.206.3:20772/api/recorded.json');
// ffmpeg
define('FFMPEG_BINARY', '/usr/local/chinachu/usr/bin/ffmpeg');
// Tssplitter
define('TSSPLITTER_BINARY', 'wine /root/.wine/drive_c/Program\ Files/TsSplitter.exe -EIT -ECM -1SEG -SEP2 -SEPA -OUT');
// tmp directory
define('WORKING_DIR', '/tmp/');
// 1回の実行中に何ファイル変換するか
define('MAX_PROCESS', 5);
// 全力出しちゃう？
define('MAX_THREADS', 12);
// 変換処理1回毎の休憩時間(秒)
define('SLEEP_TIME', 20);
// 変換後ファイルチェックで正常とみなすサイズ(bytes)
define('SUCCESS_FILESIZE', 524288);
// 変換後に元ファイルを削除するか
define('DELETE_SOURCE_FILE', true);
?>
