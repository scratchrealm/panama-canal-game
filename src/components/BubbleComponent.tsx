import { FunctionComponent } from "react";
import { Bubble } from "../PCGState";

type Props = {
	bubble: Bubble
}

const BubbleComponent: FunctionComponent<Props> = ({bubble}) => {
	return (
		<div
			style={{
				position: 'absolute',
				width: bubble.radius * 2,
				height: bubble.radius * 2,
				background: bubble.color,
				borderRadius: bubble.circle ? '50%' : undefined
			}}
		/>
	)
}

export default BubbleComponent
