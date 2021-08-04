import React from 'react';
import CircleSpinner from '@components/CircleSpinner';

const UserCover = ({ loadingPicture, customerData, language }) => {
  return (
    <div className="user-cover">
      {loadingPicture && <CircleSpinner />}
      {customerData.acl.status !== 'H' && (
        <div id="TooltipExample" className="info-label">
          {language[customerData.cumulativeMetricsProfile.highestRankShort]}
        </div>
      )}
      <div
        style={{
          top: customerData.acl.status !== 'H' ? 48 : '',
        }}
        className="info-label">
        <p>{'ID: '}</p>
      </div>
    </div>
  );
};

export default UserCover;
