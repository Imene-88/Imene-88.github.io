import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing_page.module.css';
import side_picture from '../../assets/side_picture.png';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.blur1}></div>
      <div className={styles.blur2}></div>
      <div className={styles.top}>
        <p className={styles.logo}><span>1n</span>scripto</p>
        <div className={styles.topMenu}>
          <Link>Home</Link>
          <Link>Portfolio</Link>
          <Link>About us</Link>
          <Link to={"/login"}>Log in</Link>
          <Link to={"/register"}>Get Started</Link>
        </div>
      </div>

      <div className={styles.firstDiv}>
        <div className={styles.firstDivHeadlines}>
          <h1>Your ideas are <span>worth</span> sharing.</h1>
          <p>Discover the world of writing opportunities at <i>inscripto</i>, <br/> where writers aim to connect, interact and create great pieces collectively. </p>
          <Link to={"/register"}>Join us</Link>
        </div>
        <img src={side_picture} alt="typewriter beside books" width={500} height={500} />
      </div>
    </div>
  )
}

export default LandingPage