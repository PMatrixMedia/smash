import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";

import { Header } from "./../../component/header";
import { WebViewModal } from "./../../component/modal";
import styles from "./styles.module.scss";

const TOURNAMENT_DETAILS = gql`
  query TournamentQuery($slug: String, $sort: String) {
    tournament(slug: $slug) {
      id
      name
      slug
      endAt
      startAt
      isRegistrationOpen
      numAttendees
      images {
        url
      }
      participants(query: { sortBy: $sort }) {
        pageInfo {
          totalPages
          total
        }
        nodes {
          gamerTag

          user {
            name
            images {
              url
            }
          }
        }
      }
      events {
        id
        name
        slug
        phases {
          id
          phaseGroups {
            nodes {
              id
            }
          }
        }
      }
    }
  }
`;

export const EventDetails = () => {
  const [show, setShow] = useState(false);
  const [showLoadmore, setShowLoadmore] = useState(false);
  const [url, setUrl] = useState("");
  const [participants, setParticipants] = useState([]);
  const { state } = useLocation();
  const { push } = useHistory();

  const { loading, error, data } = useQuery(TOURNAMENT_DETAILS, {
    variables: { slug: state.slug, sort: "name" },
  });

  const styles2 = {
     yellowButton: {
        backgroundColor:'#FFC72C',
        color: 'black',
        borderColor: '#133875'
     },
     navyButton: {
        backgroundColor:'#133875',
        color: 'white'
     }
  }

  useEffect(() => {
    if (data?.tournament?.numAttendees > 12) {
      setShowLoadmore(true);
      setParticipants(
        data?.tournament?.participants?.nodes?.slice(0, 12) || []
      );
    } else {
      setShowLoadmore(false);

      setParticipants(data?.tournament?.participants?.nodes || []);
    }
  }, [data?.tournament]);

  const handleLoadmore = () => {
    setParticipants(data?.tournament?.participants?.nodes || []);
    setShowLoadmore(false);
  };

  const convertDate = (timestamp) => {
    return new Date(timestamp * 1000).toDateString();
  };
  let startDate = convertDate(data?.tournament?.startAt);
  let endDate = convertDate(data?.tournament?.endAt);
  if (loading)
    return (
      <Container>
        <div className={styles.loadingContainer}>
          <Spinner animation="grow" />
          <p>Fetching tournament details...</p>
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

  return (
    <Container className={styles.container}>
      <div className={styles.mainContainer}>
        <Header/>
      </div>
      <p className={styles.title}>{data?.tournament?.name}</p>
      <div
        className={styles.banner}
        style={
          data?.tournament?.images.length
            ? { backgroundImage: `url(${data?.tournament?.images[1]?.url})` }
            : { backgroundColor: "gray" }
        }
      />
      <p className={styles.description}></p>
      <div className={styles.datesContainer}>
        <p>
          <strong>Start At</strong>
        </p>
        <p>
          <strong>{startDate}</strong>
        </p>
      </div>
      <div className={styles.datesContainer}>
        <p>
          <strong>End At</strong>
        </p>
        <p>
          <strong>{endDate}</strong>
        </p>
      </div>
      <p>After this date, the event will be archived</p>
      <div className={styles.attendees}>
        <h3>Attendees</h3>
        <Row>
          {participants.map((item, index) => {
            let userImages = item?.user?.images;
            return (
              <Col md="4" sm="6" xs="6" className={styles.avatar} key={index}>
                <img
                  src={
                    userImages?.length
                      ? userImages[0]?.url
                      : "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                  }
                  rounded
                />
                <div>
                  <p><strong>{item?.gamerTag}</strong></p>
                  <p><i>{item?.user?.name}</i></p>
                </div>
              </Col>
            );
          })}
        </Row>
        {showLoadmore && (
          <div className={styles.loadmoreContainer}>
            <Button
              style={styles2.yellowButton}
              onClick={handleLoadmore}
            >{`View all ${data?.tournament?.numAttendees} Attendees`}</Button>
          </div>
        )}
      </div>
      <div className={styles.linksContainer}>
        <Button onClick={() => push("/")} style={styles2.yellowButton}>Go back</Button>
        {!data?.tournament?.isRegistrationOpen && (
          <Button
            style={styles2.navyButton}
            onClick={() => {
              setUrl(
                `https://smash.gg/${data?.tournament?.slug}/register/embed`
              );
              setShow(true);
            }}
          >
            Register
          </Button>
        )}
        <Button style={styles2.navyButton}>
          <a
            target="_blank"
            // href={`https://smash.gg/${data?.tournament?.events[0].slug}/brackets/${data?.tournament?.events[0]?.phases[0]?.id}/${data?.tournament?.events[0]?.phases[0]?.phaseGroups?.nodes[0]?.id}/`}
            href="https://sulctwitchlivestreamcode.z19.web.core.windows.net/"
          >
            View Live Event
          </a>
        </Button>
        <Button style={styles2.navyButton}>
          <a
            target="_blank"
            href={`https://smash.gg/${data?.tournament?.events[0].slug}/brackets/${data?.tournament?.events[0]?.phases[0]?.id}/${data?.tournament?.events[0]?.phases[0]?.phaseGroups?.nodes[0]?.id}/`}
          >
            Brackets
          </a>
        </Button>
        <Button style={styles2.navyButton}>
          <a
            target="_blank"
            href={`https://smash.gg/${data?.tournament?.events[0].slug}/brackets/${data?.tournament?.events[0]?.phases[0]?.id}/${data?.tournament?.events[0]?.phases[0]?.phaseGroups?.nodes[0]?.id}/standings`}
          >
            Standings
          </a>
        </Button>
        <Button style={styles2.navyButton}>
          <a
            target="_blank"
            href={`https://smash.gg/${data?.tournament?.events[0].slug}/brackets/${data?.tournament?.events[0]?.phases[0]?.id}/${data?.tournament?.events[0]?.phases[0]?.phaseGroups?.nodes[0]?.id}/matches`}
          >
            Matches
          </a>
        </Button>
      </div>
      <WebViewModal show={show} setShow={setShow} url={url} />
    </Container>
  );
};
