import React ,{Component} from 'react';
import Film from './component/Film';
class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/read')
        .then(response => response.json())
        .then(data => this.setState({data}));
  }

  render() {
    return (
        <div>
          ADDRESS BOOK APP
          <p>{this.state.data.map(film => <Film info={film}/>)}</p>
        </div>
    );
  }
}
export default App;