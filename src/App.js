import React ,{Component} from 'react';
import MyTable from './component/MyTable';
import {Button, ButtonToolbar} from "reactstrap";
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

    handleClick() {
        return <MyTable/>
    }

        render() {
            return (
                    <Button onClick={this.handleClick().bind(this)}>Read USERs</Button>
            );

        }
}
export default App;