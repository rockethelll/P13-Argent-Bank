import React from 'react';

const Input = React.forwardRef(({ label, type, ...rest }, ref) => {
  return (
    <div className='input-wrapper'>
      <label>{label}</label>
      <input type={type} ref={ref} {...rest} autoComplete={label} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
