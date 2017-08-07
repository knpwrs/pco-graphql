import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import StyledLink from './styled-link';

const PageNavLink = StyledLink({
  textDecoration: 'none',
}, ({ only, right }, { primaryColor }) => ({
  textAlign: right ? 'right' : 'left',
  color: primaryColor,
  width: only ? '100%' : '50%',
}));

const PageNavBar = ({ root, page, perPage, totalRecords, currentRecords }) => {
  const isFirstPage = page === 0;
  const isSecondPage = page === 1;
  const isLastPage = (page * perPage) + currentRecords >= totalRecords;

  const prevTo = `/${root}${isSecondPage ? '' : `?page=${page - 1}`}`;
  const nextTo = `/${root}?page=${page + 1}`;
  return (
    <Div display="flex">
      {isFirstPage || <PageNavLink to={prevTo} only={isLastPage}>{'<'} Prev</PageNavLink>}
      {isLastPage || <PageNavLink to={nextTo} only={isFirstPage} right>Next {'>'}</PageNavLink>}
    </Div>
  );
};

PageNavBar.propTypes = {
  root: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  currentRecords: PropTypes.number.isRequired,
};

export default PageNavBar;
