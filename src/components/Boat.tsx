import { FunctionComponent } from "react";

type Props = {
	width: number
	height: number
}

const Boat: FunctionComponent<Props> = ({width, height}) => {
	return (
		<div style={{position: 'absolute', width, height, background: 'gray'}}>
			<img src="https://user-images.githubusercontent.com/3679296/215268079-6e76c9a1-0e85-4b54-8953-f72ededff62a.png" width={width} height={height} />
		</div>
	)
}

export default Boat
