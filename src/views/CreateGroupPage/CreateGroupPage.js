import style from './CreateGroupPage.module.css';
import CreateGroupForm from '../../components/Auth/CreateGroupForm/CreateGroupForm';

function SignupPage() {
  return (
    <div className={style.signupPagePageContainer}>
      <CreateGroupForm />
    </div>
  )
}

export default SignupPage;