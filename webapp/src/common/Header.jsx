//import { useState } from 'react';
import { createStyles, Image, Header, Group, Box, Text, Title } from '@mantine/core';
//import { useDisclosure } from '@mantine/hooks';
import { useLocation, Link } from 'react-router-dom';
import UserMenu from 'features/auth/user/UserMenu';

const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
  },

  left: {
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    marginRight: 10,
    marginLeft: 0,
  },

  links: {
    paddingTop: theme.spacing.s,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 50,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: -theme.spacing.sm,
  },

  mainLink: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    padding: `10px ${theme.spacing.sm}px`,
    fontWeight: 700,
    borderBottom: '2px solid transparent',
    transition: 'border-color 100ms ease, color 100ms ease',
    textDecoration: 'none',

    '&:hover': {
      color: '#0F1F54', //theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },

  secondaryLink: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: theme.fontSizes.xs,
    textTransform: 'uppercase',
    transition: 'color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },

  mainLinkActive: {
    color: '#0F1F54', //theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottomColor: '#0F1F54', //theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
  },
}));

export default function CustomHeader() {
  // const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const location = useLocation();

  const mainLinks = [
    { link: '/', label: 'Demo' },
  ];

  const mainItems = mainLinks.map((item, index) => (
    <Box
      component={Link}
      to={item.link}
      key={item.label}
      value={location.pathname}
      className={cx(classes.mainLink, { [classes.mainLinkActive]: location.pathname === item.link })}
    >
      {item.label}
    </Box>
  ));

  return (
    <Header sx={{ color: '#0F1F54' }} height={HEADER_HEIGHT} mb={120}>
      <Box className={classes.inner}>
        <Box className={classes.left}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingLeft: '20px' }}>
            <Title sx={{ fontSize: '18px', paddingBottom: '5px' }}>Seidr</Title>
            <Box sx={{ display: 'flex' }}>
              
              <Text>Skeleton App</Text>
            </Box>
          </Box>
        </Box>
        <Group spacing={0} position="right" className={classes.mainLinks}>
          {mainItems}
          <UserMenu />
        </Group>
      </Box>
    </Header>
  );
}
