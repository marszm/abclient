import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";




import React, {Component} from "react";

class MyTable extends Component {
    render() {

        return (
            <div> ADDRESS BOOK USERS LIST.

                <BootstrapTable data={this.state.users}>
                    <TableHeaderColumn isKey dataField='id'/>
                    <TableHeaderColumn dataField='firstName'/>
                    <TableHeaderColumn dataField='secondName'/>
                    <TableHeaderColumn dataField='phoneNumber'/>
                    <TableHeaderColumn dataField='address'/>
                    <TableHeaderColumn dataField='email'/>
                </BootstrapTable>
                <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>
            </div>

        );
    }
}
export default MyTable;