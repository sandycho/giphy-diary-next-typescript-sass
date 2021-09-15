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

const getGifEndpoint = (search = "shoes") => {
  return `${process.env.GIPHY_URL}/search?api_key=${process.env.GIPHY_API_KEY}&limit=25&offset=0&rating=g&lang=en&q=${search}`;
};

// Resolved in build time
export async function getStaticProps() {
  let gifs = [];
  try {
    const res = await fetch(getGifEndpoint());
    const data = await res.json();
    gifs = data.data;
  } catch (err) {
    // throw a friendly error
    console.warn("Uh-oh! Something went wrong.");
  }

  return {
    props: {
      gifs,
    },
  };
}

const Gifs: NextPage = ({ gifs: gifsSeed }: any) => {
  const { userId } = useLogin();
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState(gifsSeed);
  const router = useRouter();
  const [addFav, setAddFav] = useState(false);

  useEffect(() => {
    if (userId < 0) {
      router.push("/users");
      return;
    }

    const fetchFavGifs = async () => {
      if (!!gifs.length && !addFav) {
        const res = await fetch(
          `http://localhost:3000/api/favGifs?userId=${userId}`
        );

        const gifsRes = await res.json();

        const favGifsExternalIds = gifsRes.map(
          (favGif: any) => favGif.externalId
        );

        setGifs((gs: any) =>
          gs.map((g: any) => ({
            isFav: favGifsExternalIds.includes(g.id),
            ...g,
          }))
        );

        setAddFav(true);
      }
    };

    try {
      fetchFavGifs();
    } catch (err) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
    }
  }, [gifs, router, userId, addFav]);

  const onSearch = async () => {
    try {
      const res = await fetch(getGifEndpoint(searchTerm));
      const { data } = await res.json();

      setGifs(data);
      setAddFav(false);
    } catch (err) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
    }
  };

  const addToFavourites = async (gifId: string) => {
    const res = await fetch("/api/favGifs", {
      method: "POST",
      body: JSON.stringify({ externalId: gifId, userId }),
    });

    if (res.status !== 200) {
      // throw a friendly error
      console.warn("Uh-oh! Something went wrong.");
      return;
    }

    setAddFav(false);
  };

  return (
    <>
      <Header title="Gifs" leftLink="/favGifs" leftLabel="Go to favourites" />

      <div style={{ width: "100%", display: "flex", marginTop: 20 }}>
        <input
          className="input-text form-input"
          placeholder="i.e. kittens"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-primary form-button" onClick={onSearch}>
          Search
        </button>
      </div>

      <div className={styles.gifsContainer}>
        {!!gifs || !!gifs?.length
          ? gifs.map((gif: any, i: number) => (
              <div
                className={styles.gif}
                key={gif.id + Date.now() + i}
                onClick={() => (gif.isFav ? () => {} : addToFavourites(gif.id))}
              >
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
                  fill={gif.isFav ? "red" : ""}
                />
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Gifs;
