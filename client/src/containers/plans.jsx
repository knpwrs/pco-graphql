import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';
import g, { Div, Table } from 'glamorous';
import Page from '../components/page';
import Card from '../components/card';

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

const ColHead = g.th({
  textAlign: 'left',
  fontWeight: 300,
});

const DateCell = g.td({
  width: '25%',
  fontWeight: 300,
});

const TitleCell = g.td({
  fontWeight: 200,
});

const PlanRow = g.tr((props, { highlightColor }) => ({
  ':hover': {
    backgroundColor: highlightColor,
  },
}));

const LightText = g.span({
  opacity: 0.2,
});

const Plan = ({ plan }) => (
  <PlanRow>
    <DateCell>{plan.dates}</DateCell>
    <TitleCell>{plan.title || <LightText>No Title</LightText>}</TitleCell>
  </PlanRow>
);

Plan.propTypes = {
  plan: planShape.isRequired,
};

const PlanRows = ({ plans }) => (
  <Table width="100%">
    <thead>
      <tr>
        <ColHead>Date</ColHead>
        <ColHead>Title</ColHead>
      </tr>
    </thead>
    <tbody>
      {plans.map(plan => <Plan key={plan.id} plan={plan} />)}
    </tbody>
  </Table>
);

PlanRows.propTypes = {
  plans: PropTypes.arrayOf(planShape).isRequired,
};

const ServiceType = ({ type }) => (
  <Card title={type.name}>
    {type.plans.length > 0
      ? <PlanRows plans={type.plans} />
      : <LightText>No plans found</LightText>}
  </Card>
);

ServiceType.propTypes = {
  type: serviceTypeShape.isRequired,
};

const Plans = ({ data }) => (
  <Page title="Plans">
    {data.serviceTypes.map(type => <ServiceType key={type.id} type={type} />)}
  </Page>
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
