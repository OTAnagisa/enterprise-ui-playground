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
- Button (Atom) - 多様なバリアントのボタンコンポーネント
- SearchInput (Molecule) - API連携の検索インプットコンポーネント

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

### その他

```bash
# リンター実行
pnpm lint

# クリーンアップ
pnpm clean
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

## 🏗️ モノレポのベストプラクティス

1. **共通の依存関係**: ルートのpackage.jsonで管理
2. **個別の依存関係**: 各パッケージのpackage.jsonで管理
3. **スクリプトの実行**: `pnpm --filter <package-name> <script>`
4. **並列実行**: `pnpm --parallel --filter "./packages/*" <script>`

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

## 📝 開発ガイドライン

### コンポーネントの追加

1. Atomic Designパターンに従う (atoms/molecules/organisms)
2. 3つのファイルを作成:
   - `Component.vue` - コンポーネント実装
   - `Component.stories.ts` - Storybookストーリー
   - `Component.test.ts` - ユニットテスト
3. `src/index.ts`からエクスポート

### コードスタイル

- TypeScript strict mode
- Vue 3 Composition API with `<script setup>`
- TailwindCSSユーティリティクラス
- Arrange-Act-Assertパターンのテスト

### テストガイドライン

- 様々なpropsでのレンダリングをテスト
- ユーザーインタラクションとイベントのテスト
- 外部依存関係のモック
- 重要なパスの高いカバレッジを目指す

## 📄 ライセンス

MIT

## 🔗 リンク

- [Repository](https://github.com/OTAnagisa/enterprise-ui-playground)

---

Built with ❤️ using Vue 3, TypeScript, and modern web development tools.
