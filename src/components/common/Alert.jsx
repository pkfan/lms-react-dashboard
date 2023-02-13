import { Alert as MantineAlert, List, Text } from '@mantine/core';
import _ from 'lodash';
import { IconAlertCircle } from '@tabler/icons';

const Errors = ({ errors }) => {
  return (
    <List listStyleType="disc" sx={{ color: 'white' }}>
      {errors.map((error, index) => {
        return <List.Item key={index}>{error}</List.Item>;
      })}
    </List>
  );
};

function Alert({ errors, title, color }) {
  if (_.isArray(errors)) {
  }

  return (
    <MantineAlert
      icon={<IconAlertCircle size={24} />}
      title={title}
      color={color}
      sx={{ color: 'white' }}
      variant="filled"
    >
      {/* {forgetPasswordError?.errors} */}
      {_.isArray(errors) ? (
        <Errors errors={errors} />
      ) : (
        <Text sx={{ color: 'white' }}>{errors}</Text>
      )}
    </MantineAlert>
  );
}

export default Alert;
