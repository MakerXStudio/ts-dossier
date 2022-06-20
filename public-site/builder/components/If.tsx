import { ReactNode } from 'react'

export interface IfProps {
  condition: boolean
  children: ReactNode
}

export const If = (props: IfProps): JSX.Element | null => {
  return props.condition ? <>{props.children}</> : null
}
