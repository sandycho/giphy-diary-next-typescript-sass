import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

interface Gif {
  images: { fixed_height: { url: string } };
}

// Resolved in build time
export async function getStaticProps() {
  let favGifs;
  let data;

  try {
    // TODO refactor URL
    const res = await fetch(`http://localhost:3000/api/favGifs?userId=1`);
    favGifs = await res.json();
    const favGifsExternalIds = favGifs.reduce(
      (p: any, c: any) =>
        !!p.length ? `${p}%2C${c.externalId}` : `${c.externalId}`,
      ""
    );
    const resGiphy = await fetch(
      `https://api.giphy.com/v1/gifs?api_key=CSr4IirWLa0ctYx3LSuIwyrzbrt1MB6C&ids=${favGifsExternalIds}`
    );

    data = await resGiphy.json();
    console.log({ data });
  } catch (err) {
    console.log({ err }); // TODO
  }

  return {
    props: {
      favGifs: data.data,
    },
  };
}

const Gifs: NextPage = ({ favGifs }: any) => {
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
