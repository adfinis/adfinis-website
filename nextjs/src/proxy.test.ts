// @vitest-environment node
import { afterEach, describe, expect, test, vi } from "vitest"
import { NextRequest } from "next/server"
import { proxy } from "./proxy"

function request(url: string, cookies: Record<string, string> = {}) {
  const req = new NextRequest(new URL(url, "https://adfinis.test"))
  for (const [name, value] of Object.entries(cookies)) {
    req.cookies.set(name, value)
  }
  return req
}

describe("proxy click id capture", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test("stores a gclid in a first-party HttpOnly cookie", async () => {
    const response = await proxy(request("/en?gclid=Cj0KCQjwTEST"))

    const cookie = response.cookies.get("aw_gclid")
    expect(cookie?.value).toBe("gclid:Cj0KCQjwTEST")
    expect(cookie?.httpOnly).toBe(true)
    expect(cookie?.secure).toBe(true)
    expect(cookie?.sameSite).toBe("lax")
    expect(cookie?.path).toBe("/")
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 90)
  })

  test("marks the cookie-setting response uncacheable", async () => {
    const response = await proxy(request("/en?gclid=Cj0KCQjwTEST"))
    expect(response.headers.get("Cache-Control")).toBe("private, no-store")
  })

  test.each([
    ["gbraid", "GB123"],
    ["wbraid", "WB456"],
  ])("stores a %s too", async (param, value) => {
    const response = await proxy(request(`/en?${param}=${value}`))
    expect(response.cookies.get("aw_gclid")?.value).toBe(`${param}:${value}`)
  })

  test("prefers the gclid when several click ids are present", async () => {
    const response = await proxy(request("/en?wbraid=WB456&gclid=GC123"))
    expect(response.cookies.get("aw_gclid")?.value).toBe("gclid:GC123")
  })

  test("overwrites an earlier click id", async () => {
    const response = await proxy(
      request("/en?gclid=NEW", { aw_gclid: "gclid:OLD" }),
    )
    expect(response.cookies.get("aw_gclid")?.value).toBe("gclid:NEW")
  })

  test("sets nothing without a click id, and leaves caching alone", async () => {
    const response = await proxy(request("/en"))
    expect(response.cookies.get("aw_gclid")).toBeUndefined()
    expect(response.headers.get("Cache-Control")).toBeNull()
  })

  test("rejects a click id with unexpected characters", async () => {
    const response = await proxy(request("/en?gclid=%3Cscript%3E"))
    expect(response.cookies.get("aw_gclid")).toBeUndefined()
  })

  test("rejects an oversized click id", async () => {
    const response = await proxy(request(`/en?gclid=${"a".repeat(513)}`))
    expect(response.cookies.get("aw_gclid")).toBeUndefined()
  })

  test("does not store a click id when consent is functional", async () => {
    const response = await proxy(
      request("/en?gclid=Cj0KCQjwTEST", { "aw-consents": "functional" }),
    )
    expect(response.cookies.get("aw_gclid")).toBeUndefined()
  })

  test("deletes a stored click id once consent is functional", async () => {
    const response = await proxy(
      request("/en", { "aw-consents": "functional", aw_gclid: "gclid:OLD" }),
    )
    expect(response.cookies.get("aw_gclid")?.value).toBe("")
    expect(response.headers.get("Cache-Control")).toBe("private, no-store")
  })

  test("stores a click id when consent is all", async () => {
    const response = await proxy(
      request("/en?gclid=Cj0KCQjwTEST", { "aw-consents": "all" }),
    )
    expect(response.cookies.get("aw_gclid")?.value).toBe("gclid:Cj0KCQjwTEST")
  })
})

describe("proxy existing behaviour", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test("still sets HSTS", async () => {
    const response = await proxy(request("/en"))
    expect(response.headers.get("Strict-Transport-Security")).toBe(
      "max-age=63072000;",
    )
  })

  // The cookie set on this 301 is host-only for the apex, so it never reaches
  // www. What carries the click id across is the query string on Location,
  // which the www request then re-runs this middleware with.
  test("still redirects to www, keeping the click id on the Location url", async () => {
    vi.stubEnv("WWW_REDIRECT", "true")
    vi.stubEnv("ABSOLUTE_URL", "https://www.adfinis.com")

    const response = await proxy(request("/en?gclid=Cj0KCQjwTEST"))

    expect(response.status).toBe(301)
    expect(response.headers.get("location")).toBe(
      "https://www.adfinis.com/en?gclid=Cj0KCQjwTEST",
    )
  })

  test("still marks a prerender bypass response uncacheable", async () => {
    const response = await proxy(request("/en", { __prerender_bypass: "1" }))
    expect(response.headers.get("Cache-Control")).toBe("private, no-store")
  })
})

describe("proxy basic auth", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  function enableBasicAuth() {
    vi.stubEnv("BASIC_AUTH_USER", "adfinis")
    vi.stubEnv("BASIC_AUTH_PASSWORD", "s3cret")
  }

  function requestWithAuth(credentials?: string) {
    const req = request("/en")
    if (credentials) {
      req.headers.set("authorization", `Basic ${btoa(credentials)}`)
    }
    return req
  }

  test("stays off when the env vars are unset", async () => {
    const response = await proxy(requestWithAuth())
    expect(response.status).not.toBe(401)
  })

  test("challenges an unauthenticated request", async () => {
    enableBasicAuth()
    const response = await proxy(requestWithAuth())

    expect(response.status).toBe(401)
    expect(response.headers.get("WWW-Authenticate")).toContain("Basic")
  })

  test("challenges wrong credentials", async () => {
    enableBasicAuth()
    const response = await proxy(requestWithAuth("adfinis:wrong"))
    expect(response.status).toBe(401)
  })

  test("challenges a malformed header instead of throwing", async () => {
    enableBasicAuth()
    const req = request("/en")
    req.headers.set("authorization", "Basic not-base64!!")

    const response = await proxy(req)
    expect(response.status).toBe(401)
  })

  test("lets the correct credentials through, colons included", async () => {
    enableBasicAuth()
    vi.stubEnv("BASIC_AUTH_PASSWORD", "s3:cret")

    const response = await proxy(requestWithAuth("adfinis:s3:cret"))
    expect(response.status).not.toBe(401)
  })
})
