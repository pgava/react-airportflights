import * as React from 'react';

const StatusBox = ({message, type}) => {
  let wrapperClass = 'form-group';
  let alertType = `alert alert-${type}`;
  return (      
    <div className={wrapperClass}>
      <div className="field">
              {message && <div className={alertType}>{message}</div>}
      </div>
    </div>
  );
};

export default StatusBox;
