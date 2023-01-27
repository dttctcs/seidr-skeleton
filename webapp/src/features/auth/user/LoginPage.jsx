import { Navigate } from 'react-router-dom';
import { useSeidrAuth } from 'seidr-react';
import { useForm } from '@mantine/form';
import { Alert, Button, Card, Flex, PasswordInput, Stack, TextInput, Title } from '@mantine/core';

export default function LoginPage(props) {
  const passwordMinLength = 5;
  const { user, loading, error, signin } = useSeidrAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      password: (val) => (val.length < passwordMinLength ? `Password should include at least ${passwordMinLength} characters` : null),
    },
  });

  const onSubmit = (data) => signin(data);

  if (user) return <Navigate to='/' />;

  return (
    <Flex
      h='100vh'
      justify='center'
      align='center'
      direction='column'
    >
      <Title p='md'>{process.env.REACT_APP_NAME}</Title>
      <Card radius='md' p='xl' withBorder {...props}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              label='Name'
              placeholder='Username'
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.username && 'Invalid username'}
            />
            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && `Password should include at least ${passwordMinLength} characters`}
            />
            {error ? (<Alert title='Login failed' color='red'>{error}</Alert>) : null}
            <Button type='submit' loading={loading} fullWidth>Login</Button>
          </Stack>
        </form>
      </Card>
    </Flex>
  );
}
