import React, { Component } from 'react';
import { 
    Container, 
    Navbar, 
    Button, 
    Form,
    Table,
    Col,
    Row,
    Alert } from 'react-bootstrap';

import './App.css';
import api from './Api';
import Auth from './Auth';

class App extends Component {
    state = {
        status_message: '',
        user_address: '',
        user_name: '',
        user_student_id: '',
        user_year: '',
        user_program: '',
        user_faculty: '',
        all_user_data: [],
        current_user: Auth.currentUser().emails[0]
    };

    componentDidMount() {
        this.getUserData();
    }

    getUserData () {
        api({
            method: 'get',
            url: '/GetData?email=' + this.state.current_user,
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            if(response.data[0])
            {
                this.setState({
                    user_address: response.data[0].address,
                    user_name: response.data[0].name,
                    user_student_id: response.data[0].student_id,
                    user_year: response.data[0].year,
                    user_program: response.data[0].program,
                    user_faculty: response.data[0].faculty,
                    status_message: 'Data about the logged in user recevied successfully .'
                });
            }
        })
        .catch((error) => {
            this.setState({status_message: 'Error getting data about logged in user.'});
        });
    };

    saveUserData() {
        api({
            method: 'put',
            url: '/SaveData?email=' + this.state.current_user,
            data: {
                address: this.state.user_address,
                name: this.state.user_name,
                student_id: this.state.user_student_id,
                year: this.state.user_year,
                program: this.state.user_program,
                faculty: this.state.user_faculty
            },
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({status_message: 'Data about the user saved successfully.'});
        })
        .catch((error) => {
            console.log(error);
            this.setState({status_message: 'Error saving data about the user.'});
        });
    }

    deleteUserData() {
        api({
            method: 'delete',
            url: '/DeleteData?email=' + this.state.current_user,
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({
                user_address: '',
                user_name: '',
                user_student_id: '',
                user_year: '',
                user_program: '',
                user_faculty: '',
                status_message: 'Data about the user deleted successfully.'
            });
        })
        .catch((error) => {
            this.setState({status_message: 'Error deleting data about the user.'});
        });
    }

    getAllUserData () {
        api({
            method: 'get',
            url: '/GetAllData',
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({
                all_user_data: response.data,
                status_message: 'Data about all users received successfully.'
            })
        })
        .catch((error) => {
            this.setState({status_message: 'Error getting data about logged in user.'});
        });
    };

    render() {
        return (
            <Container>
                <Navbar bg="dark" variant="dark" className="justify-content-between">
                    <Navbar.Brand>
                        My Profile
                    </Navbar.Brand>
                    
                    <Navbar.Text>
                        Signed in as: {this.state.current_user}
                    </Navbar.Text>
                </Navbar>

                <Form className="box">
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.current_user} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your address" value={this.state.user_address || ''} onChange={(event) => { this.setState({ user_address: event.target.value,}); }}/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your name" value={this.state.user_name || ''} onChange={(event) => { this.setState({ user_name: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Student ID
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your student id" value={this.state.user_student_id || ''} onChange={(event) => { this.setState({ user_student_id: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Year
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your year" value={this.state.user_year || ''} onChange={(event) => { this.setState({ user_year: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Program
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your program" value={this.state.user_program || ''} onChange={(event) => { this.setState({ user_program: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Faculty
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your faculty" value={this.state.user_faculty || ''} onChange={(event) => { this.setState({ user_faculty: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <div className="buttonContainer">
                        <Button variant="primary" className="buttonGap" onClick={() => this.saveUserData()}>
                            Save Data
                        </Button>
                        <Button variant="danger" className="buttonGap" onClick={() => this.deleteUserData()} >
                            Delete My Data
                        </Button>
                        <Button variant="info" onClick={() => Auth.logout()}>
                            Sign Out
                        </Button>
                    </div>
                </Form>

                <Alert variant='info'>
                    Status: {this.state.status_message}
                </Alert>
                
                <div className="box boxGap">
                    <div className="buttonContainer">
                        <Button variant="success" onClick={() => this.getAllUserData()}>
                            Get All Data
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Year</th>
                                <th>Program</th>
                                <th>Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.all_user_data.map(( listValue, index ) => {
                                    return (
                                        <tr key={index}>
                                            <td>{listValue.email}</td>
                                            <td>{listValue.name}</td>
                                            <td>{listValue.student_id}</td>
                                            <td>{listValue.year}</td>
                                            <td>{listValue.program}</td>
                                            <td>{listValue.faculty}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        )
    };
};

export default App;
