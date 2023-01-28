import { FunctionComponent } from "react";
import { Lock } from "../PCGState";

type Props = {
	lock: Lock
	width: number
	height: number
}

const LockComponent: FunctionComponent<Props> = ({lock, width, height}) => {
	return (
		<div
			style={{
				position: 'absolute',
				width,
				height,
				background: lock.submerged ? 'darkblue' : 'black'
			}}
		/>
	)
}

export default LockComponent
