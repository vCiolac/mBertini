import { ReactNode } from 'react'

export const splitToSpan = (element: ReactNode, spanClass = '') => {
  if (!element) return <></>

  if (!(element as unknown as React.JSX.Element).props?.children) return element

  const text = (element as unknown as React.JSX.Element).props.children

  const newElement = {
    ...(element as unknown as React.JSX.Element),
    props: {
      ...(element as unknown as React.JSX.Element).props,
      children: text.split('').map((char: string, index: number) => (
        <span
          key={`${index}-${char}`}
          className={spanClass ? `inline-block ${spanClass}` : 'inline-block'}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )),
    },
  }

  return newElement
}
