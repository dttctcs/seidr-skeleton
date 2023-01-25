import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import Header from 'common/Header';

export default function MainFrame() {
  return (
    <AppShell
      padding={0}
      header={<Header />}
      styles={(theme) => ({
        header: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
