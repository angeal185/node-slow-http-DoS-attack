const cluster = require('cluster'),
  http2 = require('http2'),
  config = require('./config');


function delay_connect(i) {
  let client = http2.connect(config.path, config.settings);
  setTimeout(function() {


    req = client.request({
      ':path': '/',
      ':method': 'post'
    });

    req.setEncoding('utf8');
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      console.log(`\n${data}`);
      process.exit();
    });

    //req.end(JSON.stringify({date: Date.now()}));

  }, config.delay)

}

if (cluster.isMaster) {

  for (let i = 0; i < config.clusters; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });

} else {

  for (let i = 0; i < config.conn; i++) {
    delay_connect(i)
  }

}
