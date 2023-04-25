import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import Container from 'react-bootstrap/Container';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Content } from './components/Content/Content';

export const App: React.FC = () => {
  return (
    <Container className="vh-100 d-flex flex-column">
      <Header />

      <Breadcrumbs />

      <Content />
    </Container>
  );
};
