import React from 'react';

const RowItem = ({ config }) => {
  const dashSymbol = config.dashChar === 'none' ? '\u00A0' : config.dashChar;

  return (
    <div className="row-item">
      <input 
        type="text" 
        className="symbol-box-input" 
        maxLength="2" 
        spellCheck="false"
      />

      <div className="dash-char">
        {dashSymbol}
      </div>

      <input 
        type="text" 
        className="line-input" 
        spellCheck="false"
      />
    </div>
  );
};

export default RowItem;
