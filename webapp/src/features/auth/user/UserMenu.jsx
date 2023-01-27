import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeidrAuth } from 'seidr-react';

import { Group, Menu, Text, UnstyledButton, createStyles } from '@mantine/core';
import {
  IconUserCheck,
  IconAppWindow,
  IconIdBadge2,
  IconLock,
  IconLogout,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.black,
    borderRadius: 100,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: '#0F1F54', //theme.colors.blue[1],
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colors.gray[5],
  },
}));

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, signout } = useSeidrAuth();
  const { classes, cx } = useStyles();
  const iconSize = 14;
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const basePath = '/security';
  const securityRoutes = [
    { path: basePath + '/users', label: 'Users', name: 'UsersApi', Icon: IconUsers },
    { path: basePath + '/roles', label: 'Roles', name: 'RolesApi', Icon: IconIdBadge2 },
    { path: basePath + '/permissions', label: 'Base Permissions', name: 'PermissionsApi', Icon: IconLock },
    { path: basePath + '/permissionview', label: 'Permission on Views', name: 'PermissionViewApi', Icon: IconLock },
    { path: basePath + '/viewsmenus', label: 'Views/Menus', name: 'ViewsMenusApi', Icon: IconAppWindow },
  ];

  const availableRoutes = securityRoutes.filter((route) => user.permissions.includes(route.name));

  return (
    <Menu
      width={260}
      position='bottom-end'
      transition='pop-top-right'
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target sx={{ height: 50, width: 50, marginRight: 30, marginLeft: 20, paddingLeft: '5px' }}>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group sx={{ width: 40, height: 40 }} spacing={7}>
            <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={0}>
              <Menu.Item
                sx={{
                  backgroundColor: 'white !important',
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  '& .mantine-Menu-item': {},
                }}
                icon={<IconUserCheck color='#0F1F54' />}
              />
            </Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Security</Menu.Label>
        {
          availableRoutes.map((route, index) => {
            return (
              <Menu.Item key={index} icon={<route.Icon size={iconSize} />} onClick={() => navigate(route.path)}>
                {route.label}
              </Menu.Item>
            );
          })
        }
        <Menu.Divider />
        <Menu.Label>User</Menu.Label>
        <Menu.Item icon={<IconUser size={iconSize} />}>Profile</Menu.Item>
        <Menu.Item icon={<IconLogout size={iconSize} />} onClick={signout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
