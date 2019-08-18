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
            email : ''
        },
        editBookData: {
            id: '',
            firstName : '',
            secondName : '',
            phoneNumber : '',
            address : '',
            email : ''
        },
        newBookModal: false,
        editBookModal: false
      };

    componentWillMount() {
        this._refreshBooks();
    }

    _refreshBooks() {
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

    toggleEditBookModal() {
        this.setState({
            editBookModal: ! this.state.editBookModal
        });
    }
     
      addBook() {
        axios.post('http://localhost:8080/api/create', this.state.editBookData).then((response) => {
          let { users } = this.state;
    
          users.push(response.data);
    
          this.setState({ users, newBookModal: false, editBookData: {
            id: '',
            firstName : '',
            secondName : '',
            phoneNumber : '',
            address : '',
            email : ''
          }});
        });
      }

    updateBook() {
        let {  id, firstName, secondName,phoneNumber,address, email } = this.state.editBookData;

        axios.put('http://localhost:8080/api/update' , this.state.editBookData, {
            id, firstName, secondName, phoneNumber, address,email
        }).then((response) => {
            this._refreshBooks();

            this.setState({
                editBookModal: false, editBookData: {  id: '',
                    firstName : '',
                    secondName : '',
                    phoneNumber : '',
                    address : '',
                    email : '' }
            })
        });
    }

    deleteBook(id) {
        axios.delete('http://localhost:8080/api/delete/' + id).then((response) => {
            this._refreshBooks();
        });
    }

    editBook(id, firstName, secondName, phoneNumber, address, email ) {
        this.setState({
            editBookData: { id, firstName, secondName, phoneNumber, address, email}, editBookModal: ! this.state.editBookModal
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
                                <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this,
                                    user.id,
                                    user.firstName,
                                    user.secondName,
                                    user.phoneNumber,
                                    user.address,
                                    user.email)}>Edit</Button>
                                <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, user.id)}>Delete</Button>
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

                            this.setState({ newBookData});
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

                    <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
                        <ModalBody>

                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.editBookData.id} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.id = e.target.value;

                                    this.setState({ editBookData  });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">firstName</Label>
                                <Input id="firstName" value={this.state.editBookData.firstName} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.firstName = e.target.value;

                                    this.setState({  editBookData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="secondName">secondName</Label>
                                <Input id="secondName" value={this.state.editBookData.secondName} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.secondName = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phoneNumber">phoneNumber</Label>
                                <Input id="phoneNumber" value={this.state.editBookData.phoneNumber} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.phoneNumber = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">address</Label>
                                <Input id="address" value={this.state.editBookData.address} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.address = e.target.value;

                                    this.setState({  editBookData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">email</Label>
                                <Input id="email" value={this.state.editBookData.email} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.email = e.target.value;

                                    this.setState({  editBookData });
                                }} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
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