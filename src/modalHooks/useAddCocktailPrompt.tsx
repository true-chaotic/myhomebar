import * as React from 'react';
import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COFFEE_LIQUOR, IRISH_CREAM, ORANGE_LIQUOR } from '../presets/types';
import { NewCocktailRecord } from '../types';

type Result = NewCocktailRecord | null;
type PopupAndResultPromise = [JSX.Element, () => Promise<Result>];

export default function useAddCocktailPrompt(): PopupAndResultPromise {
  const [
    handleClose,
    setHandleClose,
  ] = useState<((cocktail: Result) => void) | undefined>(undefined);

  const [cocktailName, setCocktailName] = useState<string>('');

  const formPrompt = () => new Promise<Result>((resolve) => {
    setHandleClose(() => (cocktail: Result) => {
      resolve(cocktail);

      if (cocktail) {
        setCocktailName('');
      }

      setHandleClose(undefined);
    });
  });

  const setResult = useCallback((cocktail: Result) => {
    if (handleClose) {
      handleClose(cocktail);
    }
  }, [handleClose]);

  const popup = (
    <Dialog open={Boolean(handleClose)} onClose={() => setResult(null)}>
      <form onSubmit={(event) => {
        event.preventDefault();

        setResult({
          name: cocktailName,
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
      }}
      >
        <DialogTitle>Add new cocktail</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cocktail name"
            fullWidth
            variant="standard"
            value={cocktailName}
            onChange={(event) => { setCocktailName(event.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={() => setResult(null)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return [popup, formPrompt];
}
