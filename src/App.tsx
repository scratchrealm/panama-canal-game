import { KeyboardEventHandler, useCallback, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import River, { Lock } from './components/River'
import Boat from './components/Boat'
import PromptComponent from './components/PromptComponent'

const initialBoatPosition = {x: 300, y: 300}

const promptHeight = 250

const p1 = 'The idea to create the Panama Canal began in the early 1500s when  Vasco Nuñez de Balboa realized the thin strip of land across the Isthmus. Stormy and unpredictable weather conditions going around South America made the canal beneficial for transporting goods. - History.com'
const p2 = 'The French began the construction of the desired Panama Canal in 1881. Soon after, Ferdinand de Lesseps found that building a 51-mile sea-level Canal through the isthmus would be nearly impossible compared to the 120-mile passage through Egypt’s flat desert. France abandoned the project in 1888 because of the abundance of deaths from disease, landslides, and other accidents. - Why the Construction of the Panama Canal was so Difficult'
const p3 = 'Former president, Teddy Roosevelt, told the people in Berkeley, California that he would ensure passage through the isthmus as a counter piece of America’s world power. - After a Century the Panama Canal Still Symbolizes Executive Power. “Following the deliberations of the U.S. Isthmian Canal Commission and a push from President Theodore Roosevelt, the United States purchased the French assets in the canal zone for $40 million in 1902.” - History.com'
const p4 = 'Over 25,000 workers died building the Panama Canal. - History.com'
const p5 = 'Surgeon General William Gorgus helped to protect workers from malaria and other mosquito-transmitted diseases. After his team fumigated homes and cleansed pools of water, the last case of yellow fever on the isthmus was reported in 1905 as well as cases of malaria that slowed down. - History.com'
const p6 = 'Frequent maintenance is required to take apart machinery in the canal. - britannica.com'

const positions = [600, 1200, 2000, 2600, 3400, 4200]
const promptStrings = [p1, p2, p3, p4, p5, p6]

const initialLocks: Lock[] = positions.map((position, i) => ({
  position,
  prompt: promptStrings[i],
  submerged: false
}))

const scaleFactor = 1 / 3

function App() {
  const [count, setCount] = useState(0)
  const [locks, setLocks] = useState(initialLocks)

  const W = 900
  const H = 600
  const riverWidth = 600
  const outerColor = '#aaaaaa'
  const boatWidth = 80
  const boatHeight = 160

  const [bp, setBp] = useState(initialBoatPosition)
  const [riverPosition, setRiverPosition] = useState(0)
  const currentLock = useMemo(() => {
    for (let lock of locks) {
      if ((riverPosition >= lock.position - 400) && (riverPosition < lock.position)) {
        return lock
      }
    }
  }, [riverPosition, locks])

  const [stopped, setStopped] = useState(false)

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
      setStopped(false)
      if (e.key === 'a') {
        setBp(bp => ({x: bp.x - 10, y: bp.y}))
      }
      else if (e.key === 'd') {
        setBp(bp => ({x: bp.x + 10, y: bp.y}))
      }
      else if (e.key === 'w') {
        let increment = 20
        if (currentLock) {
          if (currentLock.submerged) {
            increment = 12
          }
          else {
            if (riverPosition >= currentLock.position - 220) {
              increment = 0
              setStopped(true)
            }
            else {
              increment = 5
            }
          }
        }
        setRiverPosition(p => (p + increment))
      }
      else if (e.key === 's') {
        setRiverPosition(p => (p - 20))
      }
  }, [currentLock, riverPosition])

  const handleUnlock = useCallback(() => {
      setLocks(x => {
        const newLocks = [...x]
        for (let i = 0; i < newLocks.length; i++) {
          if (newLocks[i] == currentLock) {
            newLocks[i] = {...currentLock, submerged: true}
          }
        }
        return newLocks
      })
      setStopped(false)
  }, [currentLock])

  return (
    <div className="App"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>Panama Canal Game</h1>
      <p style={{fontSize: 20}}>Use the w,a,s,d keys to navigate the boat in the river.</p>
      <div style={{position: 'relative', width: W, height: H, border: 'solid 1px black', background: outerColor}}>
        <div style={{position: 'absolute', width: riverWidth, height: H, left: (W - riverWidth) / 2}}>
          <River width={riverWidth} height={H} riverPosition={riverPosition} locks={locks} />
          <div style={{
            position: 'absolute',
            width: boatWidth,
            height: boatHeight,
            left: bp.x - boatWidth / 2,
            top: H - (bp.y - boatHeight / 2)
          }}><Boat width={boatWidth} height={boatHeight} /></div>
        </div>
        <div style={{position: 'absolute', fontSize: 22}}>
          {Math.round(riverPosition * scaleFactor)} feet
        </div>
      </div>
      <PromptComponent width={W} height={promptHeight} prompt={currentLock?.prompt} onUnlock={handleUnlock} stopped={stopped} />
    </div>
  )
}

export default App
