import LoginForm from "../components/LoginForm"

import styles from "./page.module.css"

export default function Login() {

  return (
    <div className={styles.page}>
      <h1>Sign in</h1>
      <LoginForm/>
    </div>
  )

}
