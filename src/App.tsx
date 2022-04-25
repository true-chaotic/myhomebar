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
import useAddCocktailPrompt from './modalHooks/useAddCocktailPrompt';
import { db } from './db';
import { COFFEE_LIQUOR, IRISH_CREAM, ORANGE_LIQUOR } from './presets/types';

function App(): JSX.Element {
  const [tab, setTab] = useState<TabName>(TabName.Cocktails);
  const [addCocktailPopup, addCocktailWithDialog] = useAddCocktailPrompt();

  const handleChange = (event: React.SyntheticEvent, newTab: TabName) => {
    setTab(newTab);
  };

  const onFABClick = (clickForTab: TabName) => {
    (async function onClick() {
      switch (clickForTab) {
        case TabName.Cocktails: {
          const name = await addCocktailWithDialog();

          if (name) {
            await db.cocktails.add({
              name,
              id: (Date.now()).toString(),
              ingredients: [{
                typeId: COFFEE_LIQUOR,
                amount: 20,
              }, {
                typeId: IRISH_CREAM,
                amount: 20,
              }, {
                typeId: ORANGE_LIQUOR,
                amount: 20,
              }],
            });
          }

          break;
        }
        /*
        case TabName.Bottles: {
          const newBottleName = await addCocktailWithDialog();

          if (newBottleName) {
            console.log({ newBottleName });
          }

          break;
        }
         */
        default:
      }
    }());
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
      {addCocktailPopup}
      <FloatingActionButtons tab={tab} onFABClick={onFABClick} />
    </Container>
  );
}

export default App;
