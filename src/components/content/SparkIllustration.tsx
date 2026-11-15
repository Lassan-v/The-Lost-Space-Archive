import type { ComponentPropsWithoutRef } from 'react';
import './SparkIllustration.css';

export type SparkPose =
  | 'welcoming'
  | 'idle'
  | 'speaking'
  | 'explaining'
  | 'projecting'
  | 'discovering'
  | 'surprise'
  | 'celebration';

interface SparkIllustrationProps extends ComponentPropsWithoutRef<'svg'> {
  pose: SparkPose;
}

const spriteIdByPose: Record<SparkPose, string> = {
  welcoming: 'spark-welcoming',
  idle: 'spark-idle',
  speaking: 'spark-speaking',
  explaining: 'spark-explaining',
  projecting: 'spark-projecting',
  discovering: 'spark-discovering',
  surprise: 'spark-surprise',
  celebration: 'spark-celebration',
};

export function SparkIllustration({ pose, className = '', ...props }: SparkIllustrationProps) {
  return (
    <svg
      {...props}
      className={`spark-illustration ${className}`.trim()}
      viewBox="0 0 360 360"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      data-pose={pose}
    >
      {pose === 'projecting' ? (
        <>
          <use href="#spark-projecting-body" />
          <use
            className="spark-illustration__projecting-arms"
            href="#spark-projecting-arms"
          />
        </>
      ) : (
        <use href={`#${spriteIdByPose[pose]}`} />
      )}
    </svg>
  );
}
