
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-orange-500' />
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
                <span>Welcome to MernEats.com</span>
            </SheetTitle>
            <Separator className="my-4" />
            <SheetDescription className='flex'>
                <Button className='flex-1 font-bold bg-orange-500'>Lopg In</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
