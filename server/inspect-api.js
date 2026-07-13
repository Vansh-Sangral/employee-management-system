const app = require('./server');
const http = require('http');

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/employees/dashboard`);
  console.log('status', res.status);
  console.log(await res.text());
  server.close();
});
