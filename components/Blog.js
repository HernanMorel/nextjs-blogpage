import React from 'react'
import Link from 'next/link';
import styles from '../styles/Blog.module.css'

//small function to handle posts being fed from strapi
/*take note of the props that this compoment needs to take
you want a small overview, aka the description
*/
/*internal routing is again done with next link, the +slug is added so that the 
blog routes to the slug that corresponds to the correct blog*/
function Blog({ description, title, slug }) {
    return (
        <Link href={"/posts/" + slug}>
            <a className={styles.card}>
                <h2>{title}</h2>
                <p>{description}</p>
                {/*here, simply destructure the items you want displayed*/}
            </a>
        </Link>
    )
}

export default Blog
