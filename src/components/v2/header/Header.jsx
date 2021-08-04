import * as React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const HeaderComponent = ({ title, rightTitle, rightCell }) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 0,
                    paddingVertical: 0,
                    paddingBottom: 0,
                    marginTop: 20
                }}>
                <h4>{title}</h4>
                {rightTitle && (
                    <h5 style={{ fontSize: 15, color: '#333333' }}>
                        {rightTitle.length > 0 ? rightTitle : ''}
                    </h5>
                )}

                {rightCell && rightCell()}
            </div>

            <hr style={{ marginTop: 5, marginBottom: 30 }} />
        </>
    )
}
HeaderComponent.propTypes = {
    title: PropTypes.string,
    rightTitle: PropTypes.string
}

HeaderComponent.defaultProps = {
    title: '',
    rightTitle: '',
    rightCell: undefined
}

export default HeaderComponent
