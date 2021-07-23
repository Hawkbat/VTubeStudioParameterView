import React, { Fragment, useEffect, useState } from 'react'
import './App.css'
import { ApiClient, ILive2DParameter, Plugin, WebSocketBus } from 'vtubestudio'
import { BufferedWebsocket } from './utils'

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}

function App() {
  const [connected, setConnected] = useState(false)
  const [parameters, setParameters] = useState<ILive2DParameter[] | null>()

  useEffect(() => {
    const TOKEN_KEY = 'vtstudio-parameter-view-token'
    const ws = new BufferedWebsocket('ws://localhost:8001')
    const bus = new WebSocketBus(ws)
    const client = new ApiClient(bus)
    const initialToken = localStorage.getItem(TOKEN_KEY) ?? undefined
    const plugin = new Plugin(client, 'Parameter View', 'Hawkbar', undefined, initialToken, token => localStorage.setItem(TOKEN_KEY, token))
    const runToken = { active: true }

    ws.addEventListener('open', () => setConnected(true))
    ws.addEventListener('close', () => setConnected(false))

    const f = async () => {
      try {
        const { modelLoaded, parameters } = await plugin.apiClient.live2DParameterList()
        setParameters(modelLoaded ? parameters : null)
      } catch (e) {
        console.log(e)
      }
      requestAnimationFrame(f)
    }

    f()

    return () => {
      runToken.active = false
    }
  }, [])

  return (
    <div className="App">
      {connected ? <div style={{ display: 'grid', gridTemplateColumns: 'auto 60px 1fr 60px 60px' }}>
        {parameters ? parameters.map(p => <Fragment key={p.name}>
          <div>{p.name}</div>
          <div>{round(p.min)}</div>
          <input type="range" min={p.min} max={p.max} step="any" value={round(p.value)} />
          <div>{round(p.max)}</div>
          <div>{round(p.value)}</div>
        </Fragment>) : <i>No model loaded.</i>}
      </div> : <i>Not connected to VTube Studio.</i>
      }
    </div >
  )
}

export default App
