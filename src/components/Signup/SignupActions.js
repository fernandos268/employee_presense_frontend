import { Button as AntdButton, Icon as AntdIcon } from 'antd';
import React from 'react';

export default props => {
  const { redirectToSignin, current, steps, next, prev } = props;

  switch (current) {
  }

  return (
    <div className="steps-action">
      <AntdButton.Group size="large">
        {current === 0 ? (
          <AntdButton type="primary" onClick={redirectToSignin}>
            <AntdIcon type="left" />
            Cancel
          </AntdButton>
        ) : null}

        {current > 0 && (
          <AntdButton type="primary" onClick={prev}>
            <AntdIcon type="left" />
            Back
          </AntdButton>
        )}
        {current < steps.length - 1 && (
          <AntdButton type="primary" onClick={next}>
            Next
            <AntdIcon type="right" />
          </AntdButton>
        )}
        {current === 2 ? (
          <AntdButton type="danger" onClick={redirectToSignin}>
            Cancel
          </AntdButton>
        ) : null}
      </AntdButton.Group>
    </div>
  );
};
