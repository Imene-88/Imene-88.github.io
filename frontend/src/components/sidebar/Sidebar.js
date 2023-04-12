import React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import styles from '../navbar/Navbar.module.css'
import { Link } from 'react-router-dom'
import group from '../../assets/group.png'
import homeFilled from '../../assets/home_filled.png'
import doc from '../../assets/doc.png'

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
  return (
    <div className={styles.navCol}>
        <div className={styles.page}>
            <LightTooltip title="Open Collaborations">
              <Link to="/open_collabs">
                <img src={group} alt="open collaborations icon" width="35" height="35" />
              </Link>
            </LightTooltip>
        </div>
        <div className={styles.page}>
            <LightTooltip title="Home">
              <Link to="/main_page">
                <img src={homeFilled} alt="home icon" width="35" height="35" className={styles.activeLink}/>
              </Link>
            </LightTooltip>
        </div>
        <div className={styles.page}>
            <LightTooltip title="Documents">
              <Link to="/documents">
                <img src={doc} alt="documents icon" width="35" height="35" />
              </Link>
            </LightTooltip>
        </div>
    </div>
  )
}

export default Sidebar