/* eslint-disable @typescript-eslint/no-empty-object-type */

import 'styled-components';

import themes from '../global/theme'

export type ITheme = typeof themes

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme { }
}