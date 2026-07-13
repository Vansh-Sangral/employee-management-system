const employees = [
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

const getDashboardStats = (req, res) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  res.json({ totalEmployees, activeEmployees, inactiveEmployees });
};

module.exports = { getDashboardStats };
