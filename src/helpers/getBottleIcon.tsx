import * as React from 'react';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import Battery90Icon from '@mui/icons-material/Battery90';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery20Icon from '@mui/icons-material/Battery20';
import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';

export default function getBottleIcon(total: number, left: number) {
  if (total === left) {
    return <BatteryFullIcon />;
  }

  if (left === 0) {
    return <BatteryAlertIcon />;
  }

  const percent = (left / total) * 100;

  if (percent > 90) {
    return <Battery90Icon />;
  }

  if (percent > 80) {
    return <Battery80Icon />;
  }

  if (percent > 60) {
    return <Battery60Icon />;
  }

  if (percent > 50) {
    return <Battery50Icon />;
  }

  if (percent > 30) {
    return <Battery30Icon />;
  }

  if (percent > 20) {
    return <Battery20Icon />;
  }

  if (percent > 0) {
    return <BatteryAlertIcon />;
  }

  return <BatteryUnknownIcon />;
}
