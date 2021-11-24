const fs = require('fs')

fs.writeFile('solkey.key', 'abc', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
