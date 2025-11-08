# Enterprise Ui Playground

学習・ポートフォリオ向けのフルスタック **モノレポ構成**。  
Vue / NestJS / C# の実務に近いアーキテクチャと、テストピラミッドに則した品質戦略を実現。

---

## 🎯 目的

- 実務レベルの構成でフロント → BFF → マイクロサービス構造を構築
- きれいな設計・テスト・レイヤー分離・モック戦略を標準化
- 複数スタックでの差し替えにも対応できる拡張構造
- AI（Cursor など）でコードベースを生成/改善できる設計

---

## 🧪 テスト設計（テストピラミッド）

| 種別 | 対象 | 目的 | 実行頻度 | モック |
|---|---|---|---|---|
| **UnitTest (70%目標)** | Logic / Service / Component | 仕様の正しさを高速検証 | PRごと | Moq / vi.mock / Jest Mock |
| **IntegrationTest (25%)** | DB, 外部結合, Module連携 | 依存と連携の信頼性担保 | merge / nightly | TestContainers / MSW |
| **Api/E2E (5%以内)** | Endpoint, 実リソース | 最終保証 | 手動 or staging | 実リソース / Playwright |

---

## 🏗 アーキテクチャ概要

| レイヤー | 技術 |
|---|---|
| UI Library | **Vue 3 + Vite + TailwindCSS + Storybook (MSW)** |
| Front App | **Vue 3 + Vite + Vitest + @testing-library/vue + vi.mock** |
| BFF | **NestJS (REST) + Jest + Supertest** |
| Backend | **C# .NET 8 + Layered Architecture + CosmosDB** |
| Mapper | **Mapperly（compile-time code generation）** |

---

## 📁 推奨ディレクトリ構造

```
/ (root)
├─ README.md
├─ contracts/ (OpenAPI)
│  └─ search.yaml
├─ frontend/
│  └─ vue/
│     ├─ ui-library/
│     │  ├─ src/
│     │  │  ├─ components/ (atoms/molecules/organisms)
│     │  │  ├─ composables/
│     │  │  └─ index.ts
│     │  ├─ storybook/ (MSW)
│     │  ├─ tests/ (Vitest + @testing-library/vue)
│     │  └─ vite.config.ts
│     └─ example-app/
│        ├─ src/
│        │  ├─ pages/
│        │  ├─ components/ (container/presenter分離)
│        │  ├─ composables/ (ロジック)
│        │  └─ services/ (API client)
│        └─ tests/ (vi.mock)
├─ bff/
│  └─ nestjs-rest/
│     ├─ src/
│     │  ├─ modules/search/
│     │  ├─ clients/ (外部API抽象)
│     │  └─ main.ts
│     └─ test/ (Jest + Supertest)
└─ services/
   └─ csharp-search/
      ├─ Service1/
      │  ├─ Application/
      │  │  ├─ Models/
      │  │  ├─ Services/
      │  │  └─ Mappers/ ← **Mapperly**
      │  ├─ Domain/Models/
      │  ├─ Infrastructure/Persistence/CosmosDb/
      │  │  ├─ Repository/
      │  │  ├─ QueryService.cs
      │  │  └─ Services.cs
      │  ├─ WebApi/Controllers/
      │  └─ Tests/
      │     ├─ UnitTests/ (Moq)
      │     ├─ IntegrationTests/ (TestContainer)
      │     └─ ApiTests/ (実リソース)
```

---

## ✅ 設計ルール

### フロント（Vue）
- UI（pure）とロジック（composables）を分離
- APIは `services` 層で wrapper 化しモック可能に
- コンポーネントは **プレゼンテーショナル + コンテナ方式**
- テストは `@testing-library/vue` で UIの振る舞いを検証
- Storybook は **MSW でモック**

### BFF（NestJS）
- Controller は薄く、Service にビジネスロジックを集約
- 外部APIは `clients/` として抽象化
- Unit: Jest mock
- 結合: Nest TestingModule + Supertest

### Backend（C#）
- Layered Architecture（Application / Domain / Infra / API）
- DB は CosmosDB、クエリは Repository へ分離
- マッピングは **Mapperly**
- Unit: xUnit + Moq
- Integration: TestContainers
- API: Staging 実リソースで手動 or CI

---

## 🧩 テスト実行コマンド（例）

```sh
# frontend
pnpm --filter ui-library test
pnpm --filter example-app test

# bff
pnpm --filter nestjs-rest test

# backend
dotnet test Service1.Tests.UnitTests
dotnet test Service1.Tests.IntegrationTests --filter Category=Integration
dotnet test Service1.Tests.ApiTests --filter Category=Api
```
