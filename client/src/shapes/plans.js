import PropTypes from 'prop-types';

export const planShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  dates: PropTypes.string,
});

export const serviceTypeShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  plans: PropTypes.arrayOf(planShape),
});
