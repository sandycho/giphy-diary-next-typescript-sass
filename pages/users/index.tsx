import type { NextPage } from "next";
import styles from "../../styles/Users.module.scss";
import { useLogin } from "../../components/login";
import { useRouter } from "next/router";
import { useState } from "react";

const Users: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<
    "userAlreadyExist" | "error" | undefined
  >();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const { setLoginState } = useLogin();

  const createUser = async () => {
    const createOrGetUser = isLogin
      ? () => fetch(`/api/user/${username}`)
      : () =>
          fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username }),
          });

    try {
      const res = await createOrGetUser();
      const { id: userId } = await res.json();

      setLoginState(userId);

      if (res.status === 200) {
        router.push("/gifs");
      }

      if (res.status === 402) {
        setError("userAlreadyExist");
      }
    } catch (err) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
    }
  };
  return (
    <div className={styles.users}>
      <div>
        <h1 className={styles.usersTitle}>
          Welcome to
          <br /> GIF DIARY
        </h1>
      </div>

      <div>
        <p
          className={styles.usersSubtitle}
          style={{ ...(!isLogin && { visibility: "hidden" }) }}
        >
          Glad to see you again :D
        </p>
      </div>

      <div className={`card ${styles.formContainer}`}>
        <div className={`form ${styles.form}`}>
          <input
            className="input-text form-input"
            placeholder="e.i. sandycho"
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            className={`btn-primary form-button ${
              !username.length ? "btn-primary--disabled" : ""
            }`}
            onClick={createUser}
          >
            {isLogin ? "Log me in!" : "Sign me up!"}
          </button>
        </div>

        {error && (
          <span className="error-label">
            {error === "userAlreadyExist"
              ? "User already exists. Login instead."
              : "Uh-oh! Something went wrong! Refresh and retry."}
          </span>
        )}

        <a
          onClick={() => {
            setIsLogin((state) => !state);
            if (error === "userAlreadyExist") {
              setError(undefined);
            }
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
