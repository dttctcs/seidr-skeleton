import { Paper } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export function Permissions() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="permissions/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}
