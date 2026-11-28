import { readFile } from "node:fs/promises"
import { createServer } from "node:http"

const FIXTURES = new URL("./fixtures/", import.meta.url)

function fixtureName({ pathname, searchParams }) {
  const keys = [...searchParams.keys()]
  const has = (ending) => keys.some((key) => key.endsWith(ending))
  return [
    pathname.replace(/^\/+|\/+$/g, ""),
    ...keys
      .filter((key) => key.startsWith("filters[tags][slug][$in]"))
      .map((key) => searchParams.get(key))
      .sort(),
    ...(has("[date_event][$lt]") ? ["past"] : []),
    ...(has("[publication_date][$null]") ? ["undated"] : []),
  ].join(".")
}

createServer(async (request, response) => {
  const name = `${fixtureName(new URL(request.url, "http://localhost"))}.json`
  try {
    const body = await readFile(new URL(name, FIXTURES))
    response.writeHead(200, { "Content-Type": "application/json" }).end(body)
  } catch {
    console.error(`mock-strapi: no fixture ${name} for ${request.url}`)
    response.writeHead(404).end()
  }
}).listen(process.env.PORT)
