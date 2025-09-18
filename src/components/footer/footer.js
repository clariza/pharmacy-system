import React from "react";
import { Layout } from 'antd';
import ConfigSite from './../../configSite';

const { Footer } = Layout;

const FooterApp = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer>
      {ConfigSite.ENTERPRISE_NAME.PART_1} {ConfigSite.ENTERPRISE_NAME.PART_2} ©{currentYear}
    </Footer>
  );
};

export default FooterApp;