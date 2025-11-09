# CI パイプライン修正まとめ

## 🐛 発生していた問題

### 問題1: 非推奨のGitHub Actionsバージョン
```
Error: This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`.
```

### 問題2: pnpm-lock.yamlの不在
```
ERR_PNPM_NO_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
```

## ✅ 実施した修正

### 1. GitHub Actionsのバージョン更新

**ファイル**: `.github/workflows/ci-ui-library.yml`

#### 更新内容:
- `actions/cache@v3` → `actions/cache@v4`
- `actions/upload-artifact@v3` → `actions/upload-artifact@v4`

```yaml
# Before
- uses: actions/cache@v3
- uses: actions/upload-artifact@v3

# After
- uses: actions/cache@v4
- uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: packages/ui-library/coverage
    retention-days: 30  # v4で推奨される設定
```

### 2. pnpm-lock.yamlの生成

**実行コマンド**:
```bash
cd /workspace
pnpm install
```

**結果**:
- `pnpm-lock.yaml` (311KB) が生成されました
- 1008個のパッケージがインストールされました
- ロックファイルはリポジトリにコミットする必要があります

## 📋 コミットが必要なファイル

以下のファイルをgitにコミットしてください：

1. ✅ `.github/workflows/ci-ui-library.yml` - GitHub Actionsの更新
2. ✅ `pnpm-lock.yaml` - 依存関係のロックファイル（重要！）
3. ✅ `.github/PULL_REQUEST_TEMPLATE.md` - PRテンプレート（追加）

## 🚀 コミット方法

```bash
# pnpm-lock.yamlを追加（最重要）
git add pnpm-lock.yaml

# GitHub Actions設定を追加
git add .github/workflows/ci-ui-library.yml

# PRテンプレートを追加（オプション）
git add .github/PULL_REQUEST_TEMPLATE.md

# コミット
git commit -m "fix: update GitHub Actions versions and add pnpm-lock.yaml

- Update actions/cache from v3 to v4
- Update actions/upload-artifact from v3 to v4
- Add pnpm-lock.yaml for reproducible builds
- Add PR template for better collaboration"

# プッシュ
git push
```

## 🔍 次回のCI実行で期待される動作

1. ✅ pnpm-lock.yamlが存在するため、`--frozen-lockfile`が動作
2. ✅ 依存関係が確実にロックされたバージョンでインストールされる
3. ✅ 非推奨のアクションに関するエラーが発生しない
4. ✅ 型チェック、ビルド、テストが実行される
5. ✅ カバレッジレポートがアーティファクトとしてアップロードされる

## 📝 pnpm-lock.yamlの重要性

### なぜ必要か？

- **再現可能なビルド**: すべての開発者とCIが同じバージョンの依存関係を使用
- **セキュリティ**: 意図しない依存関係の更新を防ぐ
- **デバッグ**: 依存関係に関する問題の原因特定が容易
- **CI/CD**: `--frozen-lockfile`フラグで厳密なバージョン管理

### ベストプラクティス

✅ **必ずコミットする**: pnpm-lock.yamlは.gitignoreに含めない
✅ **更新時は慎重に**: `pnpm update`後は変更内容を確認
✅ **コンフリクト解決**: マージ時のコンフリクトは慎重に対応
❌ **削除しない**: ロックファイルを削除してはいけない

## 🛠️ トラブルシューティング

### pnpm-lock.yamlが壊れた場合

```bash
# 1. node_modulesとロックファイルを削除
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml

# 2. 再インストール
pnpm install

# 3. 再度コミット
git add pnpm-lock.yaml
git commit -m "fix: regenerate pnpm-lock.yaml"
```

### CIでまだエラーが出る場合

1. pnpm-lock.yamlがコミットされているか確認
2. GitHubでファイルが表示されるか確認
3. ブランチが最新の状態か確認
4. キャッシュをクリアして再実行

## 📚 参考リンク

- [GitHub Actions - actions/cache@v4](https://github.com/actions/cache)
- [GitHub Actions - actions/upload-artifact@v4](https://github.com/actions/upload-artifact)
- [pnpm - Lockfile](https://pnpm.io/git#lockfiles)
- [GitHub Changelog - Deprecation of artifact actions v3](https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/)

## ✨ その他の改善点

以下も併せて実装されました：

1. **PRテンプレート**: `.github/PULL_REQUEST_TEMPLATE.md`
   - チェックリスト付き
   - 変更タイプの選択
   - ドキュメント更新の促進

2. **アーティファクト保持期間**: 30日間に設定
   - カバレッジレポートを適切な期間保持

3. **Storybookコード生成**: リアルタイム更新対応
   - Docsタブでパラメーター変更時に即座にコード更新

---

**作成日**: 2024-11-09
**状態**: ✅ 修正完了（コミット待ち）
