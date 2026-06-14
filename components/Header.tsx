import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/img/Large.png"
            alt="do it"
            width={151}
            height={40}
            className={styles.logoLarge}
            priority
          />

          <Image
            src="/img/Small.png"
            alt="do it"
            width={71}
            height={40}
            className={styles.logoSmall}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
