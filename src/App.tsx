import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from './components/Container';
import Bottles from './components/Bottles';
import Cocktails from './components/Cocktails';
import Logs from './components/Logs';
import FloatingActionButtons from './components/FloatingActionButtons';
import { TabName } from './consts';

function App(): JSX.Element {
  const [tab, setTab] = useState<TabName>(TabName.Cocktails);

  const handleChange = (event: React.SyntheticEvent, newTab: TabName) => {
    setTab(newTab);
  };

  const onFABClick = (clickForTab: TabName) => {
    console.log({ clickForTab });
  };

  return (
    <Container>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Options">
            <Tab label={TabName.Bottles} value={TabName.Bottles} />
            <Tab label={TabName.Cocktails} value={TabName.Cocktails} />
            <Tab label={TabName.Logs} value={TabName.Logs} />
          </TabList>
        </Box>
        <TabPanel value={TabName.Bottles}><Bottles /></TabPanel>
        <TabPanel value={TabName.Cocktails}><Cocktails /></TabPanel>
        <TabPanel value={TabName.Logs}><Logs /></TabPanel>
      </TabContext>
      <FloatingActionButtons tab={tab} onFABClick={onFABClick} />
    </Container>
  );
}

export default App;
