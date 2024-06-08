import { useNavigate } from 'react-router-dom';
import style from './LandingPage.module.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGroupInputChange = (event) => {
    console.log('VALUE', event.target.value);
  }
  const searchGroup = () => {
    console.log('searching...')
  }
  
  return (
    <div className={style.landingPageView}>
      <div className={style.landingContainer}>
        <p className={style.mainText}>
          <span style={ { color: '#fff' } }>When you can</span> allows you to organize <span style={ { color: '#fff' } }>effectively</span> those things you want to do with your <span style={ { color: '#fff' } }>friends</span>
        </p>

        <div className={style.inputButtonContainer}>
          <label style={ { color: '#fff', fontSize: '20px' } }>Find a Group</label>
          <div className={style.inputContainer}>
            <input onChange={handleGroupInputChange} className={style.searchGroupInput} type='text' placeholder='Search for a group...' />
            <button onClick={searchGroup} className={style.searchGroupButton}><i className='pi pi-search'></i></button>
          </div>

          <span style={ { color: '#fff', fontSize: '20px' } }>Or</span>

          <button
            onClick={() => navigate('/create_group')}
            className={style.createGroupButton}
            >
            Create Group +
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;