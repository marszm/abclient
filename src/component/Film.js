import React ,{Component} from 'react';

class Film extends Component {

    render() {
        return (
            <div>
                <p>{this.props.info.id}
                    {this.props.info.firstName}
                    {this.props.info.secondName}
                    {this.props.info.phoneNumber}
                    {this.props.info.address}
                    {this.props.info.email}
                </p>

            </div>
        );
    }
}
export default Film;