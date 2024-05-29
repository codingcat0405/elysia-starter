import {Elysia, t} from 'elysia'
import {userService} from "../services";
import isAuthenticated from "../middlewares/isAuthenticated";

const authPlugin = new Elysia()
  .group("/auth", (group) =>
    group
      .use(userService)
      .post("/register", async ({userService, body}) => {
        return await userService.register(body)
      }, {
        detail: {
          tags: ['auth'],
        },
        body: t.Object({
          username: t.String(),
          password: t.String()
        })
      })
      .post("/login", async ({userService, body, jwt}: any) => {
        return await userService.login(body, jwt);
      }, {
        detail: {
          tags: ['auth'],
        },
        body: t.Object({
          username: t.String(),
          password: t.String()
        })
      })
      .derive(isAuthenticated())
      .get("/me", async ({user}) => {
        const {password, ...result} = user;
        return result;
      }, {
        detail: {
          tags: ['auth'],
          security: [
            {JwtAuth: []}
          ],
        }
      })
  )

export default authPlugin