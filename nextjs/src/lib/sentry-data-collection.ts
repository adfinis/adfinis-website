const denyPii = { deny: ["forwarded", "-ip", "remote-", "via", "-user"] }

export const dataCollection = {
  userInfo: false,
  cookies: false,
  httpHeaders: { request: denyPii, response: denyPii },
  httpBodies: [],
  urlQueryParams: denyPii,
  genAI: { inputs: false, outputs: false },
  databaseQueryData: false,
  queues: false,
  graphQL: { document: false, variables: false },
}
