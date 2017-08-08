import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { compose } from 'ramda';
import { translate } from 'react-i18next';
import Page from '../components/page';
import ServiceType from '../components/plans/service-type';
import { placeholderLoader } from '../components/loader';
import { serviceTypeShape } from '../shapes/plans';

const plansQuery = gql`
  query PlansQuery {
    serviceTypes {
      id
      name
      plans(filter: future, order: sort_date, per_page: 4) {
        id
        title
        dates
      }
    }
  }
`;

const Plans = ({ data, t }) => (
  <Page title={t('plans')}>
    {data.serviceTypes.map(type => <ServiceType key={type.id} type={type} />)}
  </Page>
);

Plans.propTypes = {
  data: PropTypes.shape({
    serviceTypes: PropTypes.arrayOf(serviceTypeShape),
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  graphql(plansQuery),
  placeholderLoader(),
  translate('pages'),
)(Plans);
