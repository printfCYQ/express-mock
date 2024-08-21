const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()
const { port, host, prefix } = require('./utils')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function loadRoutesFromFolder(app, folderPath) {
  fs.readdirSync(folderPath).forEach(fileName => {
    const filePath = path.join(folderPath, fileName);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      loadRoutesFromFolder(app, filePath);
    } else if (fileName.endsWith('.js')) {
      const routeModule = require('./' + filePath);
      app.use(prefix, routeModule);
    }
  });
}
loadRoutesFromFolder(app, './router');

app.get(prefix + '/testGet', (req, res) => {
  res.send({
    data: {
      a: 'get'
    }
  })
})

app.post(prefix + '/testPost', (req, res) => {
  res.send({
    data: {
      a: 'psot'
    }
  })
})

app.listen(port, () => {
  console.log(`${host}:${port}`)
  console.log(`${host}:${port}/mock/testGet`)
  console.log(`${host}:${port}/mock/testPost`)
})
