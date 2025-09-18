import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import FooterApp from './components/footer/footer';
import Header from './components/header/header';
import ContainerForgot from './containers/ContainerForgot';
import Signin from './components/signin/signin';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
<Router>
      <Header />
      <Layout>
        <Content style={{ margin: '16px 16px' }} className="main-container-app">
          <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/login" element={<Signin />} />
           <Route path="/forgot" element={<ContainerForgot />} />
           {/* <Route path="*" element={<ContainerSignin />} /> */}
        </Routes>
        </Content>
        <FooterApp />
      </Layout>
      
    </Router>
    </Layout>
    
  );
}

export default App;