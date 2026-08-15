"use client";
import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>
            Developer:{" "}
            <Link href="https://github.com/onixframe-dev">
              Hordzich Ihar
            </Link>
          </p>
          <p>
            Contact us:
            <Link href="mailto:onixframe.dev@gmail.com">onixframe.dev@gmail.com.app</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
