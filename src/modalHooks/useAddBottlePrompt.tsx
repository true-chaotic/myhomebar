import * as React from 'react';
import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { COFFEE_LIQUOR, IRISH_CREAM, ORANGE_LIQUOR } from '../presets/types';
import { NewBottleRecord } from '../types';

type Result = NewBottleRecord | null;
type PopupAndResultPromise = [JSX.Element, () => Promise<Result>];

export default function useBottlePrompt(): PopupAndResultPromise {
  const [
    handleClose,
    setHandleClose,
  ] = useState<((bottle: Result) => void) | undefined>(undefined);

  const [bottleName, setBottleName] = useState<string>('');
  const [totalVolume, setTotalVolume] = useState<number>(750);
  const [currentVolume, setCurrentVolume] = useState<number>(750);
  const [typeId, setTypeId] = useState<NewBottleRecord['typeId']>(COFFEE_LIQUOR);

  const formPrompt = () => new Promise<Result>((resolve) => {
    setHandleClose(() => (bottle: Result) => {
      resolve(bottle);

      if (bottle) {
        setBottleName('');
      }

      setHandleClose(undefined);
    });
  });

  const setResult = useCallback((bottle: Result) => {
    if (handleClose) {
      handleClose(bottle);
    }
  }, [handleClose]);

  const popup = (
    <Dialog open={Boolean(handleClose)} onClose={() => setResult(null)}>
      <form onSubmit={(event) => {
        event.preventDefault();

        setResult({
          name: bottleName,
          typeId,
          volume: {
            total: totalVolume,
            left: currentVolume,
          },
        });
      }}
      >
        <DialogTitle>Add new bottle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Bottle name"
            fullWidth
            variant="standard"
            value={bottleName}
            inputProps={{ name: 'bottle-name', 'data-cy': 'bottle-name' }}
            onChange={(event) => { setBottleName(event.target.value); }}
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="typeId">
              Type
            </InputLabel>
            <NativeSelect
              value={typeId}
              onChange={({ target: { value } }) => {
                setTypeId(value);
              }}
              inputProps={{
                name: 'typeId',
                id: 'typeId',
              }}
            >
              <option value={COFFEE_LIQUOR}>Coffee liquor</option>
              <option value={IRISH_CREAM}>Irish cream</option>
              <option value={ORANGE_LIQUOR}>Orange liquor</option>
            </NativeSelect>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="total-volume">
              Total volume
            </InputLabel>
            <NativeSelect
              value={totalVolume}
              onChange={({ target: { value } }) => {
                const newTotalVolume = Number(value);

                setTotalVolume(newTotalVolume);

                if (totalVolume === currentVolume || newTotalVolume < currentVolume) {
                  setCurrentVolume(newTotalVolume);
                }
              }}
              inputProps={{
                name: 'total-volume',
                id: 'total-volume',
                'data-cy': 'total-volume',
              }}
            >
              <option value={1000}>1000 ml</option>
              <option value={750}>750 ml</option>
              <option value={500}>500 ml</option>
            </NativeSelect>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="current-volume"
            label="Current volume"
            fullWidth
            variant="standard"
            value={currentVolume}
            inputProps={{ inputMode: 'numeric', name: 'current-volume', 'data-cy': 'current-volume' }}
            onChange={({ target: { value } }) => {
              const filteredValue = value.replace(/[^0-9]/gi, '');
              const validValue = filteredValue === '' ? 0 : Math.min(totalVolume, Number(filteredValue));

              setCurrentVolume(validValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button data-cy="cancel-button-bottle" type="button" onClick={() => setResult(null)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return [popup, formPrompt];
}
