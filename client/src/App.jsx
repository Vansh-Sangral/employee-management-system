import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const emptyForm = {
  fullName: '',
  email: '',
  mobileNumber: '',
  department: '',
  designation: '',
  joiningDate: '',
  status: 'Active'
};
const API_URL = 'https://employee-management-system-6j7p.onrender.com/api/employees';
const App = () => {
  const [stats, setStats] = useState({ totalEmployees: 0, activeEmployees: 0, inactiveEmployees: 0 });
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const fetchData = async () => {
    const [statsResponse, employeesResponse] = await Promise.all([
      axios.get('https://employee-management-system-6j7p.onrender.com/api/employees/dashboard'),
      axios.get('https://employee-management-system-6j7p.onrender.com/api/employees')
    ]);
    setStats(statsResponse.data);
    setEmployees(employeesResponse.data);
  };
  const filteredEmployees = employees.filter((employee) => {
  const matchesSearch = employee.fullName
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesDepartment =
    !departmentFilter ||
    employee.department === departmentFilter;

  const matchesStatus =
    !statusFilter ||
    employee.status === statusFilter;

  return matchesSearch && matchesDepartment && matchesStatus;
});
  useEffect(() => {
    fetchData();
  }, []);
const handleChange = (event) => {
  const { name, value } = event.target;

  setForm((current) => ({
    ...current,
    [name]: value
  }));
};
  const handleSubmit = async (event) => {
  event.preventDefault();

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(form.mobileNumber)) {
    alert("Mobile number must be exactly 10 digits");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    alert("Please enter a valid email address");
    return;
  }

  console.log("editingId:", editingId);
  console.log("form:", form);

  try {
    if (editingId) {
      await axios.put(
        `https://employee-management-system-6j7p.onrender.com/api/employees/${editingId}`,  
        form
      );
    } else {
      await axios.post(
        'https://employee-management-system-6j7p.onrender.com/api/employees',
        form
      );
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchData();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  const handleEdit = (employee) => {
    setEditingId(employee._id || employee.id);
    setForm(employee);
  };

  const handleDelete = async (id) => {
    console.log("DELETE ID:",id);
    await axios.delete(`https://employee-management-system-6j7p.onrender.com/api/employees/${id}`);
    fetchData();
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Employee Management System</h1>
          <p style={{ color: '#475569', margin: '4px 0 0' }}>Manage employees with a complete CRUD workflow.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card">
          <strong>Total Employees</strong>
          <div className="stat-value">{stats.totalEmployees}</div>
        </div>
        <div className="card">
          <strong>Active Employees</strong>
          <div className="stat-value">{stats.activeEmployees}</div>
        </div>
        <div className="card">
          <strong>Inactive Employees</strong>
          <div className="stat-value">{stats.inactiveEmployees}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full Name
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Mobile Number
              <input
  name="mobileNumber"
  value={form.mobileNumber}
  onChange={(e) => {
    const value = e.target.value;

    // only numbers allow
    if (/^\d*$/.test(value)) {
      setForm((current) => ({
        ...current,
        mobileNumber: value
      }));
    }
  }}
  maxLength="10"
  required
/>
</label>
            <label>
              Department
              <select name="department" value={form.department} onChange={handleChange} required><option value="">Select Department</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
    <option value="Sales">Sales</option>
    <option value="Operations">Operations</option>
    <option value="Customer Support">Customer Support</option>
    <option value="Engineering">Engineering</option>
    <option value="Administration">Administration</option></select> 
            </label>
            <label>
              Designation
              <input name="designation" value={form.designation} onChange={handleChange} required />
            </label>
            <label>
              Joining Date
              <input name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} required />
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <button type="submit">{editingId ? 'Update Employee' : 'Save Employee'}</button>
            {editingId ? (
              <button type="button" className="secondary" onClick={() => { setForm(emptyForm); setEditingId(null); }}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Employee List</h2>

        <div className="filters-container">
  <input
    type="text"
    placeholder="Search by Name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)}
  >
    <option value="">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              <th>Mobile</th>
               <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id || employee.id}>
                  <td>{employee.fullName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                    
                <td>{employee.designation}</td>
                  <td>{employee.joiningDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.status}</td>
                  <td>
                    <div className="actions">
                      <button type="button" onClick={() => handleEdit(employee)}>Edit</button>
                      <button type="button" className="danger" onClick={() => handleDelete(employee._id || employee.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
