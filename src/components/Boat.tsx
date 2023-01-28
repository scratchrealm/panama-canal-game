import { FunctionComponent } from "react";

type Props = {
	width: number
	height: number
	rotationDeg: number
}

const Boat: FunctionComponent<Props> = ({width, height, rotationDeg}) => {
	return (
		<div style={{position: 'absolute', width, height}}>
			<img
				src="https://user-images.githubusercontent.com/3679296/215293238-a6f32572-1d69-430d-837d-e37c5af19bac.png"
				width={width}
				height={height}
				style={{transform: `rotate(${rotationDeg}deg)`}}
			/>
		</div>
	)
}

export default Boat
