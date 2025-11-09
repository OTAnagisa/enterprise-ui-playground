# Storybookでのリアルタイムコード更新

## 概要

Storybookのコントロールでパラメーターを変更すると、Show Codeに表示されるソースコードがリアルタイムで更新されます。

## 使い方

### 1. Docsタブで確認する

**重要**: リアルタイム更新を確認するには、**Docsタブ**を使用してください。

1. Storybookを起動: `pnpm storybook`
2. 左サイドバーでコンポーネント（例: Button）を選択
3. **上部の「Docs」タブをクリック**（Canvasタブではなく）
4. ストーリーの下にある「Show Code」をクリック
5. Controlsパネルでパラメーター（例: variant）を変更
6. **コードが即座に更新される**ことを確認 ✅

### 2. Canvasビューでの確認

Canvasビューでは、コードはAddonパネル（下部）の「Code」タブに表示されます。
ただし、Docsタブの方がリアルタイム更新がよりスムーズです。

## 実装の仕組み

### 1. グローバル設定 (`.storybook/preview.ts`)

```typescript
const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: 'dynamic',  // 動的コード生成を有効化
        state: 'open',    // デフォルトでコードを展開
      },
    },
  },
}
```

### 2. ストーリーレベルの設定

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  parameters: {
    ...createSourceParameters('Button', {
      slots: { default: 'Primary Button' },
    }),
  },
}
```

### 3. ソースコード生成関数

`createSourceParameters()`は以下を行います：

1. `type: 'dynamic'`を設定してリアルタイム更新を有効化
2. `transform`関数で毎回新しいコードを生成
3. `storyContext.args`から現在の値を取得

```typescript
export function createSourceParameters(componentName, options) {
  return {
    docs: {
      source: {
        type: 'dynamic',
        transform: (code, storyContext) => {
          return generateSourceCode({
            componentName,
            args: storyContext.args,  // 現在の値を使用
            ...options,
          })
        },
      },
    },
  }
}
```

## テスト手順

### ✅ 正しい手順

1. Storybookを起動: `pnpm storybook`
2. Buttonコンポーネントを選択
3. **「Docs」タブをクリック**
4. 「Primary」ストーリーの「Show Code」をクリック
5. Controlsパネルで`variant`を`danger`に変更
6. **コードが即座に`variant="danger"`に更新される** ✅

### ❌ よくある間違い

- ❌ Canvasタブでテストしている
- ❌ Show Codeをクリックしていない
- ❌ ブラウザのキャッシュが古い

## トラブルシューティング

### コードが更新されない場合

1. **Docsタブを使用していますか？**
   - Canvasタブではなく、Docsタブで確認してください

2. **Storybookを再起動**
   ```bash
   # Ctrl+C で停止
   pnpm storybook
   ```

3. **ブラウザのキャッシュをクリア**
   - 開発者ツール（F12）を開く
   - Networkタブで「Disable cache」をチェック
   - ページをリロード（Ctrl+Shift+R）

4. **node_modulesを再インストール**
   ```bash
   pnpm install --force
   ```

### 確認ポイント

✅ `.storybook/preview.ts`に`docs.source.type: 'dynamic'`が設定されている
✅ 各ストーリーで`createSourceParameters()`を使用している
✅ Docsタブで確認している
✅ Show Codeをクリックしてコードを表示している

## 動作例

### 初期状態
```vue
<script setup lang="ts">
import { Button } from 'ui-library'
</script>

<template>
  <Button variant="primary">
    Primary Button
  </Button>
</template>
```

### variant を "danger" に変更後（リアルタイム更新）
```vue
<script setup lang="ts">
import { Button } from 'ui-library'
</script>

<template>
  <Button variant="danger">
    Primary Button
  </Button>
</template>
```

### disabled を true に追加後（リアルタイム更新）
```vue
<script setup lang="ts">
import { Button } from 'ui-library'
</script>

<template>
  <Button
    variant="danger"
    disabled>
    Primary Button
  </Button>
</template>
```

## まとめ

- ✅ **Docsタブ**でリアルタイム更新が確認できる
- ✅ Controlsでパラメーターを変更すると**即座に**コードが更新される
- ✅ `type: 'dynamic'`と`transform`関数がリアルタイム更新を実現
- ✅ すべてのコンポーネント（Button, TextField, DateInput, Card, Calendar, Table）で動作

## 参考

- [Storybook Docs - Source Code](https://storybook.js.org/docs/vue/writing-docs/doc-block-source)
- `STORYBOOK_CODE_GENERATION.md` - コード生成の詳細
