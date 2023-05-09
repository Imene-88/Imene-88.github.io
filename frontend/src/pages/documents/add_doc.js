import React, { useContext, useEffect, useState, useRef } from 'react'
import TextEditor from '../../components/text_editor/TextEditor'
import styles from './add_doc.module.css'
import logo from '../../assets/logo.png'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import openDoc from '../../assets/open.png';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import axios from 'axios';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import info from '../../assets/info.png';
import SharedWithUsers from '../../components/users_to_share_with/SharedWithUsers';
import Switch from '@mui/material/Switch';
import profile from '../../assets/profile.png'
import settings from '../../assets/settings.png'
import dark_mode from '../../assets/dark_mode.png'
import log_out from '../../assets/log_out.png'
import TextEditor2 from '../../components/text_editor/TextEditor2';
import Snackbar from '@mui/material/Snackbar';
import socket from '../../SOCKET_CONNECTION';
import collaborators_announcements from '../../assets/notif.mp3';

function AddDoc() {

  const { user: loggedInUser } = useContext(AuthContext);

  const [anchorProfile, setAnchorProfile] = useState(null);
  const openProfile = Boolean(anchorProfile);
  const handleClickProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };

  const [userFollowingsList, setUserFollowingsList] = useState([]);
  useEffect(() => {
    const getUserFollowings = async () => {
      try {
        const res = await axios.get("/users/" + loggedInUser._id + "/followings");
        setUserFollowingsList(res.data);
      }
      catch(error) {}
    }
    getUserFollowings();
  }, [loggedInUser._id]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const opendocDescDialog = () => {
    setDialogOpen(true);
  };
  const closedocDescDialog = () => {
    setDialogOpen(false);
  };
  
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const openshareDocDialog = () => {
    setShareDialogOpen(true);
  };

  const closeshareDialogDialog = () => {
    setShareDialogOpen(false);
  };

  // File button
  const [anchorElFile, setAnchorElFile] = useState(null);
  const openFile = Boolean(anchorElFile);
  const handleClickFile = (event) => {
    setAnchorElFile(event.currentTarget);
  };
  const handleCloseFile = () => {
    setAnchorElFile(null);
  };

  // Edit button
  const [anchorElEdit, setAnchorElEdit] = useState(null);
  const openEdit = Boolean(anchorElEdit);
  const handleClickEdit = (event) => {
    setAnchorElEdit(event.currentTarget);
  };
  const handleCloseEdit = () => {
    setAnchorElEdit(null);
  };

  // Insert button
  const [anchorElInsert, setAnchorElInsert] = useState(null);
  const openInsert = Boolean(anchorElInsert);
  const handleClickInsert = (event) => {
    setAnchorElInsert(event.currentTarget);
  };
  const handleCloseInsert = () => {
    setAnchorElInsert(null);
  };

  // Format button
  const [anchorElFormat, setAnchorElFormat] = useState(null);
  const openFormat = Boolean(anchorElFormat);
  const handleClickFormat = (event) => {
    setAnchorElFormat(event.currentTarget);
  };
  const handleCloseFormat = () => {
    setAnchorElFormat(null);
  };

  // Tools button
  const [anchorElTools, setAnchorElTools] = useState(null);
  const openTools = Boolean(anchorElTools);
  const handleClickTools = (event) => {
    setAnchorElTools(event.currentTarget);
  };
  const handleCloseTools = () => {
    setAnchorElTools(null);
  };

  // Help button
  const [anchorElHelp, setAnchorElHelp] = useState(null);
  const openHelp = Boolean(anchorElHelp);
  const handleClickHelp = (event) => {
    setAnchorElHelp(event.currentTarget);
  };
  const handleCloseHelp = () => {
    setAnchorElHelp(null);
  };

  // Make input width fit content width
  const [text, setText] = useState('');
  const titleInput = useRef();
  const handleChange = (event) => {
    setText(event.target.value);
  };
  useEffect(() => {
    const adjustInputWidthToFitContent = () => {
      if (text.length < 1) {
        titleInput.current.style.width = titleInput.current.placeholder.length+'ch';
      } else {
        titleInput.current.style.width = text.length+'ch';
      }
    }; 
    adjustInputWidthToFitContent(); // eslint-disable-next-line
  }, [text]); 

  // Tooltip
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

    const location = useLocation();
    const documentTitle = location.state;

    const navigate = useNavigate();

    const { id: document_id} = useParams();
    const documentDescription = useRef();
    const [documentParticipants, setDocumentParticipants] = useState([]);
    const [documentOpen, setDocumentOpen] = useState(false);
    
    const publishDocumentAsOpen = async (event) => {
      event.preventDefault();
      try {
        await axios.put("/documents/" + document_id + "/update", {
          description: documentDescription.current.value,
        });
        navigate("/open_collabs", { replace: true });
        setDocumentOpen(true);
      } 
      catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const getDocumentParticipants = async () => {
        try {
          const res = await axios.get("/documents/participants/" + document_id);
          setDocumentParticipants(res.data);
        } 
        catch (error) {
          console.log(error);
        }
      };
      getDocumentParticipants(); 
    }, [document_id])

    const clearStorage = () => {
      localStorage.removeItem('user');
      navigate('/login', {replace: true});
      navigate(0);
    };

    const [accessRight, setAccessRight] = useState("");
    useEffect(() => {
        const getAccessRight = async () => {
            try {
                const res = await axios.get("/access_rights/" + loggedInUser._id + "/getAccessRight/" + document_id);
                console.log(res.data);
                //res.data && setAccessRight(res.data);    
            } 
            catch (error) {
                console.log(error);
            }
        };
        getAccessRight();
    }, [loggedInUser._id, document_id]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    useEffect(() => {
      setSnackbarOpen(true);
    }, [])
    const closeSnackbar = () => {
      setSnackbarOpen(false);
    };

    useEffect(() => {
      socket.on(`user:announced-${document_id}`, () => {
        const audio = document.createElement('audio');
        audio.src = collaborators_announcements;
        document.body.appendChild(audio);
        audio.play();
      })
    }, [document_id]);

  return (
    <>
    {accessRight === "viewer" && 
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        message="You are viewing"
        onClose={closeSnackbar}
        className={styles.snackbar}
      />
    }
    {accessRight === "editor" && 
      <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      open={snackbarOpen}
      autoHideDuration={5000}
      message="You are editing"
      onClose={closeSnackbar}
      className={styles.snackbar}
      />
    }
      <div className={styles.navEditor}>
        <div className={styles.imgFileGroup}>
        <img src={logo} alt="Logo of website" width={170} height={89} />
        <div className={styles.fileInteraction}>
          <input type="text" placeholder='Untitled document' value={text} ref={titleInput} onChange={handleChange} />
          <div className={styles.fileNav}>
            <div>
              { /* --------------- File --------------- */ }
              <Button
                id="file-button"
                aria-controls={openFile ? 'file-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFile ? 'true' : undefined}
                onClick={handleClickFile}
              >
                File
              </Button>
              <Menu
                id="file-menu"
                anchorEl={anchorElFile}
                open={openFile}
                onClose={handleCloseFile}
                MenuListProps={{
                  'aria-labelledby': 'file-button',
                }}
              >
                <MenuItem onClick={handleCloseFile}>New</MenuItem>
                <MenuItem onClick={handleCloseFile}>Open</MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseFile}>Rename</MenuItem>
                <MenuItem onClick={handleCloseFile}>Delete</MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseFile}>Download</MenuItem>
                <MenuItem onClick={handleCloseFile}>Print</MenuItem>
              </Menu>
            </div>

            {/* --------------- Edit --------------- */}
            <div>
              <Button
                id="edit-button"
                aria-controls={openEdit ? 'edit-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openEdit ? 'true' : undefined}
                onClick={handleClickEdit}
              >
                Edit
              </Button>
              <Menu
                id="edit-menu"
                anchorEl={anchorElEdit}
                open={openEdit}
                onClose={handleCloseEdit}
                MenuListProps={{
                  'aria-labelledby': 'edit-button',
                }}
              >
                {accessRight !== "viewer" && <MenuItem onClick={handleCloseEdit}>Undo</MenuItem>}
                {accessRight !== "viewer" && <MenuItem onClick={handleCloseEdit}>Redo</MenuItem>}
                {accessRight !== "viewer" && <MenuItem onClick={handleCloseEdit}>Cut</MenuItem>}
                {accessRight !== "viewer" && <MenuItem onClick={handleCloseEdit}>Copy</MenuItem>}
                {accessRight !== "viewer" && <MenuItem onClick={handleCloseEdit}>Paste</MenuItem>}
                <MenuItem onClick={handleCloseEdit}>Select all</MenuItem>
              </Menu>
            </div>

            {/* --------------- Insert --------------- */}
            {accessRight !== "viewer" &&
              <div>
                <Button
                  id="insert-button"
                  aria-controls={openInsert ? 'insert-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openInsert ? 'true' : undefined}
                  onClick={handleClickInsert}
                >
                  Insert
                </Button>
                <Menu
                  id="insert-menu"
                  anchorEl={anchorElInsert}
                  open={openInsert}
                  onClose={handleCloseInsert}
                  MenuListProps={{
                    'aria-labelledby': 'insert-button',
                  }}
                >
                  <MenuItem onClick={handleCloseInsert}>Image</MenuItem>
                  <MenuItem onClick={handleCloseInsert}>Table</MenuItem>
                  <MenuItem onClick={handleCloseInsert}>Chart</MenuItem>
                  <MenuItem onClick={handleCloseInsert}>Line</MenuItem>
                </Menu>
              </div>
            }

            {/* --------------- Format --------------- */}
            {accessRight !== "viewer" && 
              <div>
                <Button
                  id="format-button"
                  aria-controls={openFormat ? 'format-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openFormat ? 'true' : undefined}
                  onClick={handleClickFormat}
                >
                  Format
                </Button>
                <Menu
                  id="format-menu"
                  anchorEl={anchorElFormat}
                  open={openFormat}
                  onClose={handleCloseFormat}
                  MenuListProps={{
                    'aria-labelledby': 'format-button',
                  }}
                >
                  <MenuItem onClick={handleCloseFormat}>Text</MenuItem>
                  <MenuItem onClick={handleCloseFormat}>Align & indent</MenuItem>
                  <MenuItem onClick={handleCloseFormat}>Bullets & numbering</MenuItem>
                </Menu>
              </div>
            }

            { /* --------------- Tools --------------- */ }
            {accessRight !== "viewer" && 
              <div>
                <Button
                  id="tools-button"
                  aria-controls={openTools ? 'tools-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openTools ? 'true' : undefined}
                  onClick={handleClickTools}
                >
                  Tools
                </Button>
                <Menu
                  id="tools-menu"
                  anchorEl={anchorElTools}
                  open={openTools}
                  onClose={handleCloseTools}
                  MenuListProps={{
                    'aria-labelledby': 'tools-button',
                  }}
                >
                  <MenuItem onClick={handleCloseTools}>Voice Typing</MenuItem>
                </Menu>
              </div>
            }

            {/* --------------- Help --------------- */}
            <div>
              <Button
                id="help-button"
                aria-controls={openHelp ? 'help-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openHelp ? 'true' : undefined}
                onClick={handleClickHelp}
              >
                Help
              </Button>
              <Menu
                id="help-menu"
                anchorEl={anchorElHelp}
                open={openHelp}
                onClose={handleCloseHelp}
                MenuListProps={{
                  'aria-labelledby': 'help-button',
                }}
              >
                <MenuItem onClick={handleCloseHelp}>FAQ</MenuItem>
                <MenuItem onClick={handleCloseHelp}>Feedback</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        </div>
        <div className={styles.userInteraction}>
          {!documentOpen && accessRight !== "viewer" &&
            <div onClick={opendocDescDialog}>
              <LightTooltip title="Publish this document as an open document"> 
                <img src={openDoc} alt="lock icon" width={30} height={30} className={styles.openDoc} /> 
              </LightTooltip>
            </div>
          }
          <Dialog open={dialogOpen} onClose={closedocDescDialog} className={styles.dialog}>
            <DialogTitle>Please provide a description for the document</DialogTitle>
            <Divider />
            <form method='post' onSubmit={publishDocumentAsOpen}>
              <DialogContent>
                <textarea cols="68" rows="11" placeholder='Your description' autoFocus required className={styles.documentDescription} ref={documentDescription}></textarea>
              </DialogContent>
              <DialogActions>
                <button className={styles.publishBtn} type='submit' >Publish</button>
              </DialogActions>
            </form>
          </Dialog>
          {!documentOpen && accessRight !== "viewer" && <button onClick={openshareDocDialog}>Share</button>}
          <Dialog open={shareDialogOpen} onClose={closeshareDialogDialog} className={styles.dialog}>
            <DialogTitle>
              Share {documentTitle}
              <LightTooltip title="Our policy believes that collaboration is the essence of success. Therefore, if you want to share your document with other people and write together, you can follow them on this platform and find them on the list below."> 
                <img src={info} alt="help" width={25} height={25} />
              </LightTooltip> 
            </DialogTitle>
            <Divider />
            <DialogContent>
              {userFollowingsList.map((followedUser) => {
                return (
                  <SharedWithUsers key={followedUser._id} followedUser={followedUser} />
                )
              })}
            </DialogContent>
          </Dialog>
          <div className={styles.participantsAvatars}>
            {documentParticipants.length > 0 && documentParticipants.map((participant) => {
              return <img src={participant.profile_picture ? participant.profile_picture : default_picture} alt="participants profiles" width={40} height={40} />
            })}
          </div>
          <button id='profile'
            className={styles.profileButton}
            aria-controls={openProfile ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleClickProfile}>
              <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="profile img" width={55} height={55} className={styles.profile} />
          </button>
          <Menu id='profile-menu'
            className={styles.profile_menu}
            anchorEl={anchorProfile}
            open={openProfile}
            onClose={handleCloseProfile}
            MenuListProps={{
              'aria-labelledby': 'profile',
            }}
          >
            <MenuItem>
              <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="User profile" width={55} height={55} />
              <div className={styles.text}>
                <p>{loggedInUser.username}</p>
                <p>{loggedInUser.email}</p>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to={"/main_page/profile"}>
              <img src={profile} alt="profile icon" width={25} height={25} />
              <p>Profile</p>
            </MenuItem>
            <MenuItem>
              <img src={settings} alt="settings icon" width={25} height={25} />
              <p>Settings</p>
            </MenuItem>
            <MenuItem>
              <img src={dark_mode} alt="dark mode icon" width={25} height={25} />
              <p>Dark mode</p>
              <Switch className={styles.switch_dark} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={clearStorage}>
              <img src={log_out} alt="logout icon" width={25} height={25} />
              <p>Log out</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
      {/*<TextEditor title={text} />*/}
      <TextEditor2 accessRight={accessRight} />
    </>  
  )
}

export default AddDoc