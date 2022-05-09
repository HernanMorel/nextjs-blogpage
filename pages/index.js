import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ContentWrapper from '../components/ContentWrapper'
import Header from '../components/Header'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

const URL = process.env.STRAPIBASEURL

//getStaticProps generates HTML and JSON files, since the data is coming from strapi, it needs to be fed to the front-end through this method.
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
  const { data } = await res.json();

  return {
    props: data,
    revalidate: 10,
    //revalidate/refresh the http cache will do so after 10 or so reloads.
  };
}
//keep the vercel assests as they are, the cms implementation is what will be the most challenging part of this.
export default function Home({ blogposts }) {
  return (
    <ContentWrapper>
      <Head>
        <title>HMJ Blog</title>
        <meta name="description" content="Blog Hmj" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    //the classNames are being injected with their respective styles from the css modules
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="#">H.M. Blog!</a>
        </h1>
        <br />
        <h5 className={styles.subtitle}>
          ¡Bienvenido/a al <a href="#">H.M. Blog!</a>
        </h5>
        //this grid isnt responsive on smaller devices, must edit.
        <div className={styles.grid}>
          //this will map through the title, description, and slug data from strapi
          //through 
          {blogposts.map((blog, i) => {
            const { title, description, slug } = blog;
            //through the destructuring of variables, the fron end receives the data as it is filled in strapi.
            return <Blog title={title} description={description} slug={slug} key={i} />
          })}
        </div>
      </main>
      <Footer />
    </ContentWrapper>
  )
}
