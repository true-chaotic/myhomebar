import { ListSubheader } from '@mui/material';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Container from './components/Container';
import useCocktailsQuery from './helpers/useCocktailsQuery';

function App(): JSX.Element {
  const cocktails = useCocktailsQuery();

  return (
    <Container>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        aria-labelledby="cocktails-subheader"
        subheader={(
          <ListSubheader component="h2" id="cocktails-subheader">
            Cocktails
          </ListSubheader>
            )}
      >

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
