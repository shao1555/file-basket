FileBasket
==========

# 実装メモ

- web front end
  - アップロード
    - 参照ボタンまたは DnD でファイルをアップロード
      - アップロード用の STS トークンを要求 (Lambda の匿名リクエストから生成)
      - /1234567890/1.jpg に S3 でアップロード
        - 書き込まれた画像を Lambda で invoke してサムネイルを作成
    - アップロード後画面 (パーミッション設定など)
      - パーミッションを /1234567890/.file-basket-policy.json に書き込み
        - 書き込まれたポリシーを Lambda で invoke して S3 パーミッションを設定
  - ビューア
    - S3 に保管しているアセットを表示する画面を提供
      - Lambda にファイル表示要求を投げる
    - .file-basket-policy.json の状態により、追加の認証を要求

# .file-basket-policy.json

```json
{
  "owner": "accounts.google.com:s@shao.jp",
  "ACL": "private",
  "permissions": [
    {
      "provider": "accounts.google.com",
      "group": "managers@shao.jp",
      "permission": "write"
    },
    {
      "provider": "accounts.google.com",
      "email": "*@shao.jp",
      "permission": "read"
    },
    {
      "provider": "source-ip-address",
      "networks": [ "shao-house@networks.file-basket.private", "ipv4:192.168.0.0/24" ],
      "permission": "read"
    },
    {
      "provider": "anonymous",
      "key": "some-secret",
      "iv": "some-initialization-vector",
      "permission": "read"
    }
  ]
}
```

# Basket API
