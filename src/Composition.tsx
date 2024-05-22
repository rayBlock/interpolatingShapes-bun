import { makeCircle, makePolygon, makeRect, makeStar } from '@remotion/shapes';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import { interpolatePath } from "@remotion/paths";

import {z} from 'zod';

export const myCompSchema = z.object({

});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({

}) => {

	const frame = useCurrentFrame();


const { path:circlepath } = makeCircle({
  radius: 200
});
 
const { path:starpath } = makeStar({
  innerRadius: 200,
  outerRadius: 150,
  points: 5,
});

const { path:polygonpath } = makePolygon({
  points: 5,
  radius: 80,
});

const inerpolatePath = interpolate(frame, [30,60], [0,1], {
	extrapolateLeft: 'clamp',
	extrapolateRight: 'clamp',
})

const interpolated = interpolatePath(inerpolatePath, polygonpath, circlepath);

	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
				<svg viewBox='0 0 720 720'>
					<path d={interpolated} />
				</svg>
		</AbsoluteFill>
	);
};
