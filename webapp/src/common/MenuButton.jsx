import React from "react";

// Components:
import { Tabs, Center, Button, Box, Text, Space } from "@mantine/core";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

export default function MenuButton({ to, name }) {
  return (
    <>
      <Tabs.Tab value={to}>
        <Text size="sm" weight={600}>{name}</Text>
      </Tabs.Tab>
      <Space w="md" />
    </>
  );
}
