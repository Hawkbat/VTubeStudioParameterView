import React, { Fragment, useEffect, useRef, useState } from 'react'
import './App.css'
import { ApiClient, ILive2DParameter, Plugin, WebSocketBus } from 'vtubestudio'
import { BufferedWebsocket } from './utils'


const TOKEN_KEY = 'vtstudio-parameter-view-token'
const FILTER_KEY = 'vtstudio-parameter-view-filter'
const FAVORITES_KEY = 'vtstudio-parameter-view-favorites'

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}

function App() {
  const [connected, setConnected] = useState(false)
  const [parameters, setParameters] = useState<ILive2DParameter[] | null>()
  const [error, setError] = useState('')
  const [filter, setFilter] = useState(() => localStorage.getItem(FILTER_KEY) ?? '')
  const [favorites, setFavorites] = useState<Record<string, true>>(() => (JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]') as string[]).reduce((p, c) => ({ ...p, [c]: true }), {} as Record<string, true>))
  const filterRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
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
        setError('')
      } catch (e) {
        setError('' + e)
      }
      requestAnimationFrame(f)
    }

    f()

    return () => {
      runToken.active = false
    }
  }, [])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        if (filterRef.current) filterRef.current.focus()
        setFilter(filter => filter + e.key)
      } else if (e.key === 'Backspace') {
        if (filterRef.current) filterRef.current.focus()
        setFilter(filter => filter.substr(0, filter.length - 1))
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  const toggleFave = (name: string) => {
    const result = { ...favorites }
    if (result[name]) delete result[name]
    else result[name] = true
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Object.keys(result)))
    setFavorites(result)
  }

  const changeFilter = (filter: string) => {
    localStorage.setItem(FILTER_KEY, filter)
    setFilter(filter)
  }

  const filteredParams = filter ? parameters?.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : parameters

  const sortedParams = filteredParams?.sort((a, b) => (favorites[b.name] ? 1 : 0) - (favorites[a.name] ? 1 : 0))

  return (
    <div className="App">
      {connected && !error && parameters?.length ? <>
        <label>Filter:&nbsp;<input ref={filterRef} type="text" defaultValue={filter} onChange={e => changeFilter(e.target.value)} /></label>
        <br />
      </> : null}
      {connected && !error ? <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 60px 1fr 60px 60px' }}>
        <label>★</label>
        <label>Parameter Name</label>
        <label>Min</label>
        <label>Range</label>
        <label>Max</label>
        <label>Value</label>
        {sortedParams ? sortedParams.map((p, i) => <Fragment key={p.name + i}>
          <div className="paramFave" onClick={() => toggleFave(p.name)}>{favorites[p.name] ? '★' : '☆'}</div>
          <div className="paramName">{p.name}</div>
          <div className="paramMin">{round(p.min)}</div>
          <input className="paramRange" type="range" min={p.min} max={p.max} step="any" value={round(p.value)} readOnly />
          <div className="paramMax">{round(p.max)}</div>
          <div className="paramValue">{round(p.value)}</div>
        </Fragment>) : <i>No model is currently loaded. Load a model to view Live2D parameters.</i>}
      </div> : <i title={error}>Not connected to VTube Studio. Ensure that you are running the latest version of the VTube Studio beta on the same device as this webpage.</i>
      }
    </div >
  )
}

export default App
