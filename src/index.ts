import {Elysia} from "elysia";
import {cors} from "@elysiajs/cors";
import {swagger} from '@elysiajs/swagger'
import {AppDataSource} from "./data-source";
import responseMiddleware from "./middlewares/responseMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import {jwt} from '@elysiajs/jwt'
import {authPlugin} from "./plugins";

AppDataSource.initialize().then(() => {
  console.log('Database connected to url ' + process.env.DATABASE_URL);
})
const jwtConfig: any = {
  name: 'jwt',
  //when run test the env is not loaded
  secret: process.env.JWT_SECRET,
  exp: '1y',
}
const app = new Elysia()
  .use(cors())
  .use(swagger(
    {
      path: '/swagger-ui',
      provider: 'swagger-ui',
      documentation: {
        info: {
          title: 'Elysia template',
          description: 'Elysia template API Documentation',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            JwtAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'Enter JWT Bearer token **_only_**'
            }
          }
        },
      },
      swaggerOptions: {
        persistAuthorization: true,
      }
    }
  ))
  .get("/", () => "Health check: Server's started!")
  .onAfterHandle(responseMiddleware)
  .onError(errorMiddleware)
  .use(jwt(jwtConfig))

  .group("/api", (group) =>
      group
        .use(authPlugin)
    //add more plugins here
  )
  .listen(process.env.PORT || 3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`🚀 Swagger UI is running at http://${app.server?.hostname}:${app.server?.port}/swagger-ui`)

export default app //export app for testing