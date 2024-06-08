import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error404 from '../Error404/Error404';

import axios from 'axios';
import style from './GroupDetails.module.css';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function GroupDetails() {
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [isGroupDetailsError, setIsGroupDetailsError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
                    { member.email }
                  </li>
                )) }
              </AccordionTab>
            </Accordion>

            <div className={style.matchingDatesInfoContainer}>
              No matching dates yet
            </div>

            <div className={style.calendarContainer}>
              <DatePicker onChange={selectDate} slotProps={{ textField: { size: 'small' } }} style={{color: '#fff'}} />
              {selectedDate}
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default GroupDetails;