import React, { Component } from "react";
import { Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import ConfigSite from './../../configSite';

const { SubMenu } = Menu;

class HeaderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCounter: 0,
      loading: false,
      notifications: []
    };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.response, prevProps.response)) {
      this.updateNotifications(this.props.response);
    }
  }

  updateNotifications = (response) => {
    if (response && response.status && response.status === 500) {
      this.setState({
        notificationCounter: this.state.notificationCounter + 1,
        notifications: [...this.state.notifications, response.message]
      });
    }
  };

  handleMenuClick = e => {
    switch (e.key) {
      case 'clear':
        this.setState({
          notificationCounter: 0,
          notifications: []
        });
        break;
      case 'logout':
        this.showLogoutConfirm(this.props.onLogout);
        break;
      case 'settings':
        break;
      case 'profile':
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            <label className="title">{ConfigSite.ENTERPRISE_NAME.PART_1}</label>
            <label className="subtitle">{ConfigSite.ENTERPRISE_NAME.PART_2}</label>
          </div>
        </Link>
        <Menu 
          theme="dark"
          mode="horizontal"
          onClick={this.handleMenuClick}
          className="header-menu"
        >
          <SubMenu 
            key="language"
            title={<span><GlobalOutlined /></span>}
          >
            {/* <Menu.Item key="spanish">Spanish</Menu.Item>
            <Menu.Item key="english">English</Menu.Item> */}
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default HeaderApp;