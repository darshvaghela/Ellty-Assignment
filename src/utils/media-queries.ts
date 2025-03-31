import { css } from "styled-components";

export const sizes: Record<string, number> = {
  sm: 576,
  md: 768,
  lg: 992,
};

export const xs = {
  maxWidth: sizes.sm - 1,
};

export const sm = {
  minWidth: sizes.sm,
  maxWidth: sizes.md - 1,
};

export const md = {
  minWidth: sizes.md,
  maxWidth: sizes.lg - 1,
};

export const lg = {
  minWidth: sizes.lg,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const media = Object.keys(sizes).reduce((acc: any, label: string) => {
  acc[label] = (args: TemplateStringsArray) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(args)}
    }
  `;
  return acc;
}, {});
