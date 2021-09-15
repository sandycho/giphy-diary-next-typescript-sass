import type { NextPage } from "next";
import styles from "../../styles/Users.module.css";
import { useLogin } from "../../components/login";
import { useRouter } from "next/router";
import { useState } from "react";

const Users: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const { setLoginState } = useLogin();

  // TODO check whether this async function needs special treatment
  const createUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const { id: userId } = await res.json();

      setLoginState(userId);

      if (res.status === 200) {
        // redirect to gifs page and pass the user id
        router.push("/gifs");
      }
    } catch (err) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
    }
  };
  return (
    <div className={styles.users}>
      <div>
        <h1 className={styles.usersTitle}>Welcome to the Gif diary</h1>
      </div>

      <div>
        <p
          className={styles.usersSubtitle}
          style={{ ...(!isLogin && { visibility: "hidden" }) }}
        >
          Glad to see you again :D
        </p>
      </div>

      <div
        className={`card ${styles.formContainer}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div className={styles.form}>
          <input
            className="input-text form-input"
            placeholder="e.i. sandycho"
            onChange={(e) => setUsername(e.target.value)}
          />

          <button className="btn-primary form-button" onClick={createUser}>
            {isLogin ? "Log me in!" : "Sign me up!"}
          </button>
        </div>

        <a
          onClick={() => {
            setIsLogin((state) => !state);
          }}
          className={`app-link ${styles.alreadyUserLink}`}
        >
          {isLogin ? "Create an account!" : "Already got an account?"}
        </a>
      </div>
    </div>
  );
};

export default Users;
