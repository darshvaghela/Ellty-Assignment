import styled, { css } from 'styled-components';
import { media } from '../utils/media-queries';

type Props = {
  wrap?: string;
  height?: string;
  width?: string;
  // transient prop not rendered to the actual DOM starts with $
  $isResponsive?: boolean;
  $flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  $alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  $justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ $flexDirection, $isResponsive }) =>
    $isResponsive && $flexDirection !== 'column'
      ? 'column'
      : $flexDirection || 'row'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `};
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `};
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
  ${media.md`
    flex-direction: ${(props: Props) =>
      props.$flexDirection || 'row'} !important;
  `}
`;
