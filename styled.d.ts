import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    background: string;
    text: string;
    card: string;
    border: string;
    fonts: {
      regular: string;
      italic: string;
      semibold: string;
    };
  }
} 