# Bun Elysia template v2

## Getting Started

Install dependencies with

```bash
bun install
```

Run dev server

```bash
bun run dev
```

Run dev server in production mode

```bash
bun run dev:prod
```

Run via docker (also runs in production mode)

```bash 
docker build -t bun-elysia-template-v2 .  
docker run -p 8080:8080 bun-elysia-template-v2
```

Testing

```bash
bun test
```

## Which include

- Postgrest and TypeORM
- Authentication and Authorization with JWT
- Swagger API documentation
- Unit test with bun:test
- Dockerfile for production

## How to use:

- Entities: Create new entities in `src/entities` folder then import them in `src/data-source.ts`
- Routes: define as an elysia plugin in `src/plugins.ts` need to chaining methods so can refer type :`app.post().get()`
- Services: Create new services in `src/services` folder then export it as a elysia decorate so it can be dependency
  injected into plugins
```typescript
//UserService.ts
class UserService{}
export default new Elysia()
  .decorate('userService', new UserService())
```
```typescript
//plugin/auth.ts
const authPlugin = new Elysia()
  .group("/auth", (group) =>
    group
      .use(userService))
     
```
- Global try catch so you don't need to wrap every function with try catch: look at `src/middlewares/errorMiddleware.ts`    
- Global response so don't need to wrap anything when return: look at `src/middlewares/responseMiddleware.ts`
- For routes that need authentication, use the `derive()` api of elysia and passed in the `isAuthenticated` middleware
```typescript
app
 .derive(isAuthenticated())
      .get("/me", async ({user}) => {})
```
- All endpoints defined under the `derive(isAuthenticated())` will require a valid JWT token to access  
- All endpoints defined below the `derive(isAdmin())` will not require jwt
- After `derive()` you can use user in request context to get the logged in user
- For testing
  - Create test as `*.test.ts` in `test` folder
  - Run test with `bun test`

Happy coding!
Created by Lilhuy - the CodingCat 🐱 - 05/22/2024
