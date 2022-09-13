import * as React from 'react';
import { useState, useCallback } from 'react';
import BottleModal, { Result } from '../components/BottleModal';

type PopupAndResultPromise = [JSX.Element, () => Promise<Result>];

export default function useBottlePrompt(): PopupAndResultPromise {
  const [
    handleClose,
    setHandleClose,
  ] = useState<((bottle: Result) => void) | undefined>(undefined);
  const [
    formResetKey,
    setFormResetKey,
  ] = useState<number>(0);

  const formPrompt = () => new Promise<Result>((resolve) => {
    setHandleClose(() => (bottle: Result) => {
      resolve(bottle);

      setHandleClose(undefined);

      setFormResetKey(formResetKey + 1);
    });
  });

  const setResult = useCallback((bottle: Result) => {
    if (handleClose) {
      handleClose(bottle);
    }
  }, [handleClose]);

  const popup = (
    <BottleModal
      key={String(formResetKey)}
      open={Boolean(handleClose)}
      setResult={setResult}
    />
  );

  return [popup, formPrompt];
}
