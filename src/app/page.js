import Image from "next/image";
import styles from "./page.module.css";
import Quiz from "../components/quiz";
export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <Quiz />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.skool.com/cosmicquest"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Join Our Community
        </a>
      </footer>
    </div>
  );
}
