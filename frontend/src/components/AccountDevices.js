import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDevices } from '../actions/accountDevices';
import AccountDeviceRow from './AccountDeviceRow';

class AccountDevices extends Component {
  componentDidMount() {
    this.props.fetchAccountDevices();
  }

  render() {
    return (
      <div>
        <h3>Account Devices</h3>
        {
          this.props.accountDevices.devices.map(device => {
            return (
              <div key={device.id}>
                <AccountDeviceRow device={device} />
                <hr />
              </div>
            )
          })
        }
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default connect(
  ({ accountDevices }) => ({ accountDevices }),
  { fetchAccountDevices }
)(AccountDevices);