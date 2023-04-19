import { createStyles, Flex, Paper, Text, Alert, Anchor } from '@mantine/core';
import { FullPageLoader, Button, Logo } from '@/components';
import { useLocation, Link, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useSuccessfullyVerifiedEmailQuery } from '@/views/auth/api';
import { IconCheck, IconAlertCircle } from '@/components/icons';

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: '36px',
    width: '100%',
    padding: '16px',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: '600px',
    },
  },
  paper: {
    width: '100%',
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: theme.colors.lmsSkin[0],
    color: theme.colors.lmsSkin[1],
  },
}));

export function SuccessfullyVerifiedEmail() {
  let params = useParams();
  const location = useLocation();
  const query = location.search;
  const queryObject = queryString.parse(query);

  const { classes } = useStyles();

  const {
    isFetching: isSuccessfullyVerifiedEmailFetching,
    isSuccess: isSuccessfullyVerifiedEmailSuccess,
    isError: isSuccessfullyVerifiedEmailError,
  } = useSuccessfullyVerifiedEmailQuery({ ...params, ...queryObject });

  return (
    <>
      {isSuccessfullyVerifiedEmailFetching && <FullPageLoader />}

      <Flex
        className={classes.container}
        justify="center"
        align="center"
        direction="column"
        gap={12}
      >
        <Logo width="80px" />
        <Text fz={24}>Lms Pro</Text>

        <Paper withBorder shadow="xl" className={classes.paper}>
          {isSuccessfullyVerifiedEmailSuccess && (
            <>
              <Alert
                title="Verify Successfully"
                icon={<IconCheck size={16} />}
                color="green"
                variant="filled"
              >
                <Text>Your Email Address has been verified successfully</Text>
              </Alert>
              <Flex justify="end" align="center" w="100%" maw={400}>
                <Button component={Link} to="/lms/login">
                  Go to Dashboard
                </Button>
              </Flex>
            </>
          )}
          {isSuccessfullyVerifiedEmailError && (
            <>
              <Alert
                title="Error!"
                icon={<IconAlertCircle size={16} />}
                color="red"
                variant="filled"
              >
                <Text>
                  This Link has been expired,{' '}
                  <Anchor component={Link} fw={500} to="/lms/login">
                    sign in
                  </Anchor>{' '}
                  to generate new email verification Link.
                </Text>
              </Alert>
              <Flex justify="end" align="center" w="100%" maw={400}>
                <Button component={Link} to="/lms/login">
                  LOGIN
                </Button>
              </Flex>
            </>
          )}
        </Paper>
      </Flex>
    </>
  );
}

export default SuccessfullyVerifiedEmail;
