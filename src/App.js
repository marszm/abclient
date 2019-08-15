import React ,{Component} from 'react';
class App extends Component {



    state = {
      data: [],
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/read')
        .then(response => response.json())
        .then(data => this.setState({data}));
  }

  renderTableData() {
    return this.state.data.map((user) => {
      const { id, firstName, secondName, phoneNumber, address, email } = user //destructuring
      return (
          <tr key={id}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{secondName}</td>
            <td>{phoneNumber}</td>
            <td>{address}</td>
            <td>{email}</td>
          </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.data)
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    return (
        <div>
          <h1 id='title'>LIST OF ALL ADDRESS BOOK USERS </h1>
          <table id='students'>
            <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
            </tbody>
          </table>
        </div>
    );

    }
}
export default App;