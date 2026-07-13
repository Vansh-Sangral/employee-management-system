const mongoose = require('mongoose');
const express = require('express');
const Employee = require('../models/employeeModel');
const router = express.Router();

const memoryEmployees = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '9876543210',
    department: 'IT',
    designation: 'Software Engineer',
    joiningDate: '2025-01-01',
    status: 'Active'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobileNumber: '9876543211',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '2024-11-15',
    status: 'Inactive'
  }
];

let nextMemoryId = 3;

const useMongo = () => mongoose.connection.readyState === 1;

router.get('/dashboard', async (req, res) => {
  try {
    if (useMongo()) {
      const employees = await Employee.find();
      const totalEmployees = employees.length;
      const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
      const inactiveEmployees = totalEmployees - activeEmployees;
      return res.json({ totalEmployees, activeEmployees, inactiveEmployees });
    }

    const totalEmployees = memoryEmployees.length;
    const activeEmployees = memoryEmployees.filter((employee) => employee.status === 'Active').length;
    const inactiveEmployees = totalEmployees - activeEmployees;
    return res.json({ totalEmployees, activeEmployees, inactiveEmployees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search = '', department = '', status = '' } = req.query;

    if (useMongo()) {
      const query = {};
      if (search) {
        query.fullName = { $regex: search, $options: 'i' };
      }
      if (department) {
        query.department = department;
      }
      if (status) {
        query.status = status;
      }

      const employees = await Employee.find(query).sort({ createdAt: -1 });
      return res.json(employees);
    }

    const filteredEmployees = memoryEmployees.filter((employee) => {
      const matchesSearch = employee.fullName.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = department ? employee.department === department : true;
      const matchesStatus = status ? employee.status === status : true;
      return matchesSearch && matchesDepartment && matchesStatus;
    });

    return res.json(filteredEmployees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (useMongo()) {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.json(employee);
    }

    const employee = memoryEmployees.find((item) => item.id === Number(req.params.id));
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (useMongo()) {
      const employee = await Employee.create(req.body);
      return res.status(201).json(employee);
    }

    const employee = {
      id: nextMemoryId,
      ...req.body,
      status: req.body.status || 'Active'
    };
    memoryEmployees.push(employee);
    nextMemoryId += 1;
    return res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (useMongo()) {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.json(employee);
    }

    const index = memoryEmployees.findIndex((item) => item.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    memoryEmployees[index] = { ...memoryEmployees[index], ...req.body };
    return res.json(memoryEmployees[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (useMongo()) {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.json({ message: 'Employee deleted successfully' });
    }

    const index = memoryEmployees.findIndex((item) => item.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    memoryEmployees.splice(index, 1);
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
