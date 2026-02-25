'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { OrbitControls, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/webgl/helpers/Three'

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  orbit?: boolean
  enableZoom?: boolean
}

const View = forwardRef(
  ({ children, orbit, enableZoom = true, ...props }: ViewProps, ref) => {
    const localRef = useRef(null)
    useImperativeHandle(ref, () => localRef.current)

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>
          <ViewImpl track={localRef as any}>
            {children}
            {orbit && <OrbitControls enableZoom={enableZoom} />}
          </ViewImpl>
        </Three>
      </>
    )
  },
)

View.displayName = 'View'

export { View }
