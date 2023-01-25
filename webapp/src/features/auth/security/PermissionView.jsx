import { Paper } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export function PermissionView() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='permissionview/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}
