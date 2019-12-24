const colors = {
  black: 'rgb(0,0,0)',
  gray: 'rgb(42, 42, 42)',
  green: 'rgb(76,122,52)',
  lightBlue: 'rgb(173,216,230)',
  lightGray: 'rgb(187,187,187)',
  lightGreen: 'rgb(231,240,237)',
  navyBlue: 'rgb(2,31,84)',
  red: 'rgb(195, 0, 22)',
  regularGray: 'rgb(126,126,126)',
  white: 'rgb(255, 255, 255)',
};

const background = {
  backgroundColor: colors.lightGreen,
};

const button = {
  backgroundColor: colors.navyBlue,
  color: colors.white,
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '8px',
};

const errorDiv = {
  padding: '3% 0',
  textAlign: 'center',
  display: 'none',
};

const header = {
  color: colors.white,
  backgroundColor: colors.white,
};

const headerRightPanel = {
  paddingRight: '3%',
  paddingTop: '5%',
};

const loggedOutForms = {
  padding: '0 15%',
  textAlign: 'center',
};

const siteName = {
  fontFamily: 'OpenSans-Semibold',
  fontSize: '20px',
  backgroundColor: colors.white,
};

const socialSitesIcons = {
  fontSize: '23px',
  paddingRight: '12px',
}

const textLabel = {
  fontFamily: 'Lato-Light',
};

export {
  background,
  button,
  colors,
  errorDiv,
  header,
  headerRightPanel,
  loggedOutForms,
  siteName,
  socialSitesIcons,
  textLabel
};
