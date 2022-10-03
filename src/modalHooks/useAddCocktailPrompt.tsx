import * as React from 'react';
import { useState, useCallback } from 'react';
import CocktailModal, { Result } from '../components/CocktailModal';

type PopupAndResultPromise = [JSX.Element, () => Promise<Result>];

export default function useAddCocktailPrompt(): PopupAndResultPromise {
  const [
    handleClose,
    setHandleClose,
  ] = useState<((cocktail: Result) => void) | undefined>(undefined);
  const [
    formResetKey,
    setFormResetKey,
  ] = useState<number>(0);

  const formPrompt = () => new Promise<Result>((resolve) => {
    setHandleClose(() => (cocktail: Result) => {
      resolve(cocktail);

      if (cocktail) {
        setFormResetKey(formResetKey + 1);
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
    <CocktailModal
      key={`cocktail-modal-${formResetKey})`}
      open={Boolean(handleClose)}
      setResult={setResult}
    />
  );

  return [popup, formPrompt];
}
