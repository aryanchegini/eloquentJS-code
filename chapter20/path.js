const path = require('path');

const baseDirectory = process.cwd();

function urlPath(url) {
  let urlObject = new URL(url);
  // console.log(urlObject);

  //prevents the path given from exiting the working directory
  let resolved_path = path.resolve(decodeURIComponent(urlObject.pathname).slice(1));
  // console.log('resolved_path: ' + resolved_path);

  if (resolved_path != baseDirectory && !resolved_path.startsWith(baseDirectory + path.sep)) {
    throw {status: 403, body: "Forbidden"};
  }

  return resolved_path;
}


const url = 'http://example.com/home/user/project/message.html?name=Jean&message=Yes%3F';
const pathURL = urlPath(url);
console.log(pathURL);