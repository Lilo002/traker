import React, { useRef } from 'react';
import RowItem from './RowItem';

const TitleRow = ({ label, value, onChange }) => (
  <div className="title-row-item">
    <span className="title-label">{label}</span>
    <div
      contentEditable="true"
      className="title-input-field"
      onBlur={(e) => onChange(e.target.innerText)}
      dangerouslySetInnerHTML={{ __html: value }}
      suppressContentEditableWarning={true}
    />
  </div>
);

const Page = ({ config, setConfig }) => {
  const fileInputRef = useRef(null);
  
  const rows = Array.from({ length: config.rowCount });
  const mid = 20;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setConfig({ ...config, photoUrl: ev.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="page">
      <header className="header-section">
        <div className="title-area">
          <div className="title-rows-container">
            <TitleRow 
              label="Tome:" 
              value={config.tomeText} 
              onChange={(val) => setConfig({ ...config, tomeText: val })} 
            />
            <TitleRow 
              label="Page:" 
              value={config.pageText} 
              onChange={(val) => setConfig({ ...config, pageText: val })} 
            />
          </div>
        </div>

        <div className="photo-date-wrapper">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          
          <div 
            className="photo-wrapper" 
            onClick={() => fileInputRef.current.click()}
            style={{ border: config.photoUrl ? 'none' : '2px dashed #ccc' }}
          >
            {!config.photoUrl && (
              <span id="hint" style={{ fontSize: '8px', color: '#ccc' }}>
                {config.lang === 'ru' ? 'Клик для фото' : 'Click for photo'}
              </span>
            )}
            {config.photoUrl && (
              <img src={config.photoUrl} alt="Preview" className="tome-photo" style={{ display: 'block' }} />
            )}
          </div>

          {config.showDate && (
            <div className="date-block">
              <div className="dates-label">
                {config.lang === 'ru' ? <>START<br/>/ END</> : <>START<br/>/ END</>}
              </div>
              <input
                type="text"
                className="date-input"
                placeholder="27.03.2026 - 27.03.2026"
                value={config.dateRange || ''}
                onChange={(e) => setConfig({ ...config, dateRange: e.target.value })}
              />
            </div>
          )}
        </div>
      </header>

      <div className="columns-container">
        <div className="column column-left">
          {rows.slice(0, mid).map((_, i) => (
            <RowItem key={i} config={config} />
          ))}
        </div>
        <div className="column">
          {rows.slice(mid).map((_, i) => (
            <RowItem key={i + mid} config={config} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;