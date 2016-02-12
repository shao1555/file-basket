FileBasket
==========

# 実装メモ

- uploader
  - 標準入力から受け取ったデータ (ファイルパス, バイナリ, テキスト) を S3 にアップロード
- basket
  - S3 に保管しているアセットを表示する画面を提供
    - https://file-basket.net/shao1555/1234567890/hoge.jpg
      - <html><body><img src='https://file-basket.s3.amazonaws.com/shao1555/1234567890/hoge.jpg' /></body></html>
    - https://file-basket.net/shao1555/1234567890/fuga.md
  - 書き込みに必要なトークンをクライアントに提供する
- S3
  - ファイルの保管庫
  - 初期実装では URL を知っている人の直アクセスを想定する
    - https://items.file-basket.net/shao1555/1234567890/hoge.jpg
    - IAMポリシーで、ユーザのディレクトリ以下への read / write 、public の read が許可される
  - ルールつきディレクトリ
    - /shao1555/1234567890/.file-basket-rules.json にルールを記述
      - 特定のユーザ、ドメインを許可したり、BASIC 認証を要求したり、有効期限を設定できる。
    - IAM ポリシーでは public の read を禁止する
    - 403 は basket にリダイレクト。basket で認可された場合は、トークンつき URL を返す

# Basket API

## GET /api/v1/sessions/new

ログイン画面にリダイレクト

## basket


GET /api/v2/upload_key
