import { FunctionComponent } from "react";
import { Bubble, Lock } from "./River";

type Props = {
	prompt?: string
	width: number
	height: number
	onUnlock: () => void
	stopped: boolean
}

const PromptComponent: FunctionComponent<Props> = ({prompt, width, height, onUnlock, stopped}) => {
	return (
		<div style={{position: 'relative', width, height}}>
			{prompt && (
				<div style={{
					position: 'absolute',
					width: width - 20,
					height,
					fontSize: 25,
					fontFamily: 'Times',
					margin: 6,
					border: 'gold solid 1px'
				}}>
					<p>{prompt}</p>
					{
						stopped && (
							<a style={{cursor: 'pointer'}} onClick={onUnlock}>Continue</a>
						)
					}
				</div>
			)}
		</div>
	)
}

export default PromptComponent
