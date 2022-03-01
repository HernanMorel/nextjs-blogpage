import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ContentWrapper from '../components/ContentWrapper'
import Header from '../components/Header'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

const URL = process.env.STRAPIBASEURL

export async function getStaticProps(context) {
  const fetchParams = {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
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

  const res = await fetch(`${URL}/graphql`, fetchParams);
  const { data } = await res.json();

  return {
    props: data,
    revalidate: 10,
  };
}

export default function Home({ blogposts }) {
  return (
    <ContentWrapper>
      <Head>
        <title>HMJ Blog</title>
        <meta name="description" content="Blog Hmj" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="#">H.M. Blog!</a>
        </h1>
        <br />
        <h5 className={styles.subtitle}>
          Bienvenido/a al <a href="#">H.M. Blog!</a>
        **Todos los artículos del blog están escritos en español e inglés**
        </h5>
        <div className={styles.grid}>
          {blogposts.map((blog, i) => {
            const { title, description, slug } = blog;
            return <Blog title={title} description={description} slug={slug} key={i} />
          })}
        </div>
      </main>
      <Footer />
    </ContentWrapper>
  )
}
