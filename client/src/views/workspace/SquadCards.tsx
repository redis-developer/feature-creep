import { FC } from 'react';
import styled from 'styled';
import { Button, Card } from 'components';
import create from 'images/create.png';
import people from 'images/people.png';
import { useNavigate } from 'react-router';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
`;

const Inner = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 375px;
  h2, p, img {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

export const SquadCards: FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card to="/squad/create">
        <Inner>
          <h2>Create a squad</h2>
          <img alt="Create a new squad" src={create} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button onClick={() => navigate('/squad/create')} size="large" text="Create squad" variant="default" />
        </Inner>
      </Card>
      <Card disabled={true}>
        <Inner>
          <h2>Join a squad</h2>
          <img alt="Join an existing squad" src={people} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button disabled onClick={() => { }} size="large" text="Coming soon" variant="outline" />
        </Inner>
      </Card>
    </Container>
  );
};
