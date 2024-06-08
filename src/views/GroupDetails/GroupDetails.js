import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error404 from '../Error404/Error404';

import axios from 'axios';
import style from './GroupDetails.module.css';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useSelector } from 'react-redux';

function GroupDetails() {
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [isGroupDetailsError, setIsGroupDetailsError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);

  const getCurrentGroup = useCallback(async() => {
    try {
      const response = await axios.get(`/groups/${id}`);
      setGroupDetails(response.data);
    } 
    catch (error) {
      setIsGroupDetailsError(true);
      throw new Error(error);
    }
  }, [id]);

  const selectDate = (value) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = value.$d.toLocaleDateString(undefined, options);

    setSelectedDate(formattedDate);
  };

  const removeDate = () => {
    setSelectedDate(null)
  }

  const calendarStyles = {
    bgcolor: 'white',
  }

  useEffect(() => {
    getCurrentGroup();
  }, [getCurrentGroup]);

  return (
    <>
    {
      isGroupDetailsError ? (
        <Error404 />
      ) : (
        <div className={style.groupDetailsPageView}>
          <div className={style.groupTitleContainer}>
            <h1>{ groupDetails?.name }</h1>
          </div>
          <div className={style.groupInfoContainer}>
            <Accordion>
              <AccordionTab header="Group Members">
                { groupDetails.members && groupDetails.members.map((member) => (
                  <li style={ { listStyleType: 'none' } } key={member.id}>
                    { member.email.split('@')[0] }
                  </li>
                )) }
              </AccordionTab>
            </Accordion>

            <div className={style.matchingDatesInfoContainer}>
              No matching dates yet
            </div>

            <div className={style.calendarContainer}>
              <span style={ { color: '#fff' } }>Select one or multiple days when you can assist</span>
              <DateCalendar onChange={selectDate} slotProps={{ textField: { size: 'small' } }} sx={calendarStyles} />
              <div className={style.datesContainer}>
                { 
                  currentUser?.dates_bucket && currentUser?.dates_bucket.map((date, index) => (
                    <span className={style.dateText} key={index}>{ date } { date ? <i onClick={removeDate} className='pi pi-trash'></i> : '' } </span>
                  )) 
                }
              </div>
              <button className={style.saveDatesButton}>Save Dates</button>
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default GroupDetails;