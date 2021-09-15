import { useEffect, useState } from "react";

import Header from "../_header";
import Heart from "../../components/icons/heart";
import Image from "next/image";
import type { NextPage } from "next";
import styles from "../../styles/Gifs.module.scss";
import { useLogin } from "../../components/login";
import { useRouter } from "next/router";

interface Gif {
  images: { fixed_height: { url: string } };
}

const Gifs: NextPage = (props) => {
  const { userId } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [favGifs, setFavGifs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (userId < 0) {
      router.push("/users");
      return;
    }

    setIsLoading(true);

    const fetchFavGifs = async () => {
      const res = await fetch(
        `http://localhost:3000/api/favGifs?userId=${userId}`
      );

      const gifs = await res.json();
      const favGifsExternalIds = gifs.reduce(
        (p: any, c: any) =>
          !!p.length ? `${p}%2C${c.externalId}` : `${c.externalId}`,
        ""
      );

      const resGiphy = await fetch(
        `${process.env.GIPHY_URL}?api_key=${process.env.GIPHY_API_KEY}&ids=${favGifsExternalIds}`
      );

      const { data } = await resGiphy.json();
      setFavGifs(data);
    };

    try {
      fetchFavGifs();
    } catch (err) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
      setError(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <Header title="Favourites" leftLink="/gifs" leftLabel="Go to gifs" />

      <div className={styles.gifsContainer}>
        {!!favGifs || !!favGifs?.length
          ? favGifs.map((gif: any, i: number) => (
              <div className={styles.gif} key={gif.id + Date.now() + i}>
                <div>
                  <Image
                    src={gif.images.fixed_height.url}
                    alt="Gif"
                    height="200"
                    width="200"
                  />
                  <Heart
                    style={{
                      width: 50,
                      height: 50,
                      position: "absolute",
                      right: 5,
                      top: 3,
                    }}
                    fill="red"
                  />
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Gifs;
