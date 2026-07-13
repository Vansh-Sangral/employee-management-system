const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./server');
const { createServer } = require('node:http');

let server;
let port;

test.before(async () => {
  server = createServer(app);
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  port = address.port;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET /api/employees/dashboard returns stats', async () => {
  const response = await fetch(`http://127.0.0.1:${port}/api/employees/dashboard`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.totalEmployees, 2);
  assert.equal(body.activeEmployees, 1);
  assert.equal(body.inactiveEmployees, 1);
});

test('POST /api/employees creates a new employee', async () => {
  const response = await fetch(`http://127.0.0.1:${port}/api/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Alice Brown',
      email: 'alice@example.com',
      mobileNumber: '9999999999',
      department: 'Finance',
      designation: 'Analyst',
      joiningDate: '2026-01-01',
      status: 'Active'
    })
  });

  assert.equal(response.status, 201);
  const body = await response.json();
  assert.equal(body.fullName, 'Alice Brown');
  assert.equal(body.department, 'Finance');
});
