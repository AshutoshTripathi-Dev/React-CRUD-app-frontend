import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {

    constructor(props){

        super(props)

        this.state = {
            id: this.props.match.params.id, //This is for implementing update functionality
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
    }

    componentDidMount(){
        if(this.state.id == -1){
            return
        }else{
            StudentService.getStudentById(this.state.id).then((res) =>{
                let student =  res.data;
                this.setState({
                    firstName:student.firstName,
                    lastName:student.lastName,
                    emailId:student.emailId
                });
             });
        }
    }

    changeFirstNameHandler(event){
        this.setState({firstName : event.target.value});
    }

    changeLastNameHandler(event){
        this.setState({lastName : event.target.value});
    }

    changeEmailIdHandler(event){
        this.setState({emailId : event.target.value});
    }

    saveStudent = (e) => {
        e.preventDefault();
        let student = {firstName: this.state.firstName, lastName: this.state.lastName,emailId: this.state.emailId};
        console.log('student =>' +JSON.stringify(student));

        if(this.state.id == -1){
            StudentService.createStudents(student).then(res => {
                this.props.history.push("/students");
            });
        }else{
            StudentService.updateStudent(student,this.state.id).then( res =>{
                this.props.history.push("/students");
            });
        }


    }

    cancel(){
        this.props.history.push('/students');
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className = "text-center">Add Student</h3>
        }else{
            return <h3 className = "text-center">Update Student</h3>
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>First Name: </label>
                                        <input placeholder = "First Name" name="firstName" className = "form-control"
                                        value = {this.state.firstName} onChange = {this.changeFirstNameHandler}></input>
                                    </div>
                                    <div className = "form-group">
                                        <label>Last Name: </label>
                                        <input placeholder = "Last Name" name="lastName" className = "form-control"
                                        value = {this.state.lastName} onChange = {this.changeLastNameHandler}></input>
                                    </div>
                                    <div className = "form-group">
                                        <label>Email Id: </label>
                                        <input placeholder = "Email Id" name="emailId" className = "form-control"
                                        value = {this.state.emailId} onChange = {this.changeEmailIdHandler}></input>
                                    </div>

                                    <button className = "btn btn-success" onClick = {this.saveStudent}>Save</button>
                                    <button className = "btn btn-danger" onClick = {this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateStudentComponent;