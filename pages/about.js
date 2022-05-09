import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReactMarkdown from "react-markdown";
import styles from '../styles/About.module.css'
{/*that markdown library needs to imported*/}
const URL =process.env.STRAPIBASEURL;

{/*the query is slightly different than the post query*/}
export async function getStaticProps() {

    const fetchParams ={
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({
            query: `
            {
                aboutcontents{
                  body
                }
              }
            `
        })
    }

    const res = await fetch(`${URL}/graphql`, fetchParams);
    const {data} = await res.json();
    {/*about contents is the items within the about section of the blog*/}
    {/*revalidate requests new information from the server, in this case, strapi, every 10 secs*/}
    return {
        props: data.aboutcontents[0],
        revalidate: 10
    };
}
{/*similar composition as of the structure of slugjs, here you are also destructuring the body props*/}
function About({body}) {
    return (
        <ContentWrapper>
            <Header/>
            <div className={styles.bodyContent}>
                <ReactMarkdown>{body}</ReactMarkdown>
            </div>
            <Footer/>
        </ContentWrapper>
    )
}

export default About
