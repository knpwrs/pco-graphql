import g from 'glamorous';

export default g.div(({ center, column }) => ({
  width: '100vw',
  height: '100vh',
  display: center ? 'flex' : 'block',
  alignItems: center ? 'center' : null,
  justifyContent: center ? 'center' : null,
  flexDirection: column ? 'column': null,
}));
