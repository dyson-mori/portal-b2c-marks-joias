const success = '#5CB85C';
const warning = '#f9BE14';

const themes = {
  colors: { // remover cores
    primary: '#FA0B5B',

    white: '#fff',

    background: '#FCFCFC',

    hover: '#f1f1f1',

    success,
    warning,

    dark_charcoal: '#303030',
    granite_gray: '#606060',
    philippine_gray: '#909090'
  },
  font: {
    size: {
      thin: '0.625rem', // 10px
      extraLight: '0.75rem', // 12px
      light: '0.875rem', // 14px
      normal: '1rem', // 16px
      medium: '1.125rem', // 18px
      bold: '1.25rem', // 20px
      semiBold: '1.375rem', // 22px
      extraBold: '1.5rem', // 24px
      black: '1.625rem', // 26px
      extraBlack: '1.75rem', // 28px
      large: '1.875rem' // 30px
    },
    family: {
      montserrat: 'var(--font-montserrat), sans-serif',
      montserrat_alternates: 'var(--font-montserrat-alternates), sans-serif',
    },
    weight: { // remover isso
      '100': 100,
      '200': 200,
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
      '800': 800,
      '900': 900,
    }
  },
  responsive: {
    mobile: 767,    // iPhone, Android phones
    desktop: 1024,  // Laptops, monitores maiores
  },
  settings: {
    grid: {
      template: {
        columns: {
          products: {
            1600: {
              minPixels: '1600px',
              grid: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
            },
            1400: {
              minPixels: '1400px',
              grid: 'repeat(auto-fill, minmax(calc(100% / 4), 1fr))',
            },
          }
        },
      },
      gridTemplateColumnsProducts: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
      gridTemplateColumnsPanel: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
    },
    padding: {
      button: '0 10px'
    },
    radius: {
      small: '3px',
      default: '6px',
      large: '9px'
    },
    box: {
      default: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      defaultHoverPrimary: 'rgba(251, 59, 123, 0.05) 0px 6px 24px 0px, rgba(251, 59, 0, 123.08) 0px 0px 0px 1px',
      border: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      simple: '1px 1px 5px #DEDEDE',
      warning: `1px 1px 5px ${warning}`,
    },
    responsive: {
      margin: '10px 20px',
      padding: '10px 20px',
      paddingHeader: '0 20px',
      maxWidth: '600px',

      maxScreen: '1920px',

      mobile: 767,    // iPhone, Android phones
      desktop: 1024,  // Laptops, monitores maiores
    }
  }
};

export default themes