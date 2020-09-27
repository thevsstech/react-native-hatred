/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
const colors = {
  text: '#000',
  primary: '#5995fa',
  success: '#00cd98',
  error: '#ff5a6c',
  background: '#fbfcfd',

  backdrop: 'rgba(0, 0, 0, 0.1)',
  surface: '#fff',
  black: '#000',
  white: '#fff',
  placeholder: '#8f9fb3',
  label: '#8f9fb3',
  border: '#e6ebf1',
  transparent: 'transparent',
};

export default colors;
