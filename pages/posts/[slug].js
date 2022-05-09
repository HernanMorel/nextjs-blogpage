import Header from '../../components/Header'
import ContentWrapper from '../../components/ContentWrapper';
import Footer from '../../components/Footer';
import ReactMarkdown from "react-markdown";
import styles from '../../styles/BlogPage.module.css'
const URL = process.env.STRAPIBASEURL;
/*important to note:naming this js file [] with brackets lets nextjs know that this is a dynamic route
and it allows you to access the variable named slug
*/
/*gsp give you a template for static props*/
/*post is important since you're using graphql*/
export async function getStaticPaths() {
    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        {/*here again you are parsing data through stringify*/}
        body: JSON.stringify({
            query: `
            {
                blogposts{
                    slug
                }
            }
            `
        })
    }
    {/*desructuring the URL/graphql will allow you to hit your route, the fetchparams as that is what includes the data from the cms*/}
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const posts = await res.json()
    {/*this map allows you to map over the given post, fetch it, then store it in the paths variable*/}
    const paths = posts.data.blogposts.map((post) => {
        return { params: { slug: post.slug } }
    })
    {/*the paths array needs to display the route as listed by the dynamic slug*/}
    return {
        {/*this is setting up the data so that it may displayed when returned*/}
        paths: paths,
        fallback: true
    };
}
{/*the params allows you to fetch from strapi the given slug, from the given post and it gets fetched */}
export async function getStaticProps({ params }) {
    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        {/*this is again using the graphql give paths to fetch the title, description,blogbody, splash from the named slug*/}
        {/*Important thing to note: destructuring the params.slug makes it return a single post as opposed to all of them*/}
        body: JSON.stringify({
            query: `
            {
                blogposts(where: {slug: "${params.slug}"}){
                  title
                  description
                  blogbody
                  splash{
                    url
                  }
                }
              }
            `
        })
    }
    {/*now that the route is estblished, mapping over the selected blog and injecting that onto the route is next*/}
    const res = await fetch(`${URL}/graphql`, fetchParams);
    const { data } = await res.json();
    return {
        props: data.blogposts[0],
        revalidate: 10
    };
}
{/*since blogbody is markdown, it wont display as is. You need to import a the reactmarkdown package that converts that to html*/}
function Content({ title, blogbody, splash }) {

    return (
        {/*destructuring what you need from the posts into component-format is next, add the grid styles to make it pretty*/}
        {/*contentwrapper is what given component*/}
        {/*the header component contains the header you made previously */}
        <ContentWrapper>
            <Header />
            <main className={styles.grid}>
                <h1>{title}</h1>
                <ReactMarkdown>{blogbody}</ReactMarkdown>
            </main>
            <Footer />
        </ContentWrapper>
    )
}
export default Content
