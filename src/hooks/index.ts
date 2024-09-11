import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export const useMediaQuery = (
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean => {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }

    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }

    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    handleChange()

    // Use deprecated `addListener` and `removeListener` to support Safari < 14
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return matches
}

export const useBreakpoints = () => {
  const isExtraSmallScreen = useMediaQuery('(min-width: 480px)')
  const isSmallScreen = useMediaQuery('(min-width: 640px)')
  const isMediumScreen = useMediaQuery('(min-width: 768px)')
  const isLargeScreen = useMediaQuery('(min-width: 990px)')
  const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)')
  const is2ExtraLargeScreen = useMediaQuery('(min-width: 1440px)')

  const breakpoints = useMemo(
    () => ({
      isExtraSmallScreen,
      isSmallScreen,
      isMediumScreen,
      isLargeScreen,
      isExtraLargeScreen,
      is2ExtraLargeScreen,
    }),
    [
      isExtraSmallScreen,
      isSmallScreen,
      isMediumScreen,
      isLargeScreen,
      isExtraLargeScreen,
      is2ExtraLargeScreen,
    ],
  )

  return breakpoints
}
