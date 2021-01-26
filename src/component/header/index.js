import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import notification from "../../assets/notificationIcon.svg";

export const Header = () => {
  return (
    <navbar className={styles.mainContainer}>
      <div className={styles.title}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.nav}>
        <a href="#">Dashboard</a>
        <a href="#">Events</a>
        <a href="#">Account Settings</a>
        <a href="#">Contact us</a>
        <a href="#">Sign out</a>
      </div>

      <div className={styles.notification}>
        <img src={notification} alt="" />
      </div>
    </navbar>
  );
};
