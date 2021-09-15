import { shallowEqual, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { RootState } from "../../store";

interface Gif {
  images: { fixed_height: { url: string } };
}

// Resolved in build time
export async function getStaticProps() {
  // TODO env var
  const res = await fetch(
    "https://api.giphy.com/v1/gifs/search?api_key=CSr4IirWLa0ctYx3LSuIwyrzbrt1MB6C&q=shoes&limit=25&offset=0&rating=g&lang=en"
  );
  const { data: gifs } = await res.json();

  // const a = {
  //   type: 'gif',
  //   id: '26TM88tPoYX5QNGESP',
  //   url: 'https://giphy.com/gifs/reaction-mood-26TM88tPoYX5QNGESP',
  //   slug: 'reaction-mood-26TM88tPoYX5QNGESP',
  //   bitly_gif_url: 'http://gph.is/2p2Vi71',
  //   bitly_url: 'http://gph.is/2p2Vi71',
  //   embed_url: 'https://giphy.com/embed/26TM88tPoYX5QNGESP',
  //   username: '',
  //   source: '',
  //   title: 'shoes GIF',
  //   rating: 'g',
  //   content_url: '',
  //   source_tld: '',
  //   source_post_url: '',
  //   is_sticker: 0,
  //   import_datetime: '2018-03-09 19:45:35',
  //   trending_datetime: '0000-00-00 00:00:00',
  //   images: {}
  // }

  return {
    props: {
      gifs,
    },
  };
}

const useUser = () => {
  return useSelector(
    (state: RootState) => ({
      userId: state.userId,
    }),
    shallowEqual
  );
};
const Gifs: NextPage = ({ gifs }: any) => {
  const { userId } = useUser();

  const addToFavourites = async (gifId: string) => {
    console.log("CLICK");
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
