export type Bubble = {
	x: number
	y: number
	color: string
	radius: number
    circle: boolean
}

export type Lock = {
	position: number
	prompt: string
	submerged: boolean
}

export type PCGState = {
    boatPosition: {x: number, y: number}
    boatVelocity: {x: number, y: number}
    bubbles: Bubble[]
    locks: Lock[]
    stoppedAtLock: boolean
}

export const sideWidth = 28
export const sideWidth2 = 20
export const grassWidth = 70
export const riverWidth = 365
export const riverLength = 20000 // total river length

const initialBubbles: Bubble[] = []
const numBubbles = 600
// bubbles
for (let i = 0; i < numBubbles; i++) {
	initialBubbles.push({
		x: grassWidth + sideWidth + sideWidth2 +  Math.random() * riverWidth,
		y: 50 + Math.random() * riverLength,
		color: Math.random() < 0.5 ? 'lightblue' : Math.random() < 0.5 ? '#5555ff' : '#000088',
		radius: 8,
        circle: true
	})
}
// grass stuff
for (let i = 0; i < numBubbles / 1.5; i++) {
	initialBubbles.push({
		x: Math.random() * (grassWidth - 20),
		y: -500 + Math.random() * riverLength,
		color: 'green',
		radius: 6,
        circle: false
	})
	initialBubbles.push({
		x: grassWidth + sideWidth * 2 + sideWidth2 * 2 + riverWidth + 20 + Math.random() * (grassWidth - 20),
		y: -500 + Math.random() * riverLength,
		color: 'green',
		radius: 6,
        circle: false
	})
}

const p1 = `The idea to create the Panama Canal began in the early 1500s when Vasco Nuñez de Balboa realized the thin strip of land across the Isthmus (Panama Canal). Stormy and unpredictable weather conditions going around South America made the canal beneficial for transporting goods (Panama Canal).`
const p2 = `The French began the construction of the desired Panama Canal in 1881 (Klein). Soon after, Ferdinand de Lesseps found that building a 51-mile sea-level canal through the Isthmus would be nearly impossible compared to the already built 120-mile passage through Egypt’s flat desert (Klein). France abandoned the project in 1888 because of the abundance of deaths from disease, landslides, and other accidents (Klein). “Outbreaks of dysentery and epidemics of yellow fever and malaria decimated the workforce. An estimated three-quarters of the French engineers who joined Lesseps in Panama died within three months of arriving” (Klein).`
const p3 = `Former president Teddy Roosevelt told the people in Berkeley, California that he would ensure passage through the Isthmus as a counter piece of America’s world power (The Panama Canal Still Symbolizes Executive Power). “Following the deliberations of the U.S. Isthmian Canal Commission and a push from President Theodore Roosevelt, the United States purchased the French assets in the canal zone for $40 million in 1902” (Panama Canal).`
const p4 = `Over 20,000 workers died building the Panama Canal (Panama Canal). With approximately 6,000 men working at one time, casualties were frequent from the remaining problem of landslides, diseases, and dynamite explosions (Panama Canal).`
const p5 = `Surgeon General William Gorgus helped to protect workers from malaria and other mosquito-transmitted diseases (Panama Canal). After his team fumigated homes and cleansed pools of water, cases of malaria slowed down. The last case of yellow fever on the Isthmus was reported in 1905 (Panama Canal).`
const p6 = `The $350 million Panama Canal was the most expensive construction project at that time period (Panama Canal). “Altogether, some 3.4 million cubic meters of concrete went into building the locks, and nearly 240 million cubic yards of rock and dirt were excavated during the American construction phase” (Panama Canal).`

const positions = [900, 2700, 4800, 7000, 9000, 12000]
const promptStrings = [p1, p2, p3, p4, p5, p6]

const initialLocks: Lock[] = positions.map((position, i) => ({
  position,
  prompt: promptStrings[i],
  submerged: false
}))

export const initialPCGState: PCGState = {
    boatPosition: {x: 0, y: -10},
    boatVelocity: {x: 0, y: 0},
    bubbles: initialBubbles,
    locks: initialLocks,
    stoppedAtLock: false
}

export type PCGAction = {
    type: 'evolve'
    dt: number
} | {
    type: 'setLockSubmerged'
    lockIndex: number
    submerged: boolean
} | {
    type: 'accelerateBoat'
    x: number
    y: number
}

const maxVelocity = {x: 150, y: 350}

export const pcgReducer = (s: PCGState, a: PCGAction): PCGState => {
    if (a.type === 'evolve') {
        let nextLockIndex = undefined
        for (let i = 0; i < s.locks.length; i++) {
            if (s.locks[i].position > s.boatPosition.y) {
                nextLockIndex = i
                break
            }
        }
        let nextBoatYPosition = s.boatPosition.y + s.boatVelocity.y * a.dt
        let nextBoatYVelocity = s.boatVelocity.y
        if (nextLockIndex !== undefined) {
            if (!s.locks[nextLockIndex].submerged) {
                if (nextBoatYPosition >= s.locks[nextLockIndex].position) {
                    nextBoatYPosition = s.boatPosition.y
                    nextBoatYVelocity = 0
                }
                // slow down!
                else if (nextBoatYPosition + 35 >= s.locks[nextLockIndex].position) {
                    nextBoatYVelocity = Math.min(nextBoatYVelocity, 50)
                }
                else if (nextBoatYPosition + 250 >= s.locks[nextLockIndex].position) {
                    nextBoatYVelocity = Math.min(nextBoatYVelocity, 100)
                }
            }
        }
        nextBoatYPosition = s.boatPosition.y + nextBoatYVelocity * a.dt
        let stoppedAtLock = false
        if (nextLockIndex !== undefined) {
            if (nextBoatYVelocity <= 60) {
                if (nextBoatYPosition + 250 >= s.locks[nextLockIndex].position) {
                    stoppedAtLock = true
                }
            }
        }

        // reposition some of the bubbles
        const newBubbles = [...s.bubbles]
        for (let i = 0; i < newBubbles.length; i++) {
            const b = newBubbles[i]
            if (b.circle) {
                if (Math.random() < 0.05) {
                    newBubbles[i] = {...newBubbles[i], y: newBubbles[i].y + Math.random() * 300 - 150}
                }
            }
        }

        let newBoatPositionX = s.boatPosition.x + s.boatVelocity.x * a.dt
        newBoatPositionX = Math.min(newBoatPositionX, 150)
        newBoatPositionX = Math.max(newBoatPositionX, -150)

        return {
            ...s,
            bubbles: newBubbles,
            stoppedAtLock,
            boatPosition: {x: newBoatPositionX, y: nextBoatYPosition},
            boatVelocity: {x: s.boatVelocity.x * 0.95, y: nextBoatYVelocity * 0.95}
        }
    }
    else if (a.type === 'setLockSubmerged') {
        const newLocks = [...s.locks]
        newLocks[a.lockIndex] = {...newLocks[a.lockIndex], submerged: a.submerged}
        return {
            ...s,
            locks: newLocks
        }
    }
    else if (a.type === 'accelerateBoat') {
        return {
            ...s,
            boatVelocity: {
                x: Math.min(s.boatVelocity.x + a.x, maxVelocity.x),
                y: Math.min(s.boatVelocity.y + a.y, maxVelocity.y)
            }
        }
    }
    else return s
}