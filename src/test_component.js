import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };

const MyAwesomeReactComponent = () => (
  <div style={styles.block}>
        <Checkbox
          label="Less Simple"
          style={styles.checkbox}
        />
  </div>
);

export default MyAwesomeReactComponent;