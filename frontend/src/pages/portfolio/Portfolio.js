import React from 'react';
import styles from './Portfolio.module.css';
import { Link } from 'react-router-dom';
import default_image from '../../assets/default_user_profile_picture.png';
import right_arrow from '../../assets/arrow.png';

function Portfolio() {
  return (
    <div className={styles.landingPage}>
        <div className={styles.blur1}></div>
        <div className={styles.blur2}></div>
        <div className={styles.top}>
          <p className={styles.logo}><span>1n</span>scripto</p>
          <div className={styles.topMenu}>
            <Link to={"/"}>Home</Link>
            <Link>Portfolio</Link>
            <Link>About us</Link>
            <Link to={"/login"}>Log in</Link>
            <Link to={"/register"}>Get Started</Link>
          </div>
        </div>

        <div className={styles.frontDiv}>
          <div className={styles.top}>
            <svg className={styles.svg1}>
              <line x1="0" y1="0" x2="30" y2="0" style={{ stroke: "var(--primary-color)", strokeWidth:2 }} />
            </svg>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <svg className={styles.svg2}>
              <line x1="0" y1="0" x2="700" y2="0" style={{ stroke: "var(--primary-color)", strokeWidth:2 }} />
            </svg>
          </div>
          <div className={styles.right}>
            <svg className={styles.svg3}>
              <line x1="0" y1="0" x2="0" y2="400" style={{ stroke: "var(--primary-color)", strokeWidth:2 }} />
            </svg>
          </div>
          <div className={styles.bottom}>
            <svg className={styles.svg4}>
              <line x1="0" y1="0" x2="811" y2="0" style={{ stroke: "var(--primary-color)", strokeWidth:2 }} />
            </svg>
          </div>
          <div className={styles.left}>
            <svg className={styles.svg5}>
              <line x1="0" y1="0" x2="0" y2="400" style={{ stroke: "var(--primary-color)", strokeWidth:2 }} />
            </svg>
          </div>
        </div>
        <div className={styles.phrase}>
          <p>Join our community of talented <br/> and passionate writers.</p>
          <button>Join us</button>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img src={default_image} alt="user profile" width={50} height={50} />
            <p className={styles.fullName}>Full name</p>
            <p className={styles.description}>Ut adipisicing aliqua exercitation ex pariatur fugiat est labore Lorem nisi laboris officia elit. Velit est est consequat commodo irure magna. Duis excepteur labore velit labore aliqua sint ullamco deserunt nisi labore ex irure cupidatat. Irure excepteur enim consequat est laborum sunt ut et labore occaecat aliquip do dolore. Occaecat enim aliquip excepteur Lorem consequat reprehenderit irure.</p>
            <div className={styles.studio_button}>
              <div className={styles.studio_button_icon}>
                <img src={right_arrow} alt="right arrow icon" width={15} height={15} />
              </div>
              <div className={styles.studio_button_label}>
                See portfolio
              </div>
            </div>
          </div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>
    </div>
  )
}

export default Portfolio