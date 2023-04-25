import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import starLogo from '../../assets/star.svg';
import { useAppSelector } from '../../redux/hooks';
import { formatNumber } from '../../utils/utils';

export const Rating: React.FC = () => {
  const repoStars = useAppSelector((state) => state.issues.repoStars);

  const stars = formatNumber(repoStars);

  return (
    <Container className="w-auto d-flex align-items-center m-0 p-0">
      <Image src={starLogo} alt="star logo" className="mx-2" />

      <Badge>{`${stars} ${repoStars === 1 ? 'star' : 'stars'}`}</Badge>
    </Container>
  );
};
