import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/registerForm_r/RegisterForm';
import css from './Register.module.css';

export default function Register() {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
}
