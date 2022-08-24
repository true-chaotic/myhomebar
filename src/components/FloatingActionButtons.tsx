import { useCallback } from 'react';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import { TabName } from '../consts';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

const fabs = [
  {
    color: 'primary' as 'primary',
    sx: fabStyle,
    icon: <AddIcon />,
    label: 'Add bottle',
    tab: TabName.Bottles,
    cy: 'add-bottle-button',
  },
  {
    color: 'primary' as 'primary',
    sx: fabStyle,
    icon: <AddIcon />,
    label: 'Add cocktail',
    tab: TabName.Cocktails,
    cy: 'add-cocktail-button',
  },
];

interface Props {
  tab: TabName;
  onAddCocktailClick: () => void;
  onAddBottleClick: () => void;
}

export default function FloatingActionButtons({
  tab,
  onAddCocktailClick,
  onAddBottleClick,
}: Props): JSX.Element {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const onFABClick = useCallback(() => {
    switch (tab) {
      case TabName.Bottles:
        return onAddBottleClick();
      case TabName.Cocktails:
        return onAddCocktailClick();
      default:
        return undefined;
    }
  }, [tab, onAddCocktailClick, onAddBottleClick]);

  return (
    <>
      {fabs.map((fab) => (
        <Zoom
          key={fab.tab}
          in={tab === fab.tab}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              tab === fab.tab ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            data-cy={fab.cy}
            sx={fab.sx}
            aria-label={fab.label}
            color={fab.color}
            onClick={onFABClick}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
}
