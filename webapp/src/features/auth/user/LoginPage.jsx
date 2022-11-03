import { Navigate } from 'react-router-dom';
import { useSeidrAuth } from 'seidr-react';
import { useForm } from '@mantine/form';

import { Alert, Box, Image, Button, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';

export default function LoginPage(props) {
  const passwordMinLength = 5;
  const { user, loading, error, signin } = useSeidrAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      password: (val) => (val.length < passwordMinLength ? 'Password should include at least 5 characters' : null),
    },
  });

  const onSubmit = (data) => {
    signin(data);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 20 }}>
        <Text size="xl" weight={500}>
          Seidr React Login
        </Text>
      </Box>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          LOGIN
        </Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.username && 'Invalid username'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && `Password should include at least ${passwordMinLength} characters`}
            />
          </Stack>

          <Group position="apart" mt="xl">
            {error ? (
              <Alert sx={{ flex: 1 }} title="Bummer!" color="red">
                {error}
              </Alert>
            ) : null}
            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}
