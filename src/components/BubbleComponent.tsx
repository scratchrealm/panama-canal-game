import { FunctionComponent } from "react";
import { Bubble } from "./River";

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
				background: bubble.color
			}}
		/>
	)
}

export default BubbleComponent
