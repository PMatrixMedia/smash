import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { EventTile } from "./../../component/eventTile";
import styles from "./styles.module.scss";

const OWNER_TOURNAMENTS = gql`
  query TournamentsByOwner($perPage: Int!, $ownerId: ID!) {
    tournaments(query: { perPage: $perPage, filter: { ownerId: $ownerId } }) {
      nodes {
        id
        name
        tournamentType
        slug
        images {
          url
        }
        startAt
      }
    }
  }
`;

export const Events = () => {
  const { push } = useHistory();
  const { loading, error, data } = useQuery(OWNER_TOURNAMENTS, {
    variables: { ownerId: 161429, perPage: 8 },
  });

  if (loading)
    return (
      <Container>
        <div className={styles.loadingContainer}>
          <Spinner animation="grow" />
          <p>Fetching tournaments...</p>
        </div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className={styles.loadingContainer}>
          <p style={{ color: "red" }}>Fetching tournaments Failed</p>
        </div>
      </Container>
    );
  const handleTileClick = (id, slug) => {
    push({ pathname: `eventDetails/${id}`, state: { slug } });
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Tournaments</p>
        <p className={styles.bred}>Home / Tournaments</p>
      </div>
      <Row>
        {data?.tournaments?.nodes?.map((item, idx) => {
          const { id, slug } = item || {};
          return (
            <Col sm={12} md={3} key={idx} className={styles.eventCol}>
              <EventTile
                {...item}
                key={idx}
                handleClick={() => handleTileClick(id, slug)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
