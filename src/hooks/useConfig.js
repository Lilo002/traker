import { useState, useEffect, useMemo } from 'react';

const DEFAULT_CONFIG = {
  lang: 'ru',
  font: "'Great Vibes', cursive",
  tomeText: "Princesses",
  pageText: "1",
  rowCount: 40,
  titleSize: 35,
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

export const useConfig = () => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('lilo_constructor_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('lilo_constructor_config', JSON.stringify(config));
  }, [config]);

  const cssVariables = useMemo(() => ({
    '--main-pink': config.colors.title,
    '--symbol-color': config.colors.symbol,
    '--dash-color': config.colors.dash,
    '--separator-color': config.colors.separator,
    '--date-color': config.colors.date,
    '--date-text-color': config.colors.dateText,
    '--cell-bg': config.colors.cellBg,
    '--page-bg': config.colors.pageBg,
    '--line-under-color': config.colors.lineUnder,
    '--line-text-color': config.colors.lineText,
    '--main-font': config.font,
    '--title-size': `${config.titleSize}pt`,
    '--title-align': config.titleAlign,
    '--separator-display': config.showSeparator ? 'block' : 'none',
    '--date-display': config.showDate ? 'flex' : 'none',
    '--title-border-display': config.showTitleBorder 
      ? `3px solid ${config.colors.titleBorder}` 
      : 'none',
  }), [config]);

  return { config, setConfig, cssVariables };
};