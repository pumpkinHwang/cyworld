import React from 'react';

import UserData from './UserData';

const UserInfo = ({ customerData, language }) => {
  let isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  let profileImage = '';

  if (
    customerData != undefined &&
    customerData.profilePicture !== null &&
    customerData.profilePicture.sizes[1] !== undefined
  ) {
    profileImage = customerData.profilePicture.sizes[1].media.replace(
      /^http:\/\//i,
      'https://'
    );
  }

  return (
    <div className="user-info">
      {isMobile ? (
        <div className="user-avatar" style={{ position: 'relative' }}>
          <div>
            <label className="profile-pic" htmlFor="files">
              <img
                className="profile-pic"
                src={
                  profileImage !== ''
                    ? customerData.profilePicture.sizes[1].media.replace(
                        /^http:\/\//i,
                        'https://'
                      )
                    : require('@assets/person.png')
                }
                alt="profile me"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="user-avatar" style={{ position: 'relative' }}>
          <img
            className="profile-pic"
            style={{ border: 0 }}
            src={
              profileImage !== ''
                ? customerData.profilePicture.sizes[1].media.replace(
                    /^http:\/\//i,
                    'https://'
                  )
                : require('@assets/person.png')
            }
            alt="profile me"
          />
          <div className="overlay">
            <label style={{ cursor: 'pointer' }} htmlFor="files">
              <i className="fa fa-upload iconUpload"></i>
            </label>
          </div>
        </div>
      )}

      <UserData customerData={customerData} language={language} />
    </div>
  );
};

export default UserInfo;
