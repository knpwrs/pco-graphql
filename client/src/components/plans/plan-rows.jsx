import React from 'react';
import PropTypes from 'prop-types';
import g, { Table } from 'glamorous';
import { translate } from 'react-i18next';
import Plan from './plan';
import { planShape } from '../../shapes/plans';

const ColHead = g.th({
  textAlign: 'left',
  fontWeight: 300,
});

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

export default PlanRows;
