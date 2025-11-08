# Enterprise Ui Playground

学習／ポートフォリオ向けの**フルスタック・モノレポ**。  
フロント（UIライブラリ + 検索アプリ）→BFF→マイクロサービスのアーキテクチャを実務寄りに再現します。  
将来は別技術での複数実装も可能な拡張構造。

---

## ✅ 初回実装スタック

| レイヤー | 技術 |
|---|---|
| UI Library | Vue 3 + Vite + TailwindCSS + Storybook (MSW) |
| Example App | Vue 3 + Vite + Vitest + `vi.mock` |
| BFF | NestJS (REST) + Jest / Supertest |
| Backend | C# .NET 8 レイヤードアーキテクチャ |
| DB | Azure Cosmos DB |
| Mapper | **Mapperly** (コンパイル時コード生成) |
| Test | Vitest / vue-testing-library / Jest / xUnit |
| Mock | Storybook → MSW / Vitest → vi mock |

---

## 📁 ディレクトリ構造

```

/ (repo root)
├─ README.md
├─ .github/workflows/ci.yml
├─ docker-compose.yml
├─ .env.example
├─ contracts/
│  └─ openapi/search.yaml
├─ tools/
│  ├─ start.sh
│  └─ gen-client.sh
├─ frontend/
│  ├─ vue/
│  │  ├─ ui-library/
│  │  │  ├─ src/components/
│  │  │  ├─ storybook/ (MSW設定含む)
│  │  │  ├─ test/ (vue-testing-library)
│  │  │  └─ package.json
│  │  └─ example-app/
│  │     ├─ src/pages/SearchPage.vue
│  │     ├─ test/ (Vitest + vi mock)
│  │     └─ package.json
│  ├─ react/  (optional)
│  └─ svelte/ (optional)
├─ bff/
│  └─ nestjs-rest/
│      ├─ src/
│      │  ├─ modules/search/
│      │  ├─ clients/
│      │  └─ main.ts
│      ├─ test/ (Jest + Supertest)
│      └─ package.json
├─ services/
│  └─ csharp-search/
│      ├─ Service1.sln
│      ├─ Service1/
│      │  ├─ Application/
│      │  │  ├─ Models/
│      │  │  ├─ Services/
│      │  │  └─ Mappers/          ← ✅ Mapperly Mapper here
│      │  ├─ Domain/Models/
│      │  ├─ Infrastructure/Persistence/
│      │  │  ├─ Common/
│      │  │  └─ CosmosDb/
│      │  │      ├─ Models/
│      │  │      ├─ Repository/
│      │  │      ├─ QueryService.cs
│      │  │      └─ Services.cs
│      │  ├─ WebApi/
│      │  │  ├─ Configuration/
│      │  │  ├─ Controllers/
│      │  │  └─ Dockerfile
│      │  └─ Tests/ (xUnit)
├─ mcp-server/ (optional)
├─ infra/
└─ docs/

````

---

## ⚙️ 開発セットアップ

### 🔹 1. Install
```bash
# UI Library
cd frontend/vue/ui-library && pnpm i

# Example App
cd ../example-app && pnpm i

# BFF
cd ../../../bff/nestjs-rest && pnpm i
````

### 🔹 2. 起動

```bash
# Storybook（MSW有効）
pnpm --filter ui-library storybook

# Example App
pnpm --filter example-app dev

# BFF (Nest)
pnpm --filter nestjs-rest start:dev

# C# API
cd services/csharp-search/Service1/WebApi
dotnet run
```

---

## 🧪 テスト方針

| 対象          | テスト / モック                     |
| ----------- | ----------------------------- |
| UI Library  | Vitest + @testing-library/vue |
| Storybook   | MSW で API モック                 |
| Example App | Vitest + `vi.mock`            |
| BFF         | Jest + Supertest              |
| Backend C#  | xUnit (Unit / Integration)    |

---

## 🧠 Mapperly 設定（Backend）

### 📌 Package

```bash
dotnet add package Riok.Mapperly
```

### 📌 csproj

```xml
<ItemGroup>
  <PackageReference Include="Riok.Mapperly" Version="4.3.0" ExcludeAssets="runtime" PrivateAssets="all" />
</ItemGroup>

<!-- 生成コードを確認したい時 -->
<!--
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
  <CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
-->
```

### 📌 Mapper 定義

```csharp
[Mapper]
public partial class SearchItemMapper
{
    public partial SearchItemDto ToDto(SearchItem entity);
    public partial SearchItem FromDto(SearchItemDto dto);
}
```

---

## 🚀 初回実装ロードマップ

1. ✅ Vue UI Library（土台 + Storybook + MSW + テスト）
2. ✅ Example Search App（UI Library使用 + vi.mockテスト）
3. ✅ BFF（NestJS REST + Jestテスト）
4. ✅ C# API（CosmosDB + Mapperly + xUnit）
5. ✅ E2Eで「検索 → BFF → C# → Cosmos」導通
6. ⬜ OpenAPI から TS Client 生成
7. ⬜ Docker compose で一発起動
8. ⬜ MCP server 追加
