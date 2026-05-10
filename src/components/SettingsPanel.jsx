import React, { useRef } from 'react';

const ControlGroup = ({ label, children, style }) => (
  <div className="control-group" style={style}>
    <label>{label}</label>
    {children}
  </div>
);

const SettingsPanel = ({ config, setConfig, presets }) => {
  const fileInputRef = useRef(null);
  const lang = config.lang || 'ru';

  const t = {
    ru: {
      header: "Конструктор",
      presets: "Базовые пресеты",
      download: "Скачать",
      load: "Загрузить",
      font: "Шрифт",
      rows: "Строк",
      titleSize: "Размер заголовка",
      alignment: "Выравнивание",
      alignTop: "Сверху",
      alignCenter: "Центр",
      alignBottom: "Снизу",
      titleColor: "Цвет заголовка",
      underline: "Подчеркивание",
      lineColor: "Цвет линии",
      showDate: "Показать дату",
      dateLine: "Линия даты",
      dateText: "Текст даты",
      pageBg: "Фон листа",
      rowLines: "Линии строк",
      textColor: "Цвет текста",
      dash: "Знак",
      dashEmpty: "Пусто",
      dashColor: "Цвет знака",
      columns: "Линия колонок",
      borderSq: "Граница кв.",
      bgSq: "Фон кв.",
      savePdf: "Сохранить в PDF"
    },
    en: {
      header: "Constructor",
      presets: "Base Presets",
      download: "Download",
      load: "Load",
      font: "Font",
      rows: "Rows",
      titleSize: "Title Size",
      alignment: "Alignment",
      alignTop: "Top",
      alignCenter: "Center",
      alignBottom: "Bottom",
      titleColor: "Title Color",
      underline: "Underline",
      lineColor: "Line Color",
      showDate: "Show Date",
      dateLine: "Date Line",
      dateText: "Date Text",
      pageBg: "Page Background",
      rowLines: "Row Lines",
      textColor: "Text Color",
      dash: "Dash",
      dashEmpty: "Empty",
      dashColor: "Dash Color",
      columns: "Column Line",
      borderSq: "Border sq.",
      bgSq: "Background sq.",
      savePdf: "Save to PDF"
    }
  }[lang];

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateColor = (colorKey, value) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value }
    }));
  };

  const handlePresetChange = (presetKey) => {
    if (presetKey === 'custom') {
      updateConfig('currentPreset', 'custom');
      return;
    }
    
    const p = presets[presetKey];
    setConfig(prev => ({
      ...prev,
      currentPreset: presetKey,
      tomeText: p.title,
      font: p.font,
      colors: {
        ...prev.colors,
        title: p.colors[0],
        titleBorder: p.colors[0],
        symbol: p.colors[1],
        dash: p.colors[2],
        separator: p.colors[3],
        date: p.colors[4],
        dateText: p.colors[4],
        cellBg: p.colors[5],
        pageBg: p.colors[6],
        lineText: p.colors[7] || "#333333",
        lineUnder: p.colors[8] || "rgba(0, 0, 0, 0.1)"
      }
    }));
  };

  const savePreset = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `preset-${config.tomeText.replace(/\s+/g, '_')}.json`;
    link.click();
  };

  const handleLoadJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        setConfig({ ...json, currentPreset: 'custom' });
      } catch (err) {
        alert("Error loading JSON");
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h1>{t.header}</h1>
        <select 
          value={config.lang} 
          onChange={(e) => updateConfig('lang', e.target.value)}
          className="lang-select"
        >
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>

      <ControlGroup label={t.presets}>
        <select 
          value={config.currentPreset || 'custom'} 
          onChange={(e) => handlePresetChange(e.target.value)}
        >
          <option value="custom">✨ Custom</option>
          {Object.keys(presets).map(key => (
            <option key={key} value={key}>{presets[key].title}</option>
          ))}
        </select>
      </ControlGroup>

      <div className="btn-group">
        <button className="action-btn" onClick={savePreset}>💾 {t.download}</button>
        <button className="action-btn" onClick={() => fileInputRef.current.click()}>📂 {t.load}</button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".json" 
          onChange={handleLoadJson} 
        />
      </div>

      <hr />

      <ControlGroup label={t.font}>
        <select value={config.font} onChange={(e) => updateConfig('font', e.target.value)}>
          <option value="'Great Vibes', cursive">Great Vibes</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
          <option value="'Caveat', cursive">Caveat</option>
          <option value="'Playfair Display', serif">Playfair Display</option>
          <option value="'Comfortaa', cursive">Comfortaa</option>
        </select>
      </ControlGroup>

      <div className="settings-row">
        <ControlGroup label={`${t.rows}: ${config.rowCount}`}>
          <input type="range" min="1" max="40" value={config.rowCount} onChange={(e) => updateConfig('rowCount', parseInt(e.target.value))} />
        </ControlGroup>
        <ControlGroup label={t.titleSize}>
          <input type="range" min="20" max="60" value={config.titleSize} onChange={(e) => updateConfig('titleSize', parseInt(e.target.value))} />
        </ControlGroup>
      </div>

      <div className="settings-row">
        <ControlGroup label={t.alignment}>
          <select value={config.titleAlign} onChange={(e) => updateConfig('titleAlign', e.target.value)}>
            <option value="flex-start">{t.alignTop}</option>
            <option value="center">{t.alignCenter}</option>
            <option value="flex-end">{t.alignBottom}</option>
          </select>
        </ControlGroup>
        <ControlGroup label={t.titleColor}>
          <input type="color" value={config.colors.title} onChange={(e) => updateColor('title', e.target.value)} />
        </ControlGroup>
      </div>

      <div className="settings-row">
        <div className="checkbox-group">
          <input type="checkbox" id="check-border" checked={config.showTitleBorder} onChange={(e) => updateConfig('showTitleBorder', e.target.checked)} />
          <label htmlFor="check-border">{t.underline}</label>
        </div>
        <ControlGroup label={t.lineColor}>
          <input type="color" value={config.colors.titleBorder} disabled={!config.showTitleBorder} onChange={(e) => updateColor('titleBorder', e.target.value)} />
        </ControlGroup>
      </div>

      <hr />

      <div className="settings-row date-settings">
        <div className="checkbox-group">
          <input type="checkbox" id="check-date" checked={config.showDate} onChange={(e) => updateConfig('showDate', e.target.checked)} />
          <label htmlFor="check-date">{t.showDate}</label>
        </div>
        <ControlGroup label={t.dateLine}>
          <input type="color" value={config.colors.date} disabled={!config.showDate} onChange={(e) => updateColor('date', e.target.value)} />
        </ControlGroup>
        <ControlGroup label={t.dateText}>
          <input type="color" value={config.colors.dateText} disabled={!config.showDate} onChange={(e) => updateColor('dateText', e.target.value)} />
        </ControlGroup>
      </div>

      <ControlGroup label={t.pageBg}>
        <input type="color" value={config.colors.pageBg} onChange={(e) => updateColor('pageBg', e.target.value)} className="full-width-color" />
      </ControlGroup>

      <div className="settings-row">
        <ControlGroup label={t.rowLines}>
          <input type="color" value={config.colors.lineUnder} onChange={(e) => updateColor('lineUnder', e.target.value)} />
        </ControlGroup>
        <ControlGroup label={t.textColor}>
          <input type="color" value={config.colors.lineText} onChange={(e) => updateColor('lineText', e.target.value)} />
        </ControlGroup>
      </div>

      <div className="settings-row">
        <ControlGroup label={t.dash}>
          <select value={config.dashChar} onChange={(e) => updateConfig('dashChar', e.target.value)}>
            <option value="none">{t.dashEmpty}</option>
            <option value="—">—</option>
            <option value="~">~</option>
            <option value="•">•</option>
            <option value="❤">❤</option>
          </select>
        </ControlGroup>
        <ControlGroup label={t.dashColor}>
          <input type="color" value={config.colors.dash} disabled={config.dashChar === 'none'} onChange={(e) => updateColor('dash', e.target.value)} />
        </ControlGroup>
      </div>

      <div className="settings-row">
        <div className="checkbox-group">
          <input type="checkbox" id="check-sep" checked={config.showSeparator} onChange={(e) => updateConfig('showSeparator', e.target.checked)} />
          <label htmlFor="check-sep">{t.columns}</label>
        </div>
        <ControlGroup label={t.lineColor}>
          <input type="color" value={config.colors.separator} disabled={!config.showSeparator} onChange={(e) => updateColor('separator', e.target.value)} />
        </ControlGroup>
      </div>

      <div className="settings-row">
        <ControlGroup label={t.borderSq}>
          <input type="color" value={config.colors.symbol} onChange={(e) => updateColor('symbol', e.target.value)} />
        </ControlGroup>
        <ControlGroup label={t.bgSq}>
          <input type="color" value={config.colors.cellBg} onChange={(e) => updateColor('cellBg', e.target.value)} />
        </ControlGroup>
      </div>

      <button className="print-btn" onClick={() => window.print()}>
        {t.savePdf}
      </button>
    </div>
  );
};

export default SettingsPanel;