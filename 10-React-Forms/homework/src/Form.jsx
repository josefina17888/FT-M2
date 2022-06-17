import React from 'react';

export default function  Form() {
  const [input, setInput] = React.useState({
    username: '',
    password: '',
  }); 
  const [errors, setErrors] = React.useState({});
  const handleSubmit = e => {
    e.preventDefault()
    console.log(input)
  }
  const handleInputChange = function (e) {
    setInput({...input, [e.target.name]: e.target.value});
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
 
  return (
      <div>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input className={errors.username && 'danger'} key="Username" type="text" name="username" onChange={handleInputChange} value={input.username}/>
          {errors.username && (
      <p className="danger">{errors.username}</p>
    )}
          </div>
          <div>
            <label>Password:</label>
          <input className={errors.password && 'danger'} key="Password" type="password" name="password" onChange={handleInputChange} value={input.password} />
          <input
        type="submit"
      />
      {errors.password && (
      <p className="danger">{errors.password}</p>
    )}
      </div>
        </form>
      </div>
  )
}

export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = 'Username is invalid';
  }
  if (!input.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*[0-9])/.test(input.password)) {
      errors.password = 'Password is invalid';
    }
  return errors;
};