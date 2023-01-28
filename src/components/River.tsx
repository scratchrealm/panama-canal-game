import { FunctionComponent } from "react";
import { Bubble, grassWidth, Lock, riverWidth, sideWidth, sideWidth2 } from "../PCGState";
import BubbleComponent from "./BubbleComponent";
import LockComponent from "./LockComponent";

type Props = {
	width: number
	height: number
	riverPosition: number
	locks: Lock[]
	bubbles: Bubble[]
}

const borderThickness = 2
const grassColor = '#88ff88'





const River: FunctionComponent<Props> = ({ width, height, riverPosition, bubbles, locks }) => {
	return (
		<div style={{ position: 'absolute', width, height, background: 'blue', overflow: 'hidden' }}>
			{/* left side */}
			<div style={{ position: 'absolute', width: grassWidth - borderThickness * 2, height: height - borderThickness * 2, background: grassColor, border: `solid ${borderThickness}px black` }}>
			</div>
			<div style={{ position: 'absolute', left: grassWidth, width: sideWidth - borderThickness * 2, height: height - borderThickness * 2, background: 'darkorange', border: `solid ${borderThickness}px black` }}>
			</div>
			<div style={{ position: 'absolute', left: grassWidth + sideWidth, width: sideWidth2 - borderThickness * 2, height: height - borderThickness * 2, background: 'darkorange', border: `solid ${borderThickness}px black` }}>
			</div>


			{/* right side */}
			<div style={{ position: 'absolute', left: width - grassWidth, width: grassWidth - borderThickness * 2, height: height - borderThickness * 2, background: grassColor, border: `solid ${borderThickness}px black` }}>
			</div>
			<div style={{ position: 'absolute', left: width - grassWidth - sideWidth, width: sideWidth - borderThickness * 2, height: height - borderThickness * 2, background: 'darkorange', border: `solid ${borderThickness}px black` }}>
			</div>
			<div style={{ position: 'absolute', left: width - grassWidth - sideWidth - sideWidth2, width: sideWidth2 - borderThickness * 2, height: height - borderThickness * 2, background: 'darkorange', border: `solid ${borderThickness}px black` }}>
			</div>

			{/* bubbles */}
			{
				bubbles.map((bubble, ii) => (
					<div key={ii} style={{
						position: 'absolute',
						left: bubble.x - bubble.radius / 2,
						top: height - bubble.y + riverPosition,
						width: bubble.radius * 2,
						height: bubble.radius * 2
					}}>
						<BubbleComponent bubble={bubble} />
					</div>
				))
			}

			{/* locks */}
			{
				locks.map((lock, ii) => (
					<div key={ii} style={{
						position: 'absolute',
						left: grassWidth + sideWidth + sideWidth2,
						top: height - 50 - lock.position + riverPosition,
						width: riverWidth,
						height: 50
					}}>
						<LockComponent lock={lock} width={riverWidth} height={50} />
					</div>
				))
			}
		</div>
	)
}

export default River
