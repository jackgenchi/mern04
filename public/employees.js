const initialEmployees = [{
  id: 1,
  name: 'Zack Ruvalcaba',
  ext: 1123,
  email: 'zak@vectacorp.com',
  title: 'Chief Executive Officer',
  dateHired: new Date('2018-09-15'),
  isEmployed: true
}, {
  id: 2,
  name: 'Jack',
  ext: 1124,
  email: 'jack@vectacorp.com',
  title: 'IT Support',
  dateHired: new Date('2024-09-15'),
  isEmployed: false
}];
// const sampleEmployee = {
//     name: 'Holly Unlikely',
//     ext: 1126,
//     email: 'holly@vectacorp.com',
//     title: 'Director of Marketing',
//     dateHired: new Date('2019-03-04'),
//     isEmployed: true,
// }
class EmployeeFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placheholder for the employee filter");
  }
}
function EmployeeTable(props) {
  // looping over state variable
  const employeeRows = props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
    key: employee.id,
    employee: employee
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Extension"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Date Hired"), /*#__PURE__*/React.createElement("th", null, "Currently Employed"))), /*#__PURE__*/React.createElement("tbody", null, employeeRows));
}
function EmployeeRow(props) {
  const employee = props.employee;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, employee.id), /*#__PURE__*/React.createElement("td", null, employee.name), /*#__PURE__*/React.createElement("td", null, employee.ext), /*#__PURE__*/React.createElement("td", null, employee.email), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.dateHired.toDateString()), /*#__PURE__*/React.createElement("td", null, employee.isEmployed ? 'Yes' : 'No'));
}
class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.props.createEmployee(sampleEmployee)
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      name: form.name.value,
      ext: form.ext.value,
      email: form.email.value,
      title: form.title.value,
      dateHired: new Date(),
      isEmployed: true
    };
    this.props.createEmployee(employee);
    form.name.value = '';
    form.ext.value = '';
    form.email.value = '';
    form.title.value = '';
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeAdd",
      onSubmit: this.handleSubmit
    }, "Name: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name"
    }), /*#__PURE__*/React.createElement("br", null), "Extension: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "ext"
    }), /*#__PURE__*/React.createElement("br", null), "Email: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "email"
    }), /*#__PURE__*/React.createElement("br", null), "Title: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", null, "Add here"));
  }
}

//Module 02-03 https://www.youtube.com/watch?v=PqN-ruBuSFY
class EmployeeList extends React.Component {
  // creates class component
  // must have a render function
  // global employees variable contained in the state
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.createEmployee = this.createEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    setTimeout(() => {
      this.setState({
        employees: initialEmployees
      });
    }, 500);
  }
  createEmployee(employee) {
    employee.id = this.state.employees.length + 1;
    const newEmployeeList = this.state.employees.slice();
    newEmployeeList.push(employee);
    this.setState({
      employees: newEmployeeList
    });
  }
  render() {
    //return (<div>This is a placheholder for the employee list</div>)
    // employee list gathers up three other components and renders them 
    // prefers that multiple elements
    console.log("returned employee list");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Employee Management Application"), /*#__PURE__*/React.createElement(EmployeeFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeAdd, {
      createEmployee: this.createEmployee
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(EmployeeList, null)), document.getElementById('content'));