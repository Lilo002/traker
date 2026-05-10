import React, { useState, useEffect } from 'react';
import SettingsPanel from './components/SettingsPanel';
import Page from './components/Page';
import './index.css';

const PRESETS = {
  princesses: { title: "Princesses Tome 1", colors: ["#FF4500", "#FFA07A", "#FFB6C1", "#FFB6C1", "#E9967A", "#FFF0F5", "#FFFFFF", "#4F4F4F"], font: "'Great Vibes', cursive" },
  princesses2: { title: "Princesses Tome 2", colors: ["#FF69B4", "#DA70D6", "#87CEFA", "#DDA0DD", "#FF1493", "#FDF0FD", "#FFFFFF", "#4B0082"], font: "'Montserrat', sans-serif" },
  looney: { title: "Looney Tunes", colors: ["#FF8C00", "#9400D3", "#FFD700", "#00BFFF", "#FF0000", "#F8F0FF", "#FFFFFF", "#333333"], font: "'Caveat', cursive" },
  classic11: { title: "Les Grands Classiques 11", colors: ["#E31E24", "#D81B60", "#F4A460", "#FFE4E1", "#228B22", "#FFF0F5", "#FFFFFF", "#333333"], font: "'Great Vibes', cursive" },
  romantasy: { title: "Romantasy", colors: ["#800080", "#FF00FF", "#C0C0C0", "#FFF0FD", "#4682B4", "#E6E6FA", "#FFFFFF", "#333333"], font: "'Comfortaa', cursive" },
  portraits: { title: "Portraits de famille", colors: ["#E3504B", "#4B2E2A", "#20B2AA", "#98FB98", "#FF8C00", "#FFF9F0", "#FFFFFF", "#2F4F4F"], font: "'Playfair Display', serif" }
};

function App() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('lilo_config');
    if (saved) return JSON.parse(saved);

    return {
      lang: 'ru',
      font: "'Great Vibes', cursive",
      tomeText: "Princesses",
      pageText: "1",
      rowCount: 40,
      titleSize: 30,
      titleAlign: 'flex-end',
      showTitleBorder: false,
      showSeparator: false,
      showDate: true,
      dashChar: '—',
      dateRange: '',
      photoUrl: null,
      colors: {
        title: '#E31E24',
        titleBorder: '#E31E24',
        symbol: '#D81B60',
        dash: '#F4A460',
        separator: '#FFE4E1',
        date: '#228B22',
        dateText: '#228B22',
        cellBg: '#FFF0F5',
        pageBg: '#FFFFFF',
        lineUnder: 'rgba(0, 0, 0, 0.1)',
        lineText: '#333333'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('lilo_config', JSON.stringify(config));
    const r = document.documentElement;
    r.style.setProperty('--main-pink', config.colors.title);
    r.style.setProperty('--symbol-color', config.colors.symbol);
    r.style.setProperty('--dash-color', config.colors.dash);
    r.style.setProperty('--separator-color', config.colors.separator);
    r.style.setProperty('--date-color', config.colors.date);
    r.style.setProperty('--date-text-color', config.colors.dateText);
    r.style.setProperty('--cell-bg', config.colors.cellBg);
    r.style.setProperty('--page-bg', config.colors.pageBg);
    r.style.setProperty('--line-under-color', config.colors.lineUnder);
    r.style.setProperty('--line-text-color', config.colors.lineText);
    r.style.setProperty('--main-font', config.font);
    r.style.setProperty('--title-size', `${config.titleSize}pt`);
    r.style.setProperty('--title-align', config.titleAlign);
    r.style.setProperty('--separator-display', config.showSeparator ? 'block' : 'none');
    r.style.setProperty('--date-display', config.showDate ? 'flex' : 'none');
    r.style.setProperty('--title-border-display', config.showTitleBorder ? `3px solid ${config.colors.titleBorder}` : 'none');
  }, [config]);

  return (
    <div className="main-container">
      <div className="pages-container">
        <Page config={config} setConfig={setConfig} />
      </div>
      <SettingsPanel config={config} setConfig={setConfig} presets={PRESETS} />
    </div>
  );
}

export default App;