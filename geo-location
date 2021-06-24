addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

    let newResponse = await fetch(request)
    let subrequest = new Request(newResponse, request)

// Get the cf-ray
    subrequest.headers.set("subrequest-ray", newResponse.headers.get("cf-ray"))

    const requestHeaders = JSON.stringify(Object.fromEntries(subrequest.headers), null, 2)
    const responseHeaders = JSON.stringify(Object.fromEntries(newResponse.headers), null, 2)

//Paint your headers
    let html_style = "body {padding:1em; font-family: sans-serif;} h1 {color:#000000} h2 {color:#000000}"
    
    let list = ''

    let html_content = [
        `IP: ${request.headers.get('cf-connecting-ip')}`, // Get the "cf-connecting-ip" and other useful details like asn long and lat
        `ASN: ${request.cf.asn}`,
        `Colo: ${request.cf.colo}`,
        `Country: ${request.cf.country}`,
        `City: ${request.cf.city}`,
        `Continent: ${request.cf.continent}`,
        `Latitude: ${request.cf.latitude}`,
        `Longitude: ${request.cf.longitude}`,
        `Postal Code: ${request.cf.postalCode}`,
        `Metro Code: ${request.cf.metroCode}`,
        `Region: ${request.cf.region}`,
        `Region Code: ${request.cf.regionCode}`,
        `Time-zone: ${request.cf.timezone}`,
        `Device: ${request.headers.get("cf-device-type")}`
    ]

//give some space to your doc
    html_content.forEach(function (param) {
        list += `<ul>${param}</ul>`
    })

//print it on the page and 'call' your elements
    let html = 
        `<!DOCTYPE html>
        <body>  
            <head>
            <title> Cloudflare Workers script testing </title>
            <style> ${html_style} </style>  
            </head>
    
        <h1> Cloudflare Workers script with GeoLocation Data. </h1>  
            <p>Get Cloudflare Request and Response Headers.</p>  
                <ul>${list}</ul>
        <h2>Request Headers</h2>
            <pre>${requestHeaders}</pre>
        <h2>Response Headers</h2>
            <pre>${responseHeaders}</pre>
        </body>`

    let response = new Response(html, subrequest.body)
    response.headers.set("cf-edge-cache", "no-cache")
    response.headers.set("content-type", "text/html;charset=UTF-8")
    return response
}
