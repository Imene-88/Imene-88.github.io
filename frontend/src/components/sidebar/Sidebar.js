import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import styles from '../navbar/Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import group_filled from '../../assets/group_filled.png';
import group_unfilled from '../../assets/group_unfilled.png'
import home_filled from '../../assets/home_filled.png';
import home_unfilled from '../../assets/home_unfilled.png';
import users_filled from '../../assets/users_filled.png';
import users_unfilled from '../../assets/users_unfilled.png';
import posts_filled from '../../assets/posts_filled.png';
import posts_unfilled from '../../assets/posts_unfilled.png';
import doc_filled from '../../assets/doc_filled.png';
import doc_unfilled from '../../assets/doc_unfilled.png';
import reports_filled from '../../assets/reports_filled.png';
import reports_unfilled from '../../assets/reports_unfilled.png';
import ads_filled from '../../assets/megaphone.png';
import ads_unfilled from '../../assets/megaphone_unfilled.png';
import { AuthContext } from '../../context/AuthContext';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'var(--secondary-color)',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 12,
      fontFamily: 'var(--main-font)'
    },
    }));

function Sidebar() {

  const { user: loggedInUser } = useContext(AuthContext);

  return (
    <>
      {loggedInUser.role === "User" && 
        <div className={styles.navCol}>
          <div className={styles.page}>
            <LightTooltip title="Open Collaborations">
              <Link to="/open_collabs">
                <img src={group_unfilled} alt="open collaborations icon" width="35" height="35" />
              </Link>
            </LightTooltip>
          </div>
          <div className={styles.page}>
            <LightTooltip title="Home">
              <Link to="/main_page">
                <img src={home_filled} alt="home icon" width="35" height="35" className={styles.activeLink}/>
              </Link>
            </LightTooltip>
          </div>
          <div className={styles.page}>
            <LightTooltip title="Documents">
              <Link to="/documents">
                <img src={doc_unfilled} alt="documents icon" width="35" height="35" />
              </Link>
            </LightTooltip>
          </div>
        </div>
      }
      {loggedInUser.role !== "User" &&
        <div className={styles.navColAdmin}>
          <div className={styles.page}>
              <LightTooltip title="Home">
                <Link to="/admin_page">
                  <img src={home_filled} alt="home icon" width="35" height="35" />
                </Link>
              </LightTooltip>
          </div>
          <div className={styles.page}>
              <LightTooltip title="Users">
                <Link to={"/users"}>
                  <img src={users_unfilled} alt="user icon" width="30" height="30" />
                </Link>
              </LightTooltip>
          </div>
          <div className={styles.page}>
              <LightTooltip title="Posts">
                <Link to="/posts">
                  <img src={posts_unfilled} alt="post icon" width="30" height="30" />
                </Link>
              </LightTooltip>
          </div>
          <div className={styles.page}>
              <LightTooltip title="Open Documents">
                <Link to="/open_collabs">
                  <img src={group_unfilled} alt="group icon" width="35" height="35" />
                </Link>
              </LightTooltip>
          </div>
          <div className={styles.page}>
              <LightTooltip title="Reports">
                <Link to="/reports">
                  <img src={reports_unfilled} alt="report icon" width="35" height="35" />
                </Link>
              </LightTooltip>
          </div>
          <div className={styles.page}>
              <LightTooltip title="Ads">
                <Link to="/ads">
                  <img src={ads_unfilled} alt="ads icon" width="35" height="35" />
                </Link>
              </LightTooltip>
          </div>
        </div>
      } 
    </>
  )
}

export default Sidebar