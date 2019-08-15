import React ,{Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            users: []
        };
    }

        componentDidMount() {
            fetch('http://localhost:8080/api/read')
                .then(response => response.json())
                .then(users => this.setState({users}));
        }



        render() {
            return (
                <div> ADDRESS BOOK USERS LIST.
                    <BootstrapTable data={this.state.users}>
                        <TableHeaderColumn isKey dataField='id' />
                        <TableHeaderColumn dataField='firstName' />
                        <TableHeaderColumn dataField='secondName' />
                        <TableHeaderColumn dataField='phoneNumber' />
                        <TableHeaderColumn dataField='address' />
                        <TableHeaderColumn dataField='email' />
                    </BootstrapTable>
                    <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>
                </div>
            );

        }
}
export default App;