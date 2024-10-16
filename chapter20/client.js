fetch("http://localhost:8000/sjkls/", {
  method: "POST",
  body: "Hello server"
}).then(resp => resp.text()).then(console.log);
// → HELLO SERVER