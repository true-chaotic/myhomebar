import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import getBottleIcon from '../helpers/getBottleIcon';
import useBottlesQuery from '../helpers/useBottlesQuery';

export default function Bottles(): JSX.Element {
  const bottles = useBottlesQuery();

  return (
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
  );
}
