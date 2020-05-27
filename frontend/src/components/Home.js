import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Device from './Device';
import AccountInfo from './AccountInfo';
import { logout } from '../actions/account';

class Home extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.logout} className='logout-button'>
          Log Out
        </Button>
        <h2>LGPD</h2>
        <Device />
        <hr />
        <AccountInfo />
        <hr />
        <Link to='/account-devices'>Account Devices</Link>
      </div>
    );
  }
}

export default connect(null, { logout })(Home);