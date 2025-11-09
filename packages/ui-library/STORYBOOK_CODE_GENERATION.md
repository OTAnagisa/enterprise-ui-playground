# Storybook Code Generation

このドキュメントは、Storybookでの動的なソースコード生成機能について説明します。

## 概要

すべてのコンポーネントストーリーは、Controlsパネルでpropsを変更すると、Show Codeで表示されるソースコードがリアルタイムで更新されます。

## 実装方法

### 1. ユーティリティ関数

`src/stories/utils/sourceCodeGenerator.ts`には以下の関数が含まれています：

- `generateSourceCode()` - argsからVue SFCコードを生成
- `createSourceParameters()` - Storybook用のパラメータオブジェクトを作成
- `createSourceCodeTransformer()` - (非推奨) 後方互換性のため残されている

### 2. 使用方法

#### 基本的な使用方法

```typescript
import { createSourceParameters } from '../../../stories/utils/sourceCodeGenerator'

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
  parameters: {
    ...createSourceParameters('Button', {
      slots: { default: 'Primary Button' },
    }),
  },
}
```

#### v-modelを使用する場合

```typescript
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'name',
    }),
  },
}
```

#### イベントハンドラーを含む場合

```typescript
export const Clickable: Story = {
  args: {
    clickable: true,
  },
  parameters: {
    ...createSourceParameters('Card', {
      slots: { default: '<p>Content</p>' },
      events: { click: 'handleClick' },
      setup: [
        `const handleClick = () => {`,
        `  console.log('Clicked!')`,
        `}`,
      ],
    }),
  },
}
```

#### 複雑なprops (配列・オブジェクト)

```typescript
export const Default: Story = {
  args: {
    columns: [...],
    data: [...],
  },
  parameters: {
    ...createSourceParameters('Table'),
  },
}
```

## 機能

### ✅ 動的コード生成
- Controlsパネルでpropsを変更すると、Show Codeのコードも自動更新
- `type: 'dynamic'`を指定することでリアクティブな更新を実現

### ✅ 自動フォーマット
- camelCaseからkebab-caseへの自動変換
- boolean propsの適切な処理
- イベントハンドラーの自動除外

### ✅ 型定義
- TableColumn など必要な型を自動インポート
- TypeScript対応のコード生成

### ✅ スクリプト順序
- `<script setup>`を`<template>`の前に配置（Vue SFCのベストプラクティス）

## トラブルシューティング

### コードが更新されない

1. Storybookを再起動してください
2. ブラウザのキャッシュをクリアしてください
3. `parameters`オブジェクトで`...createSourceParameters()`を正しく展開しているか確認してください

### イベントハンドラーが表示される

イベントハンドラー（onClick, onInput等）は自動的にフィルタリングされます。特別な設定は不要です。

### カスタムコードが必要な場合

複雑なストーリーの場合は、`parameters.docs.source.code`に直接コード文字列を指定できます：

```typescript
export const Complex: Story = {
  render: () => ({...}),
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
// Custom code here
</script>

<template>
  <!-- Custom template -->
</template>`,
      },
    },
  },
}
```

## 例

### 生成されるコードの例

**Input (Controls):**
- variant: "danger"
- disabled: true

**Output (Show Code):**
```vue
<script setup lang="ts">
import { Button } from 'ui-library'
</script>

<template>
  <Button
    variant="danger"
    disabled>
    Button Text
  </Button>
</template>
```

## 更新履歴

- 2024-11: `createSourceParameters()`追加、`type: 'dynamic'`でリアクティブ対応
- 2024-11: `<script setup>`を`<template>`の前に配置
- 2024-11: イベントハンドラーの自動フィルタリング追加
