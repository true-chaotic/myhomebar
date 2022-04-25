import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function useAddCocktailPrompt(): [JSX.Element, () => Promise<string | undefined>] {
  const [handleClose, setHandleClose] = useState<(name?: string) => void | undefined>(undefined);
  const [cocktailName, setCocktailName] = useState<string>('');

  const formPrompt = () => new Promise((resolve) => {
    setHandleClose(() => (name) => {
      resolve(name);

      if (name) {
        setCocktailName('');
      }

      setHandleClose(undefined);
    });
  });

  const popup = (
    <Dialog open={Boolean(handleClose)} onClose={() => handleClose(undefined)}>
      <form onSubmit={(event) => {
        event.preventDefault();

        handleClose(cocktailName);
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
          <Button type="button" onClick={() => handleClose(undefined)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return [popup, formPrompt];
}
