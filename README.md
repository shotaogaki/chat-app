# chat-app-react-hooks<br />
概要：react hooksを使用したチャットアプリケーションです。<br />
通常のチャット機能に加え、チャットの内容を通訳してくれます。<br />
また、ログインしなくても利用出来ます。<br />
日常の中で英語に触れるチャンスを増やすことで英語の上達を目的としたアプリケーションです。<br />
ブラウザのタブを二つ用意し、メッセージを送信いただくとリアルタイムで受信されるのを確認することができます。<br />
また、データが永続化されるため、いつでも確認可能です。<br />
<br />
<img src="./sample2.png" width="400px"><img src="./sample1.png" width="400px">
# 機能一覧：<br />
・googleログイン機能（firebase）<br />
・テキスト通訳機能（firebase Extension）<br />
・リアルタイムアップデート（firebase onSnapshot()メソッド）<br />
・メッセージの永続化（firebase firestore）<br />
・チャット機能<br />

# ソフトウェア構成<br />
    react: 16.13.1,<br />
    react-dom: 16.13.1,<br />
    react-scripts: 3.4.1<br />
    @material-ui/core: 4.10.1,<br />
    @material-ui/icons: 4.9.1,<br />
    @testing-library/jest-dom: 4.2.4,<br />
    @testing-library/react: 9.5.0,<br />
    @testing-library/user-event: 7.2.1,<br />
    dotenv: 8.2.0,<br />
    firebase: 7.15.0,<br />
