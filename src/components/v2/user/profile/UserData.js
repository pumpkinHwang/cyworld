import React from 'react';
import {
  rankList,
  jsUcfirst,
  isMobile,
  isTablet,
  numeralFormat,
  getNativeName,
  getCountry,
  getCountryCode,
  checkAllowMenu,
  isNotProduction,
  dictionary,
  showOnDev,
} from '@components/GlobalHelpers';
import moment from 'moment';

const UserData = ({ language, customerData }) => {
  return (
    <div className="user-data">
      {language.language === 'EN' ? (
        <h6>{customerData.humanName.fullName}</h6>
      ) : (
        <h6>{getNativeName(customerData.humanName, 'nativeName')}</h6>
      )}

      <span>
        {language.joined}{' '}
        {moment.parseZone(customerData.joinDate).format('MMMM DD, YYYY')}
      </span>
    </div>
  );
};

export default UserData;
