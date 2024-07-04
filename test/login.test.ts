import {beforeAll, describe, expect, it} from 'bun:test'
import {app} from "../src";
import {AppDataSource} from "../src/data-source";


describe('Login API', () => {
  it('Login success', async () => {
    const userCredentials = {
      username: 'string',
      password: 'string'
    }
    const loginRequest = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials)
    })
    const response = await app.handle(loginRequest)
    const data = await response.json()
    expect(data).toHaveProperty('jwt')
    expect(data.user.username).toBe(userCredentials.username)
  })
  it('Login with wrong username', async () => {
    const loginRequest = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'not-exist',
        password: 'string'
      })
    })
    const response = await app.handle(loginRequest)
    expect(response.status).toBe(400)
    const data = await response.json()
    const message = data.message
    expect(message).toBe('User not found')
  })
})