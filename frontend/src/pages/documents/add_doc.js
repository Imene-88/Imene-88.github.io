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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import info from '../../assets/info.png';
import SharedWithUsers from '../../components/users_to_share_with/SharedWithUsers';
import socket from '../../SOCKET_CONNECTION';

function AddDoc() {

  const { user: loggedInUser } = useContext(AuthContext);
  
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
  const [anchorElFile, setAnchorElFile] = React.useState(null);
  const openFile = Boolean(anchorElFile);
  const handleClickFile = (event) => {
    setAnchorElFile(event.currentTarget);
  };
  const handleCloseFile = () => {
    setAnchorElFile(null);
  };

  // Edit button
  const [anchorElEdit, setAnchorElEdit] = React.useState(null);
  const openEdit = Boolean(anchorElEdit);
  const handleClickEdit = (event) => {
    setAnchorElEdit(event.currentTarget);
  };
  const handleCloseEdit = () => {
    setAnchorElEdit(null);
  };

  // Insert button
  const [anchorElInsert, setAnchorElInsert] = React.useState(null);
  const openInsert = Boolean(anchorElInsert);
  const handleClickInsert = (event) => {
    setAnchorElInsert(event.currentTarget);
  };
  const handleCloseInsert = () => {
    setAnchorElInsert(null);
  };

  // Format button
  const [anchorElFormat, setAnchorElFormat] = React.useState(null);
  const openFormat = Boolean(anchorElFormat);
  const handleClickFormat = (event) => {
    setAnchorElFormat(event.currentTarget);
  };
  const handleCloseFormat = () => {
    setAnchorElFormat(null);
  };

  // Help button
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
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
    const title = event.target.value;
    setText(title);
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
    
    const publishDocumentAsOpen = async (event) => {
      event.preventDefault();
      try {
        await axios.put("/documents/" + document_id + "/update", {
          description: documentDescription.current.value,
        });
        navigate("/open_collabs", { replace: true });
      } 
      catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div className={styles.navEditor}>
        <div className={styles.imgFileGroup}>
        <img src={logo} alt="Logo of website" width={170} height={89} />
        <div className={styles.fileInteraction}>
          <input type="text" placeholder='Untitled document' ref={titleInput} onChange={handleChange} />
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
                <MenuItem onClick={handleCloseEdit}>Undo</MenuItem>
                <MenuItem onClick={handleCloseEdit}>Redo</MenuItem>
                <MenuItem onClick={handleCloseEdit}>Cut</MenuItem>
                <MenuItem onClick={handleCloseEdit}>Copy</MenuItem>
                <MenuItem onClick={handleCloseEdit}>Paste</MenuItem>
                <MenuItem onClick={handleCloseEdit}>Select all</MenuItem>
              </Menu>
            </div>

            {/* --------------- Insert --------------- */}
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

            {/* --------------- Format --------------- */}
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
          <div onClick={opendocDescDialog}>
            <LightTooltip title="Publish this document as an open document"> 
              <img src={openDoc} alt="lock icon" width={30} height={30} className={styles.openDoc} /> 
            </LightTooltip>
          </div>
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
          <button onClick={openshareDocDialog}>Share</button>
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
          <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="profile img" width={55} height={55} className={styles.profile} />
        </div>
      </div>
      <TextEditor title={text} />
    </>  
  )
}

export default AddDoc