import React, { useEffect, useRef, useState } from 'react';
import info from '../../assets/info.png';
import InterestsListItem from '../../components/user_interest/InterestsListItem';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from './UserInterests.module.css';
import MobileStepper from '@mui/material/MobileStepper';
import { occupations, interestsList } from '../../USER_INTERESTS_PAGE_DATA.js';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function UserInterests() {

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

  const [optionSelected, setOptionSelected] = useState(false);
  const [interestSelected, setInterestSelected] = useState(false);
  const selectOption = (selected) =>{
    if (selected !== true) {
      setOptionSelected(true);
    } else {
      setOptionSelected(false);
    }
  };

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
    setOptionSelected(false);
    setInterestSelected(false);
    setDateSelected("");
  }

  useEffect(() => {
    if (nextPage > 0) {
      backButton.current.style.display = 'block';
    }
  });

  const [dateSelected, setDateSelected] = useState("");
  const enableDoneButton = (event) => {
    setDateSelected(event.target.value);
  }

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
            <p>What is your current occupation?</p>
            <div className={styles.interestsOptions}>
              {occupations.map((occupation) => {
                return <InterestsListItem key={occupations.indexOf(occupation)} occupation={occupation} onSelect={selectOption} />
              })}
            </div>
            <div className={styles.buttons}>
              <button ref={backButton}>Back</button>
              <button disabled={!optionSelected} onClick={goToNextPage}>Next</button>
            </div>
          </div>
        }
        {nextPage === 1 &&
          <div className={styles.interests}>
            <p>What are your interests?</p>
            <div className={styles.interestsOptions}>
              {interestsList.map((interestsListItem) => {
                return <InterestsListItem key={interestsList.indexOf(interestsListItem)} interestsListItem={interestsListItem} onSelectInterest={selectInterest} />
              })}
            </div>
            <div className={styles.buttons}>
              <button ref={backButton} onClick={goToPreviousPage}>Back</button>
              <button disabled={!interestSelected} onClick={goToNextPage}>Next</button>
            </div>
          </div>
        }
        {nextPage === 2 &&
          <div className={styles.interests}>
            <p className={styles.birthDate}>Enter your birth date</p>
            <input type="date" onChange={enableDoneButton} />
            <div className={styles.lastButtons}>
              <button ref={backButton} onClick={goToPreviousPage}>Back</button>
              <button disabled={!dateSelected} onClick={goToNextPage}>Done</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default UserInterests