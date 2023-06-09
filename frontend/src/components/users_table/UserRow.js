import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './UsersTable.module.css';
import Typography from '@mui/material/Typography';
import default_picture from '../../assets/default_user_profile_picture.png';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

function UserRow({user}) {

    const handleBirthDate = (birthDate) => {
        const birth_date_datetime_format = birthDate;
        const birth_date_datetime = new Date(birth_date_datetime_format);
        const birth_date = birth_date_datetime.toISOString().slice(0, 10);
        const birth_date_splitted = birth_date.split('-');
        const birth_date_new_format = birth_date_splitted[2] + "/" + birth_date_splitted[1] + "/" + birth_date_splitted[0];
        return <p>{birth_date_new_format}</p>;
    };

    const [userRowExpanded, setUserRowExpanded] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const openUsersListDialog = () => {
      setDialogOpen(true);
    };
    const closeUsersListDialog = () => {
      setDialogOpen(false);
    };

  return (
    <>
    <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => setUserRowExpanded(!userRowExpanded)}
        className={styles.row}
    >
        <TableCell component="th" scope="row">
          {user.full_name}
        </TableCell>
        <TableCell align="left">{user.username}</TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user.type_of_color_blindness}</TableCell>
        {/*<TableCell align="left">{handleBirthDate(user.birth_date)}</TableCell>*/}
        <TableCell align="left">{user.account_type}</TableCell>
        <TableCell align="center"><p className={styles.activated}>{user.activated ? "Activated" : "Disactivated"}</p></TableCell>
    </TableRow>
    {userRowExpanded && (
        <TableRow className={styles.followersFollowingRow}>
            <TableCell colSpan={3} className={styles.followersFollowingCell}>
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Followers</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {user.followers.length > 0 ? 
                            <>
                                {user.followers.length >= 3 ? 
                                    <div className={styles.followers}>
                                        <div className={styles.follower}>
                                            <img src={user.followers[0].profile_picture ? user.followers[0].profile_picture : default_picture} alt="follower media" width={44} height={44} />
                                            <p>{user.followers[0].full_name}</p>
                                        </div>
                                        <div className={styles.follower}>
                                            <img src={user.followers[1].profile_picture ? user.followers[1].profile_picture : default_picture} alt="follower media" width={44} height={44} />
                                            <p>{user.followers[1].full_name}</p>
                                        </div>
                                        <div className={styles.follower}>
                                            <img src={user.followers[2].profile_picture ? user.followers[2].profile_picture : default_picture} alt="follower media" width={44} height={44} />
                                            <p>{user.followers[2].full_name}</p>
                                        </div>
                                        <p className={styles.viewAll} onClick={openUsersListDialog}>View all followers</p>
                                        <Dialog open={dialogOpen} onClose={closeUsersListDialog} className={styles.dialog}>
                                            <DialogTitle>Followers</DialogTitle>
                                            <Divider />
                                            <DialogContent>
                                                {user.followers.map((userFollower) => {
                                                    return (
                                                        <div className={styles.follower} key={userFollower._id}>
                                                            <img src={userFollower.profile_picture ? userFollower.profile_picture : default_picture} alt="following media" width={44} height={44} />
                                                            <p>{userFollower.full_name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                : 
                                    <div className={styles.followers}>
                                        <div className={styles.follower}>
                                            <img src={user.followers[0].profile_picture ? user.followers[0].profile_picture : default_picture} alt="follower media" width={44} height={44} />
                                            <p>{user.followers[0].full_name}</p>
                                        </div>
                                        {user.followers[1] && 
                                            <div className={styles.follower}>
                                                <img src={user.followers[1].profile_picture ? user.followers[1].profile_picture : default_picture} alt="follower media" width={44} height={44} />
                                                <p>{user.followers[1].full_name}</p>
                                            </div>
                                        }
                                    </div>
                                }
                            </>
                        : <p className={styles.none}>This user does not have any followers yet.</p>
                        }
                    </AccordionDetails>
                </Accordion>
            </TableCell>
            <TableCell colSpan={1.5}></TableCell>
            <TableCell colSpan={4} className={styles.followersFollowingCell}>
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Following</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {user.following.length > 0 ? 
                            <>
                                {user.following.length >= 3 ? 
                                    <div className={styles.followers}>
                                        <div className={styles.follower}>
                                            <img src={user.following[0].profile_picture ? user.following[0].profile_picture : default_picture} alt="following media" width={44} height={44} />
                                            <p>{user.following[0].full_name}</p>
                                        </div>
                                        <div className={styles.follower}>
                                            <img src={user.following[1].profile_picture ? user.following[1].profile_picture : default_picture} alt="following media" width={44} height={44} />
                                            <p>{user.following[1].full_name}</p>
                                        </div>
                                        <div className={styles.follower}>
                                            <img src={user.following[2].profile_picture ? user.following[2].profile_picture : default_picture} alt="following media" width={44} height={44} />
                                            <p>{user.following[2].full_name}</p>
                                        </div>
                                        <p className={styles.viewAll} onClick={openUsersListDialog}>View all followings</p>
                                        <Dialog open={dialogOpen} onClose={closeUsersListDialog} className={styles.dialog}>
                                            <DialogTitle>Following</DialogTitle>
                                            <Divider />
                                            <DialogContent>
                                                {user.following.map((userFollowing) => {
                                                    return (
                                                        <div className={styles.follower} key={userFollowing._id}>
                                                            <img src={userFollowing.profile_picture ? userFollowing.profile_picture : default_picture} alt="following media" width={44} height={44} />
                                                            <p>{userFollowing.full_name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                : 
                                    <div className={styles.followers}>
                                        <div className={styles.follower}>
                                            <img src={user.following[0].profile_picture ? user.following[0].profile_picture : default_picture} alt="following media" width={44} height={44} />
                                            <p>{user.following[0].full_name}</p>
                                        </div>
                                        {user.following[1] && 
                                            <div className={styles.follower}>
                                                <img src={user.following[1].profile_picture ? user.following[1].profile_picture : default_picture} alt="following media" width={44} height={44} />
                                                <p>{user.following[1].full_name}</p>
                                            </div>
                                        }
                                    </div>
                                }
                            </>
                        : <p className={styles.none}>This user does not follow anyone yet.</p>
                        }
                    </AccordionDetails>
                </Accordion>
            </TableCell>
        </TableRow>
    )}
    </>
  )
}

export default UserRow