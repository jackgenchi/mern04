
const initialEmployees = [
    {
        id: 1,
        name: 'Zack Ruvalcaba',
        ext: 1123,
        email: 'zak@vectacorp.com',
        title: 'Chief Executive Officer',
        dateHired: new Date('2018-09-15'),
        isEmployed: true,
    },
    {
        id: 2,
        name: 'Jack',
        ext: 1124,
        email: 'jack@vectacorp.com',
        title: 'IT Support',
        dateHired: new Date('2024-09-15'),
        isEmployed: false,
    }
]
// const sampleEmployee = {
//     name: 'Holly Unlikely',
//     ext: 1126,
//     email: 'holly@vectacorp.com',
//     title: 'Director of Marketing',
//     dateHired: new Date('2019-03-04'),
//     isEmployed: true,
// }
class EmployeeFilter extends React.Component {
    render(){
        return (<div>This is a placheholder for the employee filter</div>)
    }
}


function EmployeeTable (props){
        // looping over state variable
        const employeeRows = props.employees.map(employee => 
            <EmployeeRow key={employee.id} employee={employee}/>
        )
        
        return (
        <table className = "bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed</th>
                </tr>
            </thead>
            <tbody>
                {employeeRows}
            </tbody>
        </table>
        )
}

function EmployeeRow (props){
        const employee = props.employee
        return (
        <tr>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.ext}</td>
            <td>{employee.email}</td>
            <td>{employee.title}</td>
            <td>{employee.dateHired.toDateString()}</td>
            <td>{employee.isEmployed ? 'Yes' : 'No'}</td>
        </tr>
        )
}


class EmployeeAdd extends React.Component {
    constructor(){
        super()        
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.props.createEmployee(sampleEmployee)
    }
    
    handleSubmit(e){
        e.preventDefault()
        const form = document.forms.employeeAdd
        const employee = {
            name: form.name.value,
            ext: form.ext.value,
            email: form.email.value,
            title: form.title.value,
            dateHired: new Date(),
            isEmployed: true,
        }
        this.props.createEmployee(employee)
        form.name.value = ''
        form.ext.value = ''
        form.email.value = ''
        form.title.value = ''
    }
    render(){
        return (
            <form name="employeeAdd" onSubmit={this.handleSubmit}>
                Name: <input type="text" name = "name" /><br/>
                Extension: <input type="text" name = "ext" /><br/>
                Email: <input type="text" name = "email" /><br/>
                Title: <input type="text" name = "title" /><br/>
                <button>Add here</button>
            </form>
        )
    }
}

//Module 02-03 https://www.youtube.com/watch?v=PqN-ruBuSFY
class EmployeeList extends React.Component { // creates class component
    // must have a render function
    // global employees variable contained in the state
    constructor(){
        super()
        this.state = {employees: []}
        this.createEmployee = this.createEmployee.bind(this)
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        setTimeout(()=>{
            this.setState({employees: initialEmployees})
        }, 500)
    }
    createEmployee(employee){
        employee.id=this.state.employees.length + 1
        const newEmployeeList = this.state.employees.slice()
        newEmployeeList.push(employee)
        this.setState({employees: newEmployeeList})
    }
    render(){
        //return (<div>This is a placheholder for the employee list</div>)
        // employee list gathers up three other components and renders them 
        // prefers that multiple elements
        console.log("returned employee list")
        return(
            <React.Fragment>
                    <h1>Employee Management Application</h1>
                    <EmployeeFilter/>
                    <hr />
                    <EmployeeTable employees = {this.state.employees}/>
                    <hr />
                    <EmployeeAdd createEmployee={this.createEmployee}/>         
            </React.Fragment>
            
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <EmployeeList />
    </React.StrictMode>,
    document.getElementById('content')
)