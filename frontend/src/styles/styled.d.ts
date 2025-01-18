import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            black: string;
            white: string;
            orange: {
                600: string;
                300: string;
                100: string;
            };
            gray: {
                400: string;
                200: string;
                100: string;
            };
            green: {
                600: string;
                300: string;
            };
            red: {
                600: string;
                300: string;
            };
            blue: {
                600: string;
                300: string;
            };
            yellow: {
                600: string;
            };
            turkey: {
                600: string;
            };
        };
        typography: {
            T1: TypographyStyle;
            T2: TypographyStyle;
            T3: TypographyStyle;
            T4: TypographyStyle;
            T5: TypographyStyle;
            T6: TypographyStyle;
            T7: TypographyStyle;
        };
    }

    export interface TypographyStyle {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
    }
}
