import * as React from 'react';

const StatusBox = ({message, type}) => {
  let wrapperClass = 'form-group';
  
  return (
    <div className={wrapperClass}>
      <div className="field">
              {message && <div className="alert alert-error">{message}</div>}
      </div>
    </div>
  );
};

export default StatusBox;
