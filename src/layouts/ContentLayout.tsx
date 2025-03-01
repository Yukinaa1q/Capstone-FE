import React from 'react'

const ContentLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='px-8 py-4 relative h-full'>
      {children}
    </div>
  )
}

export default ContentLayout