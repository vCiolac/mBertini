import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps extends PropsWithChildren {
  target?: Element | DocumentFragment
}

export const Portal: React.FC<PortalProps> = ({ children, target }) => {
  if (typeof window === 'undefined') return <></>

  return createPortal(children, target || document.body)
}
