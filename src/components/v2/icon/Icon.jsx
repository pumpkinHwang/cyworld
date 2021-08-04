import * as React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, isLabel, style }) => {
  const [imgUrl, setImgUrl] = React.useState(undefined);
  const getIcon = () => {
    import('../../../assets/images/icons/icon_' + name + '.png').then(
      ({ default: _imgUrl }) => {
        setImgUrl(_imgUrl);
      }
    );
  };
  getIcon();
  return imgUrl !== undefined ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div>
        <img src={imgUrl} style={style} alt={''} />
      </div>
      {isLabel && (
        <div
          style={{
            fontSize: style.fontSize ? style.fontSize : 14,
            paddingTop: 5,
          }}>
          {name}
        </div>
      )}
    </div>
  ) : null;
};
Icon.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  isLabel: PropTypes.bool,
};

Icon.defaultProps = {
  style: {},
  isLabel: false,
};

export default Icon;
