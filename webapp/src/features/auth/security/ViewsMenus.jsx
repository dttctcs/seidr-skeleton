import { Paper } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export function ViewsMenus() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='viewsmenus/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}
