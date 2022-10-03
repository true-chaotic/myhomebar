import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COFFEE_LIQUOR, IRISH_CREAM, ORANGE_LIQUOR } from '../presets/types';
import { NewCocktailRecord } from '../types';

export type Result = NewCocktailRecord | null;

interface Props {
  open: boolean;
  setResult: (bottle: Result) => void;
}

export default function CocktailModal({ open, setResult }: Props) {
  const [cocktailName, setCocktailName] = useState<string>('');

  return (
    <Dialog open={open} onClose={() => setResult(null)}>
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
            inputProps={{ inputMode: 'text', name: 'cocktail-name', 'data-cy': 'cocktail-name' }}
            onChange={(event) => { setCocktailName(event.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button data-cy="cancel-button-cocktail" type="button" onClick={() => setResult(null)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
