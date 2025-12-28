'use client';
import {Image} from "next/dist/client/image-component";
import Link from "next/dist/client/link";
import {usePathname} from "next/dist/client/components/navigation";
import {cn} from "@/lib/utils";

const Header = () => {
    const pathname = usePathname();
    return (
        <header>
            <div className="main-container inner">
                <Link href="/">
                    <Image width={132} height={40} src="/assets/logo.svg" alt="CoinPulse logo" />
                </Link>

                <nav>
                    <Link className={cn('nav-link', {
                        'is-active': pathname === '/',
                        'is-home': true
                    })} href="/">Home</Link>

                    <p>Search Modal</p>

                    <Link className={cn('nav-link', {
                        'is-active': pathname === '/coins'
                    })} href="/coins">All Coins</Link>

                </nav>
            </div>
        </header>
    )
}
export default Header
