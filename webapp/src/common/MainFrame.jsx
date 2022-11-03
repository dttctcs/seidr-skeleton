import React from 'react';
import { useSeidrAuth } from 'seidr-react';

// Components:
import { AppShell, Drawer } from '@mantine/core';
import { Outlet, Navigate } from 'react-router-dom';

import SettingsPage from 'features/settings/SettingsPage';
import Header from 'common/Header';

// selectedTab, from column 23 deleted

export default function MainPage() {
  const { user, loading } = useSeidrAuth();


  if (loading) {
    return null;
  }

  return !user ? (
    <Navigate to="/login" />
  ) : (
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
