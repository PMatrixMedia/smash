import styles from "./styles.module.scss";

export const EventTile = ({ name, images, startAt, handleClick }) => {
  let unix_timestamp = startAt;
  var date = new Date(unix_timestamp * 1000).toDateString();

  return (
    <div className={styles.tileContainer} onClick={handleClick}>
      <div
        className={styles.image}
        style={
          images?.length
            ? { backgroundImage: `url(${images[0]?.url})` }
            : { backgroundColor: "gray" }
        }
      />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <p>{name}</p>
          <p></p>
        </div>
        <p className={styles.date}>{`Starts: ${date}`}</p>
      </div>
    </div>
  );
};
