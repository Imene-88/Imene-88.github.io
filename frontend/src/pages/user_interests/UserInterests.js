import React, { useContext, useEffect, useRef, useState } from 'react';
import info from '../../assets/info.png';
import InterestsListItem from '../../components/user_interest/InterestsListItem';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from './UserInterests.module.css';
import MobileStepper from '@mui/material/MobileStepper';
import { interestsList } from '../../USER_INTERESTS_PAGE_DATA.js';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function UserInterests() {

  const { user: loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const addUserToAccessRightsCollection = async () => {
      try {
        await axios.post("/access_rights/" + loggedInUser._id + "/addUser");  
      } 
      catch (error) {
        console.log(error);
      }
    };
    addUserToAccessRightsCollection();
  }, [loggedInUser._id]);

  const navigate = useNavigate();

  // Tooltip
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'var(--secondary-color)',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 12,
      fontFamily: 'var(--main-font)',
      width: 700,
    },
    }));

  const [activeStep, setActiveStep] = useState(0);

  const [interestSelected, setInterestSelected] = useState(false);
  //const selectOption = (selected) =>{
  //  if (selected !== true) {
  //    setOptionSelected(true);
  //  } else {
  //    setOptionSelected(false);
  //  }
  //};

  const selectInterest = (selected) =>{
    if (selected !== true) {
      setInterestSelected(true);
    } else {
      setInterestSelected(false);
    }
  };

  const backButton = useRef();
  const [nextPage, setNextPage] = useState(0);
  const goToNextPage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextPage(nextPage + 1);
  };

  const goToPreviousPage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextPage(nextPage - 1);
    setInterestSelected(false);
    setDateSelected(false);
    setOccupationSelected(false);
  }

  useEffect(() => {
    if (nextPage > 0) {
      backButton.current.style.display = 'block';
    }
  });

  const [dateSelected, setDateSelected] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [occupationSelected, setOccupationSelected] = useState(false);
  const [occupation, setOccupation] = useState("");
  const enableDoneButton = (event) => {
    setDateSelected(true);
    setBirthDate(event.target.value);
  }
  
  const enableFirstNextButton = (event) => {
    setOccupationSelected(true);
    setOccupation(event.target.value);
  };
  
  const [interest, setInterest] = useState([]);
  const selectInterests = (userInterest) => {
    let interestFiltered = [];
    if (interest.includes(userInterest)) {
      interestFiltered = interest.filter((item) => item != userInterest);
      setInterest(interestFiltered);
    } else {
      interest.push(userInterest);
    }
    setInterest((prev) => [...prev]);
    console.log(interest);
  };

  const insertUserInterests = async () => {
    await axios.post("/interests/addUserInterests/" + loggedInUser._id, {
      occupation: occupation,
      interests: interest,
      birth_date: new Date(birthDate),
    });
    navigate("/main_page", { replace: true });
  };

  return (
    <div className={styles.userInterests}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.topInfo}>
            <p>Please tell us about yourself</p>
            <LightTooltip title="If you can tell us a bit about your interests, that would help us suggest other people with the same interests as you, which can help you find the right ones to collaborate with or simply share your passion with them."> 
              <img src={info} alt="help" width={20} height={20} />
            </LightTooltip>
          </div>
          <MobileStepper
            variant="progress"
            steps={3}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
          />
        </div>
        {nextPage === 0 &&
          <div className={styles.interests}>
            <p className={styles.birthDate}>What is your current occupation?</p>
            {/*<div className={styles.interestsOptions}>
              {occupations.map((occupation) => {
                return <InterestsListItem key={occupations.indexOf(occupation)} occupation={occupation} onSelect={selectOption} />
              })}
            </div>*/}
            <input type="text" value={occupation} placeholder='Enter your current occupation' onChange={enableFirstNextButton} />
            <div className={styles.buttons}>
              <button ref={backButton}>Back</button>
              <button disabled={!occupationSelected} onClick={goToNextPage} className={styles.firstNext}>Next</button>
            </div>
          </div>
        }
        {nextPage === 1 &&
          <div className={styles.interests}>
            <p>What are your interests?</p>
            <div className={styles.interestsOptions}>
              {interestsList.map((interestsListItem) => {
                return <InterestsListItem key={interestsList.indexOf(interestsListItem)} interestsListItem={interestsListItem} onSelectInterest={selectInterest} onChooseInterest={selectInterests} />
              })}
            </div>
            <div className={styles.secondButtons}>
              <button ref={backButton} onClick={goToPreviousPage}>Back</button>
              <button disabled={!interestSelected} onClick={goToNextPage}>Next</button>
            </div>
          </div>
        }
        {nextPage === 2 &&
          <div className={styles.interests}>
            <p className={styles.birthDate}>Enter your birth date</p>
            <input type="date" value={birthDate} onChange={enableDoneButton} />
            <div className={styles.lastButtons}>
              <button ref={backButton} onClick={goToPreviousPage}>Back</button>
              <button disabled={!dateSelected} onClick={insertUserInterests}>Done</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default UserInterests