const { createServer } = require('http');

let server = createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`
    <h1>Hello!</h1>
    <p>You asked for <code>${request.url}</code></p>`);
  response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");

// const methods = Object.create(null);

// createServer((request, response) => {
//   let handler = methods[request.method] || notAllowed;
//   handler(request).catch(error => {
//     if (error.status != null) return error;
//     return {body: String(error), status: 500};
//   }).then(({body, status = 200, type = "text/plain"}) => {
//     response.writeHead(status, {"Content-Type": type});
//     if (body?.pipe) body.pipe(response);
//     else response.end(body);
//   });
// }).listen(8000);

// async function notAllowed(request) {
//   return {
//     status: 405,
//     body: `Method ${request.method} not allowed.`
//   };
// }
