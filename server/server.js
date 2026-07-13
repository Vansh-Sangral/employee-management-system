require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Employee Management System Server is running');
});

app.use('/api/employees', employeeRoutes);

connectDB();

if (require.main === module) {
  connectDB().then(async () => {
    const seedEmployees = require('./seed');
    await seedEmployees();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
