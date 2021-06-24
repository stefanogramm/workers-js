const base = "http://example.com"  //add the website that you want to redirect to
const statusCode = 307  // add the status code in the redirection request in this examplle my redirect is 307, you can change with any status redirect you need

async function handleRequest(request) {
  const url = new URL(request.url)

  const destinationURL = base

  return Response.redirect(destinationURL, statusCode)
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
