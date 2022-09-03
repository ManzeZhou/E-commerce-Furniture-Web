import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../action/accountActions/auth';

export const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setLoading(true);
    dispatch(login(email, password))
      .then(() => {
        props.history.push('/cart');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });

    console.log('login successful', email, password);
  };

  return (
    <div className='col_1'>
      <div className='log-box'>
        <legend className='legend-heading'>
          <h2>Sign In</h2>
          <div className='log-required'>* Required</div>
        </legend>

        <Form onSubmit={handleSubmit}>
          <div className='form-row'>
            <Form.Group size='lg' controlId='email'>
              <Form.Label>Email*</Form.Label>
              <Form.Control
                autoFocus
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group size='lg' controlId='email'>
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button
              variant='danger'
              type='submit'
              disabled={!validateForm()}
              data-testid='sign-in'
            >
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
