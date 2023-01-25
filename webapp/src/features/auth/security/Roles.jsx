import { Paper } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export function Roles() {
  return (
    <Paper sx={{ flex: 1, overflow: 'hidden' }}>
      <SeidrApiProvider path="roles/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}
