import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ContentWrapper from '../components/ContentWrapper'
//the above code will import the component from the components folder
import Header from '../components/Header'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
//the url const contains the base url from strapi, this making it accesible here
const URL = process.env.STRAPIBASEURL
//breakout as many components as possible, make it easier to find errors and debug if necessary 

//getStaticProps generates HTML and JSON files, since the data is coming from strapi, it needs to be fed to the front-end through this method.
//this in itself is an asynchronous function that makes it easier to get what you need from data sources
export async function getStaticProps(context) {
 //the method is post since it is transpilling the data from the cms
  const fetchParams = {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    //stringfify makes it possibe to literally convert a JS value into a JSON string, making it possible to access the data.
    body: JSON.stringify({
      query: `{
      blogposts{
        title
        blogbody
        description
        slug
        splash{
          url
        }
      }
    }
      `
    })
  }
//graphql to view and parse the date from strapi,
//the fetch() makes it possible to access resources asynchronously across the network.
  const res = await fetch(`${URL}/graphql`, fetchParams);
 //fetchparams brings back JSON that needs to be unpacked
  const { data } = await res.json();

  return {
    props: data,
    revalidate: 10,
    {/*revalidate requests new information from the server, in this case, strapi, every 10 secs*/}
  };
}
//keep the vercel assests as they are, the cms implementation is what will be the most challenging part of this.
// the blogposts are being fetched from the api through destructuring
export default function Home({ blogposts }) {
  return (
    <ContentWrapper>
      <Head>
        <title>HMJ Blog</title>
        <meta name="description" content="Blog Hmj" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
   {/*the classNames are being injected with their respective styles from the css modules*/}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="#">H.M. Blog!</a>
        </h1>
        <br />
        <h5 className={styles.subtitle}>
          ¡Bienvenido/a al <a href="#">H.M. Blog!</a>
        </h5>
     {/*this grid becomes a bit wonky on smaller devices,
      must edit.*/}
        <div className={styles.grid}>
         {/*This will map through the title, description, and slug data from strapi*/}
         {/*Through a successful breakdown of the api data, it is now being displayed on the homepage.*/}
          {blogposts.map((blog, i) => {
            const { title, description, slug } = blog;
            //through the destructuring of variables, the fron end receives the data as it is filled in strapi.
            return <Blog title={title} description={description} slug={slug} key={i} />
             {/*make sure to always inlcude a key when rendering more than one compondent from an array*/}
          })}
        </div>
      </main>
      <Footer />
    </ContentWrapper>
  )
}
