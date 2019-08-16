import React ,{Component} from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from 'axios';

class App extends Component {

    state = {
        users: [],
        newBookData: {
            id: '',
            firstName : '',
            secondName : '',
            phoneNumber : '',
            address : '',
            email : '',
        },
        editBookData: {
            id: '',
            firstName : '',
            secondName : '',
            phoneNumber : '',
            address : '',
            email : '',
        },
        newBookModal: false,
        editBookModal: false
      }

    componentWillMount() {
        axios.get('http://localhost:8080/api/read').then((response) => {
            this.setState({
                users: response.data
            })
        }); 
    }

    toggleNewBookModal() {
        this.setState({
          newBookModal: ! this.state.newBookModal
        });
      }

     
      addBook() {
        axios.post('http://localhost:8080/api/create', this.state.newBookData).then((response) => {
          let { users } = this.state;
    
          users.push(response.data);
    
          this.setState({ users, newBookModal: false, newBookData: {
            id: '',
            firstName : '',
            secondName : '',
            phoneNumber : '',
            address : '',
            email : '',
          }});
        });
      }
   
        render() {
            let users = this.state.users.map((user) => {
                return(
                <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button color="success" size="sm" className="mr-2">ADD</Button>
                                <Button color="danger" size="sm">EDIT</Button>
                            </td>
                        </tr>
                )
            });
            return(
                <div className="App container">
                    <h1>Address Book App</h1>

                    <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add User</Button>

                    <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new user</ModalHeader>
                        <ModalBody>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input id="id" value={this.state.newBookData.id} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.id = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">firstName</Label>
                            <Input id="firstName" value={this.state.newBookData.firstName} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.firstName = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="secondName">secondName</Label>
                            <Input id="secondName" value={this.state.newBookData.secondName} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.secondName = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">phoneNumber</Label>
                            <Input id="phoneNumber" value={this.state.newBookData.phoneNumber} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.phoneNumber = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">address</Label>
                            <Input id="address" value={this.state.newBookData.address} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.address = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">email</Label>
                            <Input id="email" value={this.state.newBookData.email} onChange={(e) => {
                            let { newBookData } = this.state;

                            newBookData.email = e.target.value;

                            this.setState({ newBookData });
                            }} />
                        </FormGroup>        
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.addBook.bind(this)}>Add User</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Table>

                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>E-mail</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        {users}
                        </tbody>

                    </Table>
                </div>
            );

        }
}
export default App;