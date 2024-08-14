'use client'

import { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Nav({ children } : { children: ReactNode }) {
    return 
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
        {children}
    </nav>
}

export function NavLink(props: Omit<ComponentProps<typeof 
    Link>, "className"> ) {
    return <Link {...props} className={cn()} />
}