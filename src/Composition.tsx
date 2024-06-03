import { makeEllipse, makeStar } from '@remotion/shapes';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { interpolatePath } from "@remotion/paths";
import { evolvePath } from "@remotion/paths";

import { z } from 'zod';

export const myCompSchema = z.object({

});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = () => {

  const frame = useCurrentFrame();

  const { path: starpath } = makeStar({
    innerRadius: 200,
    outerRadius: 150,
    points: 6,
  });

  const { path: ellips } = makeEllipse({
    rx: 100,
    ry: 200,
  });


  const inerpolatePath = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const evolveInterpolate = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });


  const interpolated = interpolatePath(inerpolatePath, starpath, ellips);
  const evol = evolvePath(evolveInterpolate, interpolated);

  return (
    <AbsoluteFill className="bg-gray-100 items-center justify-center">
      <svg viewBox='0 0 720 720' style={{
        margin: '40px'

      }}>
        <path style={{
          stroke: 'orange',
          strokeDasharray: evol.strokeDasharray,
          strokeDashoffset: evol.strokeDashoffset,
          strokeWidth: 10,
          strokeLinecap: 'square',

        }} d={interpolated} />
      </svg>
    </AbsoluteFill>
  );
};
