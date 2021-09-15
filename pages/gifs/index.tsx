import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useLogin } from "../../components/login";
import { useState } from "react";

interface Gif {
  images: { fixed_height: { url: string } };
}

const getGifEndpoint = (search = "shoes") =>
  // TODO env var
  `https://api.giphy.com/v1/gifs/search?api_key=CSr4IirWLa0ctYx3LSuIwyrzbrt1MB6C&q=${search}&limit=25&offset=0&rating=g&lang=en`;

// Resolved in build time
export async function getStaticProps() {
  const res = await fetch(getGifEndpoint());
  const { data: gifs } = await res.json();

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

  const onSearch = async () => {
    try {
      const res = await fetch(getGifEndpoint(searchTerm));
      const { data } = await res.json();

      setGifs(data);
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
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Gifs </div>
        <Link href="/favGifs">
          <a>Go to favourites</a>
        </Link>
      </div>

      <div style={{ width: "100%", display: "flex" }}>
        <input
          className="input-text form-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-primary form-button" onClick={onSearch}>
          Sign me up!
        </button>
      </div>

      <ul>
        {!!gifs || !!gifs?.length
          ? gifs.map((gif: any) => (
              <li key={gif.id}>
                <div onClick={() => addToFavourites(gif.id)}>
                  <Image
                    src={gif.images.fixed_height.url}
                    alt="Gif"
                    height="200"
                    width="200"
                  />
                </div>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};

export default Gifs;
