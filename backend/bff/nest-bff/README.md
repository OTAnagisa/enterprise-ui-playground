# NestJS BFF (Backend For Frontend)

A REST API built with NestJS and TypeScript for search functionality.

## 🚀 Features

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **REST API** - `/api/search?q=` endpoint
- **Testing** - Jest unit tests + Supertest integration tests
- **CI/CD** - GitHub Actions workflow
- **Clean Architecture** - Layered structure with modules

## 📁 Project Structure

```
src/
├── modules/
│   └── search/
│       ├── search.controller.ts    # REST API endpoints
│       ├── search.service.ts       # Business logic
│       ├── search.dto.ts           # Data transfer objects
│       ├── search.module.ts        # Module definition
│       ├── search.controller.spec.ts  # Controller unit tests
│       └── search.service.spec.ts     # Service unit tests
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interceptors/
│       └── logging.interceptor.ts
├── config/
│   ├── config.module.ts
│   └── config.service.ts
├── app.module.ts
└── main.ts
test/
└── app.e2e-spec.ts                # Integration tests
```

## 🛠️ Installation

```bash
npm install
```

## 🏃 Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📡 API Endpoints

### Search

**GET** `/api/search?q={query}&limit={limit}`

Search for items based on query string.

**Query Parameters:**
- `q` (required): Search query string
- `limit` (optional): Maximum number of results

**Example Request:**
```bash
curl "http://localhost:3000/api/search?q=nest&limit=5"
```

**Example Response:**
```json
{
  "query": "nest",
  "total": 5,
  "results": [
    {
      "id": "1",
      "title": "NestJS Documentation",
      "description": "Official NestJS framework documentation",
      "url": "https://docs.nestjs.com",
      "score": 0.95
    }
  ],
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

## 🔍 Testing Strategy

Following the test pyramid principle:

- **Unit Tests** (Majority): Fast, isolated tests for services and controllers using `jest.fn()` mocking
- **Integration Tests** (Few): E2E tests with Supertest to verify API contracts
- **Coverage**: Focus on critical business logic

## 🎯 CI/CD

GitHub Actions workflow runs on every push and PR:
1. `npm ci` - Install dependencies
2. `npm run build` - Build the project
3. `npm run lint` - Check code quality
4. `npm run test` - Run unit tests
5. `npm run test:e2e` - Run integration tests

## 📝 Code Style

```bash
# lint code
npm run lint

# format code
npm run format
```

## 🏗️ Build

```bash
npm run build
```

## 📄 License

MIT
