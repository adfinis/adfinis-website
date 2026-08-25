import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import formsparkSubmit from "./formspark-submit"

describe("formsparkSubmit", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test("returns the response on 2xx", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 200 })),
    )
    const res = await formsparkSubmit({ type: "contact" })
    expect(res.ok).toBe(true)
    expect(console.error).not.toHaveBeenCalled()
  })

  test("logs and throws on a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("submission rejected", {
            status: 422,
            statusText: "Unprocessable Entity",
          }),
      ),
    )
    await expect(formsparkSubmit({ type: "contact" })).rejects.toMatchObject({
      message: "formspark responded with 422",
      cause: { status: 422, body: "submission rejected" },
    })
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("422"))
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("submission rejected"),
    )
  })
})
