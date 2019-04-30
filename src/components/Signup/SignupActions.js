import { Button as AntdButton, Icon as AntdIcon } from 'antd';
import React from 'react';

export default props => {
  const { current, steps, handleStepChange } = props;

  switch (current) {
  }

  return (
    <div className="steps-action">
      <AntdButton.Group size="large">
        {current === 0 ? (
          <AntdButton type="primary" onClick={() => handleStepChange('cancel')}>
            <AntdIcon type="left" />
            Cancel
          </AntdButton>
        ) : null}

        {current > 0 && (
          <AntdButton type="primary" onClick={() => handleStepChange('back')}>
            <AntdIcon type="left" />
            Back
          </AntdButton>
        )}
        {current < steps.length - 1 && (
          <AntdButton type="primary" onClick={() => handleStepChange('next')}>
            Next
            <AntdIcon type="right" />
          </AntdButton>
        )}
        {current === 2 ? (
          <AntdButton type="danger" onClick={() => handleStepChange('cancel')}>
            Cancel
          </AntdButton>
        ) : null}
      </AntdButton.Group>
    </div>
  );
};
