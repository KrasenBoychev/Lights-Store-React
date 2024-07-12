/* eslint-disable react/prop-types */
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../../api/api';
import toast from 'react-hot-toast';
import './LoginAndRegister.css';

export default function Register(props) {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await registerRequest(email, password);
    } catch (error) {
      toast(error.message);
      return;
    }
    
    props.setUserNav(true);
    navigate('/');
  };

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <div className="form-input">
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password should be 5 characters at least',
                },
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="Repeat Password"
              {...register('rePass', {
                required: 'Repeat Password is required',
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords do not match';
                },
              })}
              aria-invalid={errors.rePass ? 'true' : 'false'}
            />
            {errors.rePass && <p role="alert">{errors.rePass?.message}</p>}
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Have an account yet? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}
