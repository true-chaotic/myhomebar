import * as React from 'react';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppAction, Initiator, UserAction } from '../consts';
import useLogsQuery from '../helpers/useLogsQuery';
import assertUnreachable from '../helpers/assertUnreachable';
import { LogEntry } from '../types';

const getIcon = ({ initiator }: LogEntry) => {
  if (initiator === Initiator.Application) {
    return <AppSettingsAltIcon />;
  }

  if (initiator === Initiator.User) {
    return <PersonIcon />;
  }

  return null;
};

const getText = (entry: LogEntry): string => {
  const { initiator, action } = entry;

  switch (initiator) {
    case Initiator.Application:
      switch (action) {
        case AppAction.Initialized:
          return 'Application initialized';
        default:
          return assertUnreachable(action);
      }
    case Initiator.User:
      switch (action) {
        case UserAction.AddedBottle:
          return `User added a bottle with id ${entry.object}`;
        case UserAction.AddedCocktail:
          return `User added a cocktail with id ${entry.object}`;
        default:
          return `User performed unknown action: ${action}`;
      }
    default:
      return assertUnreachable(initiator);
  }
};

export default function Logs(): JSX.Element {
  const logs = useLogsQuery();

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      {logs.map((entry) => (
        <ListItem key={entry.id}>
          <ListItemIcon>
            {getIcon(entry)}
          </ListItemIcon>
          <ListItemText
            primary={getText(entry)}
            secondary={new Date(entry.timestamp).toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
}
