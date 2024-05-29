import {describe, expect, it} from 'bun:test'
import app from "../src";

describe('Health check', () => {
  it('should return Health check: Server\'s started!', async () => {
    const response = await app.handle(new Request('http://localhost/')).then((res) => res.text())
    expect(response).toBe('Health check: Server\'s started!')
  })
})