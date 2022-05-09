import * as React from 'react';
import { useCallback, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Bottles from './components/Bottles';
import Cocktails from './components/Cocktails';
import Container from './components/Container';
import FloatingActionButtons from './components/FloatingActionButtons';
import Logs from './components/Logs';
import { TabName } from './consts';
import addCocktail from './helpers/addCocktail';
import useAddCocktailPrompt from './modalHooks/useAddCocktailPrompt';

const boxStyle = { borderBottom: 1, borderColor: 'divider' };

const onAddBottleClick = () => {};

function App(): JSX.Element {
  const [tab, setTab] = useState<TabName>(TabName.Cocktails);
  const [addCocktailPopup, addCocktailWithDialog] = useAddCocktailPrompt();

  const handleChange = (event: React.SyntheticEvent, newTab: TabName) => {
    setTab(newTab);
  };

  const onAddCocktailClick = useCallback(async () => {
    const cocktail = await addCocktailWithDialog();

    if (cocktail) {
      await addCocktail(cocktail);
    }
  }, [addCocktailWithDialog]);

  return (
    <Container>
      <TabContext value={tab}>
        <Box sx={boxStyle}>
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
      <FloatingActionButtons
        tab={tab}
        onAddCocktailClick={onAddCocktailClick}
        onAddBottleClick={onAddBottleClick}
      />
    </Container>
  );
}

export default App;
