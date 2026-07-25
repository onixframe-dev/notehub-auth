import css from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Hordzcin Ihar</p>
          <p>
            Contact us:
            <a href="mailto:onixframe.dev@gmail.com">
              onixframe.dev@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
