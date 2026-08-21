"use client";

import CountUp from "react-countup";

type AnimatedPriceProps = {
  value: number;
};

export default function AnimatedPrice({ value }: AnimatedPriceProps) {
  return (
    <CountUp
      end={value}
      duration={0.8}
      preserveValue
      enableScrollSpy
      scrollSpyOnce
    />
  );
}
