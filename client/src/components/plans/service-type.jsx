import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Card from '../card';
import PlanRows from './plan-rows';
import LightText from '../light-text';
import { serviceTypeShape } from '../../shapes/plans';

const BareServiceType = ({ type, t }) => (
  <Card title={type.name}>
    <h3>{type.name}</h3>
    {type.plans.length > 0 ? (
      <PlanRows plans={type.plans} />
    ) : (
      <LightText text={t('noPlans')} />
    )}
  </Card>
);

BareServiceType.propTypes = {
  type: serviceTypeShape.isRequired,
  t: PropTypes.func.isRequired,
};

const ServiceType = translate('plans')(BareServiceType);

export default ServiceType;
