import React, { useRef, useState } from 'react';
import styles from '../../pages/user_interests/UserInterests.module.css';

function InterestsListItem({occupation, onSelect, interestsListItem, onSelectInterest}) {

  const userInfo = useRef();
  const [selectedOccupation, setSelectedOccupation] = useState(false);
  
  const chooseOption = () => {
    selectedOccupation ? setSelectedOccupation(false) : setSelectedOccupation(true);
    onSelect(selectedOccupation);
    console.log(occupation.occupation)
  };

  const chooseInterest = () => {
    selectedOccupation ? setSelectedOccupation(false) : setSelectedOccupation(true);
    onSelectInterest(selectedOccupation);
  };

  return (
    <>
      {occupation && 
        <div className={styles.userInfo} onClick={chooseOption} style={{backgroundColor: selectedOccupation ? 'var(--editor-bg-color)' : 'var(--bg-color)'}}>
          <img src={occupation.illustration} alt="occupation illustration" width={30} height={30} />
          <p>{occupation.occupation}</p>
        </div>
      }
      {interestsListItem && 
        <div className={styles.userInfo} onClick={chooseInterest} style={{backgroundColor: selectedOccupation ? 'var(--editor-bg-color)' : 'var(--bg-color)'}}>
          <p>{interestsListItem}</p>
        </div>
      }
    </>
  )
}

export default InterestsListItem