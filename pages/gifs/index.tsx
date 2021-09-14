import Image from 'next/image'
import type { NextPage } from "next"

interface Gif { images: { fixed_height: { url: string } } }

// Resolved in build time
export async function getStaticProps() {
  // TODO env var
  const res = await fetch('https://api.giphy.com/v1/gifs/search?api_key=CSr4IirWLa0ctYx3LSuIwyrzbrt1MB6C&q=shoes&limit=25&offset=0&rating=g&lang=en')
  const { data } = await res.json()

  // Filtering as there are too many domain to configure in next.config.js
  const gifs = data.filter((gif: Gif) => gif.images.fixed_height.url.includes('media2.giphy.com'))

  return {
    props: {
      gifs,
    },
  }
}

const Gifs: NextPage = ({ gifs }: any) => {
  return (<>
    <div>Gifs </div>
    <ul>
      <ul>
        {!!gifs || !!gifs?.length ? gifs.map((gif: any) => <li key={gif.id}><Image src={gif.images.fixed_height.url} alt="Gif" height="200" width="200" /></li>) : ""}
      </ul>
    </ul>
  </>)
}

export default Gifs