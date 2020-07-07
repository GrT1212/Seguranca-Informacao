import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfo';
import { fetchDataPortability } from '../actions/account';
import { Button } from 'react-bootstrap';

class Portability extends Component {
    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    requestDataPort = () => {
        this.props.fetchDataPortability({ reqId: this.props.accountInfo.userId});
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <br />
                <br />
                <hr />
                <h2>LGPD</h2>
                <Button onClick={this.requestDataPort}>Requisitar portabilidade</Button>
            </div>
        );
    }
}


export default connect(
    ({ accountInfo }) => ({ accountInfo }),
    { fetchAccountInfo, fetchDataPortability }
  )(Portability);