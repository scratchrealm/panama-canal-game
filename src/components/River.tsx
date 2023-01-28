import { FunctionComponent } from "react";
import BubbleComponent from "./BubbleComponent";
import LockComponent from "./LockComponent";

type Props = {
	width: number
	height: number
	riverPosition: number
	locks: Lock[]
}

const sideWidth = 28
const sideWidth2 = 20
const grassWidth = 70
const borderThickness = 2
const grassColor = '#88ff88'

const riverLength = 20000 // total river length
const riverWidth = 365

export type Bubble = {
	x: number
	y: number
	color: string
	radius: number
}
const bubbles: Bubble[] = []
const numBubbles = 600

export type Lock = {
	position: number
	prompt: string
	submerged: boolean
}

// bubbles
for (let i = 0; i < numBubbles; i++) {
	bubbles.push({
		x: grassWidth + sideWidth + sideWidth2 +  Math.random() * riverWidth,
		y: Math.random() * riverLength,
		color: Math.random() < 0.5 ? 'lightblue' : Math.random() < 0.5 ? '#5555ff' : '#000088',
		radius: 8
	})
}

// grass stuff
for (let i = 0; i < numBubbles / 3; i++) {
	bubbles.push({
		x: Math.random() * (grassWidth - 20),
		y: Math.random() * riverLength,
		color: 'green',
		radius: 6
	})
	bubbles.push({
		x: grassWidth + sideWidth * 2 + sideWidth2 * 2 + riverWidth + 20 + Math.random() * (grassWidth - 20),
		y: Math.random() * riverLength,
		color: 'green',
		radius: 6
	})
}

const River: FunctionComponent<Props> = ({ width, height, riverPosition, locks }) => {
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
