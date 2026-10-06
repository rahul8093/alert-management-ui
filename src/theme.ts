import { Platform, ViewStyle } from 'react-native';

export const colors = {
  navy: '#0B2A43',
  navy2: '#16607F',
  teal: '#14B8A6',
  teal2: '#0E9384',
  tealSoft: '#E0F5F2',
  red: '#E5484D',
  redSoft: '#FDECEC',
  amber: '#F5A524',
  amberSoft: '#FEF3DC',
  green: '#22A06B',
  greenSoft: '#E1F4EB',
  purple: '#7C5CFC',
  purpleSoft: '#EEE9FF',
  gray: '#64748B',
  grayLight: '#94A3B8',
  graySoft: '#E9EEF3',
  ink: '#0F2233',
  bg: '#F4F7FA',
  line: '#DDE5EC',
  white: '#FFFFFF',
};

export const shadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#0B2A43',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  default: { elevation: 3, shadowColor: '#0B2A43' },
}) as ViewStyle;
