import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    colors: {
        primary: "#FF7B33",
        black: "#111111",
        white: "#FFFFFF",
        gray: {
            400: "#AFAFAF",
            200: "#D0D0D0",
            100: "#F8F8F8",
        },
        orange: {
            600: "#D45303",
            300: "#F4E2D0",
            100: "#FFEFE9",
        },
        green: {
            600: "#107F4F",
            300: "#D3F8AB",
        },
        red: {
            600: "#FA5858",
            300: "#FFD8D9",
        },
        blue: {
            600: "#1668CA",
            300: "#C4F1FD",
        },
        yellow: {
            600: "#DFC100",
        },
        turkey: {
            600: "#20B6B6",
        },
    },
    typography: {
        T1: {
            fontFamily: "Pretendard",
            fontWeight: 800, // ExtraBold
            fontSize: "40px",
            lineHeight: "auto",
        },
        T2: {
            fontFamily: "Pretendard",
            fontWeight: 700, // Bold
            fontSize: "24px",
            lineHeight: "auto",
        },
        T3: {
            fontFamily: "Pretendard",
            fontWeight: 600, // SemiBold
            fontSize: "20px",
            lineHeight: "auto",
        },
        T4: {
            fontFamily: "Pretendard",
            fontWeight: 600, // SemiBold
            fontSize: "18px",
            lineHeight: "auto",
        },
        T5: {
            fontFamily: "Pretendard",
            fontWeight: 500, // Bold
            fontSize: "16px",
            lineHeight: "auto",
        },
        T6: {
            fontFamily: "Pretendard",
            fontWeight: 500, // Medium
            fontSize: "14px",
            lineHeight: "20px",
        },
        T7: {
            fontFamily: "Pretendard",
            fontWeight: 400, // Regular
            fontSize: "12px",
            lineHeight: "auto",
        },
    },
};

export type ThemeType = typeof theme;
