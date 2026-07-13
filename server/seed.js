const mongoose = require('mongoose');
const Employee = require('./models/employeeModel');

const seedEmployees = async () => {
  await Employee.deleteMany({});
  await Employee.create([
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '9876543210',
      department: 'IT',
      designation: 'Software Engineer',
      joiningDate: '2025-01-01',
      status: 'Active'
    },
    {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      mobileNumber: '9876543211',
      department: 'HR',
      designation: 'HR Manager',
      joiningDate: '2024-11-15',
      status: 'Inactive'
    }
  ]);
};

module.exports = seedEmployees;
