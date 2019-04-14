import React from 'react';
import {Link} from 'react-router-dom';

const LoginButton = (props) => {
  return (
    <Link className="" to={props.login || '/login'}>Login</Link>
  )
};

export default LoginButton;
