import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import useCocktailsQuery from '../helpers/useCocktailsQuery';

export default function Cocktails(): JSX.Element {
  const cocktails = useCocktailsQuery();

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
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
  );
}
