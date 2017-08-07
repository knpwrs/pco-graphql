import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import g, { Table } from 'glamorous';
import { translate } from 'react-i18next';
import Page from '../components/page';
import Card from '../components/card';
import { placeholderLoader } from '../components/loader';

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

const BarePlan = ({ plan, t }) => (
  <PlanRow>
    <DateCell>{plan.dates}</DateCell>
    <TitleCell>{plan.title || <LightText>{t('noTitle')}</LightText>}</TitleCell>
  </PlanRow>
);

BarePlan.propTypes = {
  plan: planShape.isRequired,
  t: PropTypes.func.isRequired,
};

const Plan = translate('plans')(BarePlan);

const BarePlanRows = ({ plans, t }) => (
  <Table width="100%">
    <thead>
      <tr>
        <ColHead>{t('date')}</ColHead>
        <ColHead>{t('title')}</ColHead>
      </tr>
    </thead>
    <tbody>
      {plans.map(plan => <Plan key={plan.id} plan={plan} />)}
    </tbody>
  </Table>
);

BarePlanRows.propTypes = {
  plans: PropTypes.arrayOf(planShape).isRequired,
  t: PropTypes.func.isRequired,
};

const PlanRows = translate('plans')(BarePlanRows);

const BareServiceType = ({ type, t }) => (
  <Card title={type.name}>
    {type.plans.length > 0
      ? <PlanRows plans={type.plans} />
      : <LightText>{t('noPlans')}</LightText>}
  </Card>
);

BareServiceType.propTypes = {
  type: serviceTypeShape.isRequired,
  t: PropTypes.func.isRequired,
};

const ServiceType = translate('plans')(BareServiceType);

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
