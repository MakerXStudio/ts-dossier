import React, { ReactNode } from 'react'
import { If } from './If'
import { isDefined } from '../shared/utilities'

export interface PageHeaderProps {
    children: ReactNode
    titleSubscript?: ReactNode
}

export const Header = (props: PageHeaderProps) => (
    <header>
        <h1>{props.children}</h1>
        <If condition={isDefined(props.titleSubscript)}>{props.titleSubscript}</If>
    </header>
)
