import React, { useRef, useReducer, useLayoutEffect, forwardRef } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { ModalsRouterBase } from './ModalsRouterBase'
import { ModalsRouterRef } from '../typings/ModalsRouterRef'

export interface ModalsRouterProps {
  children?: React.ReactNode
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

function RefForwardingModalsRouter(
  { initialEntries, initialIndex, children }: ModalsRouterProps,
  ref:
    | ((instance: ModalsRouterRef | null | undefined) => void)
    | React.MutableRefObject<ModalsRouterRef | null | undefined>
    | null
    | undefined
) {
  const historyRef = useRef<NativeHistory>()
  if (historyRef.current == null) {
    historyRef.current = createNativeHistory({ initialEntries, initialIndex })
  }

  const history = historyRef.current
  const [state, dispatch] = useReducer((_: Update, action: Update) => action, {
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(dispatch), [history])

  return (
    <ModalsRouterBase
      ref={ref}
      action={state.action}
      location={state.location}
      navigator={history}
    >
      {children}
    </ModalsRouterBase>
  )
}

export const ModalsRouter = forwardRef(RefForwardingModalsRouter)
