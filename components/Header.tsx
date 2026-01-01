"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/SearchModal";

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image
            width={132}
            height={40}
            src="/assets/logo.svg"
            alt="CoinPulse logo"
          />
        </Link>

        <nav>
          <Link
            className={cn("nav-link", {
              "is-active": pathname === "/",
              "is-home": true,
            })}
            href="/"
          >
            Home
          </Link>

          <SearchModal initialTrendingCoins={[]} />

          <Link
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
            href="/coins"
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
