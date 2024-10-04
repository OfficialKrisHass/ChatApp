import Link from "next/link";

import { auth, signOut } from "../auth";

import styles from "./page.module.css";

export default async function Home() {

  const session = await auth();
  const user = session?.user?.email;

  console.log(user);

  return (
    <div className={styles.page}>
      <h1>Chat App</h1>
      <Link href="/login">Log In</Link>
      <form action={async () => {
          "use server";
          await signOut();
        }}>
        <button>Sign Out</button>
      </form>
    </div>
  );

}
