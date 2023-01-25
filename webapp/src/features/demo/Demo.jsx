import { Box } from '@mantine/core';
import { DataGrid, SeidrApiProvider } from 'seidr-react';

export default function Demo() {
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ padding: '20px', height: '95%', display: 'flex', alignItems: 'stretch' }}>
        <Box sx={{ flex: 1 }}>
          {/* Use any SeidrApi with its resource_name */}
          {/*<SeidrApiProvider path='/resource_name'>*/}
          {/*  <DataGrid />*/}
          {/*</SeidrApiProvider>*/}
        </Box>
      </Box>
    </Box>
  );
}
