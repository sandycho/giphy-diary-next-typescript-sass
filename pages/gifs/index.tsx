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
  }
}

const addToFavourites = (gifId: string) => {
  console.warn('No implemented!')
  // make a api call
}

const Gifs: NextPage = ({ gifs }: any) => {
  return (<>
    <div>Gifs </div>

    <ul>
      {!!gifs || !!gifs?.length
        ? gifs.map((gif: any) =>
          <li key={gif.id}>
            <div onClick={()=>addToFavourites(gif.id)}>
              <Image 
                src={gif.images.fixed_height.url} 
                alt="Gif" 
                height="200" 
                width="200" />
            </div>
          </li>)
        : ""}
    </ul>
  </>)
}

export default Gifs