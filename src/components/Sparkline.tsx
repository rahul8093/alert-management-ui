import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '../theme';

export default function Sparkline({
  data,
  width = 120,
  height = 34,
  color = colors.teal2,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const span = hi - lo || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - lo) / span) * height,
  }));

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  const last = pts[pts.length - 1];

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.22} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill="url(#fade)" />
      <Path d={line} stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={last.x} cy={last.y} r={2.6} fill="#fff" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}
