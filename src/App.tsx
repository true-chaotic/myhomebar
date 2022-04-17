import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import getBottleIcon from './helpers/getBottleIcon';
import Container from './components/Container';
import useBottlesQuery from './helpers/useBottlesQuery';
import useCocktailsQuery from './helpers/useCocktailsQuery';

function App(): JSX.Element {
  const bottles = useBottlesQuery();
  const cocktails = useCocktailsQuery();

  return (
    <Container>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {bottles.map(({
          id, name, type, volume: { total, left },
        }) => (
          <ListItem
            key={id}
            secondaryAction={getBottleIcon(total, left)}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={type} />
          </ListItem>
        ))}
      </List>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {cocktails.map(({ id, name, ingredients }) => (
          <ListItem
            key={id}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={ingredients.map(({ amount, type }) => `${type}: ${amount}ml`).join(', ')}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
