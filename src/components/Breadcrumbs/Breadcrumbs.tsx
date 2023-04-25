import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Rating } from '../Rating';
import Container from 'react-bootstrap/Container';
import './Breadcrumbs.css';
import { useAppSelector } from '../../redux/hooks';

export const Breadcrumbs: React.FC = () => {
  const status = useAppSelector((state) => state.issues.status);
  const author = useAppSelector((state) => state.issues.author);
  const repoName = useAppSelector((state) => state.issues.repoName);

  if (status !== 'succeeded' || !author || !repoName) {
    return null;
  }

  return (
    <Container className="d-flex mt-2 p-0">
      <Breadcrumb>
        <Breadcrumb.Item href={`https://github.com/${author}`} target="_blank">
          {author}
        </Breadcrumb.Item>

        <Breadcrumb.Item
          href={`https://github.com/${author}/${repoName}`}
          target="_blank"
        >
          {repoName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Rating />
    </Container>
  );
};
