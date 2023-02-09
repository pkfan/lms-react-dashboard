import { border, layout, primary, secondary, skin } from '@/styles/colors/cssColorVariables';
import globalStyles from '@/styles/globalStyles';

const colors = {
  gray: [
    layout[0],
    layout[1],
    layout[2],
    layout[3],
    layout[4],
    layout[5],
    layout[6],
    layout[7],
    layout[8],
    layout[9],
  ],
  lmsPrimary: [
    primary[0],
    primary[1],
    primary[2],
    primary[3],
    primary[4],
    primary[5],
    primary[6],
    primary[7],
    primary[8],
    primary[9],
  ],
  blue: [
    primary[0],
    primary[1],
    primary[2],
    primary[3],
    primary[4],
    primary[5],
    primary[6],
    primary[7],
    primary[8],
    primary[9],
  ],
  lmsSecondary: [
    secondary[0],
    secondary[1],
    secondary[2],
    secondary[3],
    secondary[4],
    secondary[5],
    secondary[6],
    secondary[7],
    secondary[8],
    secondary[9],
  ],
  lmsLayout: [
    layout[0],
    layout[1],
    layout[2],
    layout[3],
    layout[4],
    layout[5],
    layout[6],
    layout[7],
    layout[8],
    layout[9],
  ],
  lmsSkin: [skin[0], skin[1]],
  lmsBorder: [border[0], border[1], border[2], border[3], border[4]],
};

const lmsProTheme = {
  colors,
  globalStyles,
  primaryColor: 'lmsPrimary',
  white: 'var(--skin-0)',
  black: 'var(--skin-1)',
};

export default lmsProTheme;
