import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';
import { Div } from 'glamorous';

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

const planShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  dates: PropTypes.string,
});

const serviceTypeShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  plans: PropTypes.arrayOf(planShape),
});

const Plan = ({ plan }) => (
  <div>
    {plan.dates} - {plan.title}
  </div>
);

Plan.propTypes = {
  plan: planShape.isRequired,
};

const ServiceType = ({ type }) => (
  <div>
    <h3>{type.name}</h3>
    {type.plans.length > 0 ? type.plans.map(plan => <Plan key={plan.id} plan={plan} />) : 'No plans found.'}
  </div>
);

ServiceType.propTypes = {
  type: serviceTypeShape.isRequired,
};

const Plans = ({ data }) => (
  <div>
    <h2>Plans</h2>
    {data.serviceTypes.map(type => <ServiceType key={type.id} type={type} />)}
  </div>
);

Plans.propTypes = {
  data: PropTypes.shape({
    serviceTypes: PropTypes.arrayOf(serviceTypeShape),
  }).isRequired,
};

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="100%" height="100%" />
  )),
);

export default compose(
  graphql(plansQuery),
  placeholder,
)(Plans);
