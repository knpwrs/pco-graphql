import PropTypes from 'prop-types';

/* eslint-disable import/prefer-default-export*/
export const personShape = PropTypes.shape({
  id: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_numbers: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
  })),
  emails: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })),
});
