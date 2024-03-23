import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});


// Use https://m3.material.io/theme-builder#/custom to generate the theme 

const warmTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#99461E',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFDBCD',
    onPrimaryContainer: '#360F00',
    secondary: '#77574B',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFDBCD',
    onSecondaryContainer: '#2C160C',
    tertiary: '#675F30',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#F0E3A8',
    onTertiaryContainer: '#211C00',
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    onError: '#FFFFFF',
    onErrorContainer: '#410002',
    background: '#FFFBFF',
    onBackground: '#201A18',
    surface: '#FFFBFF',
    onSurface: '#201A18',
    surfaceVariant: '#F5DED6',
    onSurfaceVariant: '#53433E',
    outline: '#85736D',
    inverseOnSurface: '#FBEEEA',
    inverseSurface: '#362F2C',
    inversePrimary: '#FFB597',
    shadow: '#000000',
    surfaceTint: '#99461E',
    outlineVariant: '#D8C2BA',
    scrim: '#000000',
    backdrop: '#BDBDBD',
    elevation: { 
      level0: 'transparent',
      level1: '#F5ECE3',
      level2: '#EED9C7',
      level3: '#E6C5AB',
      level4: '#DEB18F',
      level5: '#D69D73',
    },
  },
};


export const mainTheme = merge(LightTheme, warmTheme);
export const darkTheme = merge(MD3DarkTheme, DarkTheme);





interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
}

export const COLORS: Color = {
  primaryRedHex: "#DC3535",
  primaryOrangeHex: "#D17842",
  primaryBlackHex: "#0C0F14",
  primaryDarkGreyHex: "#141921",
  secondaryDarkGreyHex: "#21262E",
  primaryGreyHex: "#252A32",
  secondaryGreyHex: "#252A32",
  primaryLightGreyHex: "#52555A",
  secondaryLightGreyHex: "#AEAEAE",
  primaryWhiteHex: "#FFFFFF",
  primaryBlackRGBA: "rgba(12,15,20,0.5)",
  secondaryBlackRGBA: "rgba(0,0,0,0.7)",
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: "Poppins-Black",
  poppins_bold: "Poppins-Bold",
  poppins_extrabold: "Poppins-ExtraBold",
  poppins_extralight: "Poppins-ExtraLight",
  poppins_light: "Poppins-Light",
  poppins_medium: "Poppins-Medium",
  poppins_regular: "Poppins-Regular",
  poppins_semibold: "Poppins-SemiBold",
  poppins_thin: "Poppins-Thin",
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
