const fs = require('fs');
const path = require('path');


const routingDir = (router, dir, prefix = '') => {
  fs
    .readdirSync(dir)
    .filter((file) => (file.indexOf('.') !== 0 && file !== 'index.js'))
    .forEach(file => {
      const fileDir = path.join(dir, file);
      if(fs.lstatSync(fileDir).isDirectory()){
        router = routingDir(router, fileDir, file);
      } else {
        router.use(`/${prefix}`, require(fileDir));
      }
    });
    return router
}


module.exports = {
  routingDir,
}
