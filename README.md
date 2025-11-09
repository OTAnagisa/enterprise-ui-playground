# Enterprise UI Playground

エンタープライズグレードのVue 3コンポーネントライブラリのモノレポです。

## 🏗️ プロジェクト構成

このリポジトリはpnpmワークスペースを使用したモノレポ構成になっています。

```
enterprise-ui-playground/
├── packages/
│   └── ui-library/           # Vue 3 コンポーネントライブラリ
├── pnpm-workspace.yaml       # pnpm ワークスペース設定
├── package.json              # ルート package.json
└── README.md                 # このファイル
```

## 📦 パッケージ

### ui-library

Vue 3、TypeScript、TailwindCSSで構築されたプロダクションレディなコンポーネントライブラリ。

**主な機能:**
- 🚀 Vue 3 Composition API
- 📘 TypeScript完全対応
- 🎨 TailwindCSSスタイリング
- 📖 Storybook統合
- 🧪 Vitest + Testing Library
- 🎭 MSW (Mock Service Worker)
- ⚡ Viteビルド

**コンポーネント:**

**Atoms (基本コンポーネント):**
- **Button** - 多様なバリアントのボタンコンポーネント (primary, secondary, outline, danger)
- **TextField** - ラベル、エラー、バリデーション付きのテキスト入力フィールド
- **DateInput** - カレンダーアイコン付き日付入力フィールド

**Molecules (複合コンポーネント):**
- **Card** - ヘッダー、ボディ、フッター付きのカードコンポーネント

**Organisms (複雑なコンポーネント):**
- **Calendar** - 月表示カレンダー、日付選択、制約機能付き
- **Table** - ソート、カスタムセル、スタイリングオプション付きテーブル

詳細は [packages/ui-library/README.md](./packages/ui-library/README.md) を参照してください。

## 🚀 クイックスタート

### 前提条件

- Node.js 18+ (推奨: 20+)
- pnpm 8+

```bash
# pnpmのインストール (未インストールの場合)
npm install -g pnpm
```

### セットアップ

```bash
# 依存関係のインストール
pnpm install
```

## 📜 スクリプト

### 開発

```bash
# ui-libraryの開発サーバーを起動
pnpm dev

# Storybookを起動
pnpm storybook
```

### テスト

```bash
# 全パッケージのテストを実行
pnpm test

# テストをUIで実行
pnpm test:ui

# カバレッジ付きでテスト
pnpm test:coverage
```

### ビルド

```bash
# 全パッケージをビルド
pnpm build

# Storybookをビルド
pnpm build-storybook
```

## 🛠️ 技術スタック

- **Vue 3.4+** - プログレッシブJavaScriptフレームワーク
- **TypeScript 5.3+** - 型安全なJavaScript
- **Vite 5** - 次世代フロントエンドツール
- **TailwindCSS 3.4** - ユーティリティファーストCSSフレームワーク
- **Vitest 1.3+** - 超高速ユニットテストフレームワーク
- **Testing Library** - シンプルで完全なテストユーティリティ
- **Storybook 7.6+** - UIコンポーネント開発環境
- **MSW 2+** - APIモックライブラリ
- **pnpm** - 高速で効率的なパッケージマネージャー

## 📁 ワークスペース構成

### パッケージの追加

新しいパッケージを追加する場合：

```bash
# packages/配下に新しいディレクトリを作成
mkdir -p packages/new-package

# package.jsonを作成
cd packages/new-package
pnpm init
```

`pnpm-workspace.yaml`は自動的に`packages/*`配下の全パッケージを認識します。

### パッケージ間の依存関係

```bash
# ui-libraryを別のパッケージから参照する例
pnpm --filter other-package add ui-library --workspace
```

## 🏗️ コンポーネント設計

### Atomic Designパターン

このライブラリは、Atomic Designの原則に従っています：

```
src/components/
├── atoms/          # 最小の構成要素 (Button, TextField, DateInput)
├── molecules/      # 複数のatomsの組み合わせ (Card)
└── organisms/      # 複雑な機能単位 (Calendar, Table)
```

### 新しいコンポーネントの追加

1. 適切なディレクトリ（atoms/molecules/organisms）にコンポーネントディレクトリを作成
2. 3つのファイルを作成：
   - `ComponentName.vue` - コンポーネント実装
   - `ComponentName.stories.ts` - Storybookストーリー
   - `ComponentName.test.ts` - ユニットテスト
3. `src/index.ts`からエクスポート

### コードスタイル

- TypeScript strict mode
- Vue 3 Composition API with `<script setup>`
- TailwindCSSユーティリティクラス
- Arrange-Act-Assertパターンのテスト

## 📖 ドキュメント

- [UI Library README](./packages/ui-library/README.md) - コンポーネントライブラリの詳細ドキュメント

## 🤝 コントリビューション

1. 新しいブランチを作成
2. 変更を実装
3. テストを追加/更新
4. テストが通ることを確認: `pnpm test`
5. Storybookストーリーを追加/更新
6. ドキュメントを更新
7. プルリクエストを作成

## 🧪 テストガイドライン

### テスト戦略

- **ユニットテスト**: 各コンポーネントの単体テスト (Vitest + Testing Library)
- **ビジュアルテスト**: Storybookでのコンポーネント確認
- **カバレッジ**: 重要なパスの高いカバレッジを目指す

### テストの実行

```bash
# 全テストを実行
pnpm test

# ウォッチモードで実行
pnpm test --watch

# カバレッジレポートを生成
pnpm test:coverage
```

## 🎨 Storybook

Storybookは、コンポーネントの開発とドキュメント化のための環境を提供します。

```bash
# Storybookを起動
pnpm storybook

# Storybookをビルド
pnpm build-storybook
```

各コンポーネントには以下のストーリーが含まれます：
- **Default**: デフォルト状態
- **バリエーション**: 各props/variantのバリエーション
- **Interactive**: インタラクティブなデモ
- **All Variants**: 全バリエーションの表示

## 📝 ライセンス

MIT

## 🔗 リンク

- [Repository](https://github.com/OTAnagisa/enterprise-ui-playground)

---

Built with ❤️ using Vue 3, TypeScript, and modern web development tools.
