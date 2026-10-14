export type TypographyVariant = {
  fontSize: string;
  fontWeight: number;
};

export type Theme = {
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;

    background: string;
    backgroundSecondary: string;
    surface: string;
    border: string;

    text: string;
    textSecondary: string;
    textMuted: string;

    accent: string;

    error: string;
    success: string;
    warning: string;
    info: string;

    protons: string;
    neutrons: string;
    electrons: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  // Můžeš si ponechat další vlastnosti z tvého původního souboru
  fonts: {
    main: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  typography: Record<string, TypographyVariant>;
};

const typography: Record<string, TypographyVariant> = {
  h1: { fontSize: '3rem', fontWeight: 600 },      // 48px
  h2: { fontSize: '2.25rem', fontWeight: 600 },   // 36px
  h3: { fontSize: '1.75rem', fontWeight: 600 },   // 28px
  h4: { fontSize: '1.5rem', fontWeight: 600 },    // 24px
  bodyXL: { fontSize: '2rem', fontWeight: 600 },      // 32px
  bodyL: { fontSize: '1.25rem', fontWeight: 600 },    // 20px
  bodyM: { fontSize: '1rem', fontWeight: 500 },       // 16px
  bodyS: { fontSize: '1rem', fontWeight: 400 },       // 16px
  bodyXS: { fontSize: '0.75rem', fontWeight: 400 },   // 12px
};

export const lightTheme: Theme = {
  colors: {
    primary: '#F5F7FA',
    primaryHover: '#E4E7EB',
    secondary: '',

    background: '#F5F7FA',
    backgroundSecondary: '#dddfe7ff', // Tento je v obou stejný, zvaž sjednocení
    surface: '#FFFFFF',
    border: '#111827', // Zvaž '#dcdfe6' nebo podobnou barvu

    text: '#111827',
    textSecondary: '#596170',
    textMuted: '#5C6370',

    accent: '#007BFF',
    error: '#FF0000',
    success: '#00FF00',
    warning: '#FFA500',
    info: '#0000FF',
    
    protons: '#c82f46',
    neutrons: '#f5b041',
    electrons: '#3498db',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  fonts: { main: 'Inter, sans-serif' },
  spacing: { small: '8px', medium: '16px', large: '24px' },
  typography,
};

export const darkTheme: Theme = {
  colors: {
    primary: '#1A1A2E',
    primaryHover: 'none',
    secondary: 'none',

    background: '#201d22',
    backgroundSecondary: '#191919',
    surface: '#201d22', //1B1F34
    border: '#EAEAEA', // Zvaž 'rgba(255, 255, 255, 0.1)'

    text: '#EAEAEA',
    textSecondary: '#8892B0',
    textMuted: '#AAAAAA',

    accent: '#3498db',
    error: '#FF0000',
    success: '#00FF00',
    warning: '#FFA500',
    info: '#0000FF',

    protons: '#c82f46',
    neutrons: '#f5b041',
    electrons: '#3498db',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(255 255 255 / 0.05)',
    md: '0 4px 6px -1px rgb(255 255 255 / 0.1)',
    lg: '0 10px 15px -3px rgb(255 255 255 / 0.1)',
  },
  fonts: { main: 'Inter, sans-serif' },
  spacing: { small: '8px', medium: '16px', large: '24px' },
  typography,
};
