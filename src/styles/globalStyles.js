export const globalStyles = () => ({
  '::-webkit-scrollbar': {
    width: '10px',
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    background: 'var(--layout-0)',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: 'var(--primary-6)',
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: 'var(--primary-7)',
  },

  body: {
    backgroundColor: 'var(--layout-2)',
    color: 'var(--layout-7)',
  },
  '.mantine-Title-root': {
    color: 'var(--layout-6)',
  },
  'a, a: active, a: hover, a: visited': {
    textDecoration: 'none',
    color: 'inherit',
  },

  //html rtls inputStyle
  '[dir="rtl"] .htmlRtlIcon': {
    transform: 'rotate(180deg)',
  },

  '.PhoneInput': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  '.PhoneInput > .PhoneInputCountry': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  '.PhoneInput > input': {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    height: '36px',
    WebkitTapHighlightColor: 'transparent',
    lineHeight: '34px',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    msAppearance: 'none',
    appearance: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    fontSize: '14px',
    width: '100%',
    color: 'var(--skin-1)',
    display: 'block',
    textAlign: 'left',
    minHeight: '36px',
    paddingLeft: '36px',
    paddingRight: '12px',
    borderRadius: '4px',
    border: '1px solid var(--layout-4)',
    backgroundColor: 'var(--layout-1)',
    WebkitTransition: 'border-color 100ms ease',
    transition: 'border-color 100ms ease',
  },

  '.PhoneInput > input:focus': {
    outline: 'none!important',
  },

  '.PhoneInput > .PhoneInputCountry > div': {
    width: '50px',
    position: 'absolute',
    left: '349px',
    zIndex: -10,
    overflow: 'hidden',
    borderRadius: '4px',
  },
  '.PhoneInput > .PhoneInputCountry > select': {
    width: '50px',
    height: '40px',
    left: '350px',
    opacity: 0,
    transform: 'scale(0)',
    cursor: 'pointer',
    position: 'absolute',
  },

  '@media (max-width: 768px)': {
    '.PhoneInput > .PhoneInputCountry > select': {
      left: '180px',
    },
    '.PhoneInput > .PhoneInputCountry > div': {
      left: '179px',
    },
  },

  '.inputLabel': {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--layout-9)',
    wordBreak: 'break-word',
    cursor: 'default',
    WebkitTapHighlightColor: 'transparent',
  },

  '.invalidInput input': {
    color: '#fa5252',
    border: '1px solid #fa5252',
  },

  '.invalidInput input:focus': {
    color: '#fa5252',
    border: '1px solid #fa5252',
  },
  '.PhoneNumberInput': {
    width: '230px',
    borderRadius: '4px',
  },
  '@media (min-width: 768px)': {
    '.PhoneNumberInput': {
      width: '400px',
    },
  },

  // '.phoneNumberIcon': {
  //   pointerEvents: 'none',
  //   position: 'absolute',
  //   zIndex: 1,
  //   left: 0,
  //   top: 0,
  //   bottom: 0,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '36px',
  //   color: 'var(--layout-5)',
  // },

  '#your-id > [data-active]': {
    backgroundColor: 'pink',
  },
});

export default globalStyles;
