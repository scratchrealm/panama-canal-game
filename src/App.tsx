import { KeyboardEventHandler, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import './App.css'
import Boat from './components/Boat'
import PromptComponent from './components/PromptComponent'
import River from './components/River'
import { initialPCGState, pcgReducer } from './PCGState'

const promptHeight = 250

const scaleFactor = 1200 / 12000

function App() {
  const [pcgState, pcgDispatch] = useReducer(pcgReducer, initialPCGState)
  const [boatRotation, setBoatRotation] = useState(0)

  useEffect(() => {
    const dt = 0.1
    let canceled = false
    function evolve() {
      pcgDispatch({ type: 'evolve', dt })
      setTimeout(() => {
        if (canceled) return
        evolve()
      }, dt * 1000)
    }
    evolve()
    return () => { canceled = true }
  }, [])

  const {locks, bubbles, boatPosition, boatVelocity, stoppedAtLock} = pcgState

  const W = 900
  const H = 600
  const riverWidth = 600
  const outerColor = '#aaaaaa'
  const boatWidth = 70
  const boatHeight = 170

  const currentLockIndex = useMemo(() => {
    for (let i = 0; i < locks.length; i++) {
      if ((boatPosition.y >= locks[i].position - 400) && (boatPosition.y < locks[i].position)) {
        return i
      }
    }
    return undefined
  }, [boatPosition.y, locks])

  const handleUnlock = useCallback(() => {
    if (currentLockIndex === undefined) return
    pcgDispatch({type: 'setLockSubmerged', lockIndex: currentLockIndex, submerged: true})
  }, [currentLockIndex])

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
    const incr = 80
    if (e.key === 'a') {
      pcgDispatch({type: 'accelerateBoat', x: -incr, y: 0})
      setBoatRotation(-20)
    }
    else if (e.key === 'd') {
      pcgDispatch({type: 'accelerateBoat', x: incr, y: 0})
      setBoatRotation(20)
    }
    else if (e.key === 'w') {
      pcgDispatch({type: 'accelerateBoat', x: 0, y: incr})
      setBoatRotation(0)
    }
    else if (e.key === 's') {
      pcgDispatch({type: 'accelerateBoat', x: 0, y: -incr})
      setBoatRotation(0)
    }
    else if (e.key === 'c') {
      handleUnlock()
    }
  }, [handleUnlock])

  const currentLock = useMemo(() => (currentLockIndex === undefined ? undefined : locks[currentLockIndex]), [currentLockIndex, locks])

  return (
    <div className="App"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>Panama Canal Game</h1>
      <p style={{ fontSize: 20 }}>Use the w,a,s,d keys to navigate the boat in the Panama Canal.</p>
      <p style={{ fontSize: 20 }}>Use the Ctrl +/- keys to zoom the browser window to fit the game.</p>
      <div style={{ position: 'relative', width: W, height: H, border: 'solid 1px black', background: outerColor }}>
        <div style={{ position: 'absolute', width: riverWidth, height: H, left: (W - riverWidth) / 2 }}>
          <River width={riverWidth} height={H} riverPosition={boatPosition.y - boatHeight * 1.5} locks={locks} bubbles={bubbles} />
          <div style={{
            position: 'absolute',
            width: boatWidth,
            height: boatHeight,
            left: riverWidth / 2 + boatPosition.x - boatWidth / 2,
            top: H - (boatHeight * 1.5)
          }}>
            <Boat
              width={boatWidth}
              height={boatHeight}
              rotationDeg={boatRotation}
            />
          </div>
        </div>
        <div style={{ position: 'absolute', fontSize: 22 }}>
          {Math.round(boatPosition.y * scaleFactor)} feet
        </div>
      </div>
      <PromptComponent
        width={W}
        height={promptHeight}
        prompt={boatPosition.y * scaleFactor > 1200 ? 'Welcome to the Pacific Ocean!' : currentLock?.prompt}
        onUnlock={handleUnlock}
        stopped={stoppedAtLock}
      />
    </div>
  )
}

export default App
