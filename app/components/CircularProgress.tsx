import React from 'react';
import { View, StyleSheet } from 'react-native';

let Svg: any = null;
let Circle: any = null;
try {
  // dynamic require to avoid bundler failure when package not installed
  // eslint-disable-next-line global-require
  Svg = require('react-native-svg').default;
  Circle = require('react-native-svg').Circle;
} catch (e) {
  Svg = null;
  Circle = null;
}

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
};

export default function CircularProgress({ size = 68, strokeWidth = 6, progress, color = '#2ecc71', bgColor = '#eee', children }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, progress));
  const strokeDashoffset = circumference * (1 - clamped / 100);

  if (Svg && Circle) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle cx={size / 2} cy={size / 2} r={radius} stroke={bgColor} strokeWidth={strokeWidth} fill="transparent" />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
        <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>{children}</View>
      </View>
    );
  }

  // fallback: simple circle with border opacity approximating progress
  const fallbackBorder = Math.max(2, Math.round((strokeWidth * clamped) / 100));
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: fallbackBorder,
          borderColor: color,
          opacity: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>{children}</View>
    </View>
  );
}
