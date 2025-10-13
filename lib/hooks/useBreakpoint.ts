import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useBreakpoint = <T>(sm?: T, md?: T, lg?: T, xl?: T) => {
  const { width } = useWindowDimensions();

  const breakpoint = useMemo(() => {
    if (width >= 1280) {
      return 'xl';
    } else if (width >= 1024) {
      return 'lg';
    } else if (width >= 768) {
      return 'md';
    } else {
      return 'sm';
    }
  }, [width]);

  const valueWithBreakpoint = useMemo(() => {
    switch (breakpoint) {
      case 'sm':
        return sm;
      case 'md':
        return md;
      case 'lg':
        return lg;
      case 'xl':
        return xl;
      default:
        return sm;
    }
  }, [breakpoint, lg, md, sm, xl]);

  return { breakpoint, valueWithBreakpoint };
};
