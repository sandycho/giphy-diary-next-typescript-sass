import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useLogin } from "../../components/login";

interface Gif {
  images: { fixed_height: { url: string } };
}

const Gifs: NextPage = (props) => {
  const { userId } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [favGifs, setFavGifs] = useState([]);

  useEffect(() => {
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
        `https://api.giphy.com/v1/gifs?api_key=CSr4IirWLa0ctYx3LSuIwyrzbrt1MB6C&ids=${favGifsExternalIds}`
      );

      const { data } = await resGiphy.json();
      setFavGifs(data);
    };

    try {
      fetchFavGifs();
    } catch (err) {
      console.log({ err });
      setError(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Favourites</div>
        <Link href="/gifs">
          <a>Go to gifs</a>
        </Link>
      </div>

      <ul>
        {!!favGifs || !!favGifs?.length
          ? favGifs.map((gif: any) => (
              <li key={gif.id}>
                <div>
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
