import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { translate } from 'react-i18next';
import LightText from './light-text';
import { planShape } from '../../shapes/plans';

const TitleCell = g.td({
  fontWeight: 200,
});

const DateCell = g.td({
  width: '25%',
  fontWeight: 300,
});

const PlanRow = g.tr((props, { highlightColor }) => ({
  ':hover': {
    backgroundColor: highlightColor,
  },
}));

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

export default Plan;
