import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchDevice } from '../actions/device';
import fetchStates from '../reducers/fetchStates';
import { dev_ico } from '../assets/dev_ico.png';

class Device extends Component {
  get DeviceView() {
    const { device } = this.props;

    if (device.status === fetchStates.error) return <span>{device.message}</span>;

    return <img src={dev_ico} />;
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.fetchDevice}>New Device</Button>
        <br />
        { this.DeviceView }
      </div>
    )
  }
}

export default connect(
  ({ device }) => ({ device }),
  { fetchDevice }
)(Device);