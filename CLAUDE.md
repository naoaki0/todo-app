# CLAUDE.md - TODOアプリ開発ガイドライン

## ⚠️ 外部システム連携に関する絶対遵守事項

このTODOアプリには、**外部システム（Antigravity等）からFirestore APIを通じてタスクを直接書き込む仕組み**が存在する。
以下のデータ構造とルールは、この外部連携を維持するために**絶対に壊してはならない**。

---

## タスクデータ構造（Firestore スキーマ）

外部システムは以下の形式でタスクを `users/{userId}/tasks` 配列に書き込む。
**このスキーマのフィールド名・型・意味を変更してはならない。**

```json
{
  "id": "string",            // タスク固有ID（タイムスタンプベース）
  "title": "string",         // タスク名
  "completed": false,        // 完了状態（boolean）
  "createdAt": 1234567890,   // 作成日時（Unix timestamp in milliseconds）
  "listId": "default",       // リストID（"default" がメインリスト）
  "isSectionHead": false,    // セクション区切りフラグ（boolean）
  "sectionId": 1,            // セクションID（number、1始まり）
  "sectionName": "準備"      // セクション名（string、任意）
}
```

### 各フィールドの詳細

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | ✅ | タスクの一意識別子。外部システムはタイムスタンプで生成する |
| `title` | string | ✅ | タスクの表示名 |
| `completed` | boolean | ✅ | タスクの完了状態 |
| `createdAt` | number | ✅ | 作成日時（ミリ秒単位のUnixタイムスタンプ） |
| `listId` | string | ✅ | 所属リスト。外部システムは `"default"` を使用する |
| `isSectionHead` | boolean | ✅ | `true` の場合、このタスクの前にセクションヘッダーを表示する |
| `sectionId` | number | ✅ | セクション番号（1から始まる連番） |
| `sectionName` | string | ❌ | セクション名。指定がない場合はUIで `Section N` と表示される |

---

## セクションシステムに関するルール

### 1. `isSectionHead` の動作仕様（変更禁止）

- `isSectionHead: true` のタスクは**セクションの区切り**を示す
- このタスクの**前に**セクションヘッダー（バッジ）を表示する
- **このタスク自体もタスクリストに通常のタスクとして表示しなければならない**（非表示にしてはならない）
- 外部システムは `isSectionHead: true` と `isSectionHead: false` の両方のタスクを書き込む

### 2. `sectionName` の取得ロジック

セクション名は以下の優先順位で取得する：
1. `section.header?.sectionName`（セクション先頭タスクのsectionName）
2. `section.tasks.find(t => t.sectionName)?.sectionName`（セクション内の任意のタスクのsectionName）
3. `Section ${sectionNum}`（フォールバック）

**重要**: 外部システムはセクション内の**すべてのタスク**に `sectionName` を設定する。
これは、最初のタスクが完了しても後続のタスクからセクション名を取得できるようにするためである。

### 3. 進捗バーの計算

- Section 1の進捗バーは `isSectionHead: true` のタスクも**含めて**計算する
- `isSectionHead` タスクをフィルタアウトしてはならない

---

## Firestore データの保存場所

```
Firestore構造:
└── users (collection)
    └── {userId} (document)
        ├── tasks: [...] (array of task objects)
        └── lastSync: number (milliseconds timestamp)
```

- 外部システムは `firestore.ArrayUnion()` を使ってタスクを追加する
- 既存のタスクは上書きされない（追記のみ）
- `lastSync` フィールドも同時に更新される

---

## コード修正時のチェックリスト

タスク表示やセクションに関するコードを修正する際は、以下を必ず確認すること：

- [ ] `isSectionHead: true` のタスクがタスクリストに**表示される**こと（非表示にしていないか）
- [ ] `sectionName` がセクション内の任意のタスクから取得できること
- [ ] `sectionId` によるセクション分けが正常に動作すること
- [ ] Firestoreの `tasks` 配列のスキーマが変更されていないこと
- [ ] `ArrayUnion` による外部からの追記が正常に動作すること
- [ ] 進捗バーが `isSectionHead` タスクも含めて計算されること

---

## ビルドとデプロイ

- **ソースファイル**: `app.jsx`（JSX形式のソース）
- **ビルド済みファイル**: `app.js`（Babelでトランスパイル済み）
- **エントリポイント**: `index.html`（`app.js` を読み込む）
- **デプロイ先**: GitHub Pages（mainブランチ）、Firebase Hosting
- `app.jsx` を修正したら `app.js` も再ビルドすること
