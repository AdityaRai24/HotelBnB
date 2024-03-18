import { Button } from '@/components/ui/button'
import React from 'react'
import CreationSubmit from '../submitButtons'
import Link from 'next/link'

const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
    <div className="flex items-center justify-between mx-auto w-3/5  h-full">
        <Button variant="outline" size="lg">
            <Link href={'/'}>Cancel</Link>
        </Button>
        <CreationSubmit />
    </div>
</div>
  )
}

export default CreationBottomBar