import React from "react"
import EmployeeFilter from "./EmployeeFilter.jsx"
import EmployeeAdd from "./employeeAdd.jsx"


function EmployeeTable (props){
        // looping over state variable
        const employeeRows = props.employees.map(employee => 
            <EmployeeRow 
                key={employee._id} 
                employee={employee}
                deleteEmployee={props.deleteEmployee}/>
        )
        
        return (
        <table className = "bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employeeRows}
            </tbody>
        </table>
        )
}

function EmployeeRow (props){
        function onDeleteClick(){
            props.deleteEmployee(props.employee._id)
        }
        return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
            <td><button onClick={onDeleteClick}>DELETE</button></td>
        </tr>
        )
}

export default class EmployeeList extends React.Component { // creates class component
    // must have a render function
    // global employees variable contained in the state
    constructor(){
        super()
        this.state = {employees: []}
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        fetch('/api/employees') // api call
        .then(response=> response.json()) //get data and store as json
        .then(data => { //iterate
            //console.log(`data: ${data}`)
            //console.log('Total count of employees: ', data.count)
            data.employees.forEach(employee => {
                employee.dateHired = new Date(employee.dateHired) //convert string date into int date using date function
            })
            this.setState({ employees: data.employees })//store into state
        })
        .catch (err => console.log(err))
    }

    createEmployee(employee){
        fetch('/api/employees',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(newEmployee => { // append new employee to existing employee
            newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
            //concat list of old employees + new employee
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({employees: newEmployees})
            console.log('Total count of employees: ',newEmployees.length)
        })
        .catch(err => {console.log(err)})        
    }

    deleteEmployee(id) {
        fetch(`/api/employees/${id}`,{
            method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    console.log('Failed to delete employee.')
                } else {
                    this.loadData()
                }
            })
    }
    render(){
        return(
            <React.Fragment>
                    <h1>Employee Management Application</h1>
                    <EmployeeFilter/>
                    <hr />
                    <EmployeeTable employees = {this.state.employees} deleteEmployee={this.deleteEmployee}/>
                    <hr />
                    <EmployeeAdd createEmployee={this.createEmployee}/>         
            </React.Fragment>
        )
    }
}