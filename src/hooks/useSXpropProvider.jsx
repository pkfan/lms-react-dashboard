/**
 * author - PKFAN
 * version - 1.0.0
 *
 * MUI does not provide (sx) styling props for custom html element
 * (e.g h1, div, span, a, header, footer etc)
 *
 * So this Hook can be used to get (sx) prop in custom html elements
 *(e.g h1, div, span, a, header, footer etc)
 *
 */

import { styled, unstable_styleFunctionSx } from '@mui/system';

// sx decorator pattern
function useSXpropProvider(element) {
  return styled(element)(unstable_styleFunctionSx);
}

export default useSXpropProvider;
