import { Paper } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export function Users() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="users/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}
