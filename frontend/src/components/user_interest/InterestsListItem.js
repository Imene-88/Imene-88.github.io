import React, { useRef, useState } from 'react';
import styles from '../../pages/user_interests/UserInterests.module.css';

function InterestsListItem({interestsListItem, onSelectInterest, onChooseInterest}) {

  const [selectedOccupation, setSelectedOccupation] = useState(false);
  
  //const chooseOption = () => {
  //  selectedOccupation ? setSelectedOccupation(false) : setSelectedOccupation(true);
  //  onSelect(selectedOccupation);
  //  console.log(occupation.occupation)
  //};

  const chooseInterest = (interestsListItem) => {
    selectedOccupation ? setSelectedOccupation(false) : setSelectedOccupation(true);
    onSelectInterest(selectedOccupation);
    onChooseInterest(interestsListItem);
  };

  return (
    <>
      {interestsListItem && 
        <div className={styles.userInfo} onClick={() => chooseInterest(interestsListItem)} style={{backgroundColor: selectedOccupation ? 'var(--editor-bg-color)' : 'var(--bg-color)'}}>
          <p>{interestsListItem}</p>
        </div>
      }
    </>
  )
}

export default InterestsListItem