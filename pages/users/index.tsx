import type { NextPage } from "next";
import { useLogin } from "../../components/login";
import { useRouter } from "next/router";
import { useState } from "react";

const Users: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const { setLoginState } = useLogin();

  // TODO check whether this async function needs special treatment
  const createUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const { id: userId } = await res.json();

    setLoginState(userId);

    if (res.status === 200) {
      // redirect to gifs page and pass the user id
      router.push("/gifs");
    } else {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <div>Hello</div>

      <div style={{ width: "100%", display: "flex" }}>
        <input
          className="input-text form-input"
          placeholder="e.i. sandycho"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn-primary form-button" onClick={createUser}>
          Sign me up!
        </button>
      </div>
    </div>
  );
};

export default Users;
