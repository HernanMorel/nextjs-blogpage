import React from 'react'
import Styles from '../styles/ContentWrapper.module.css'
/*this is taking in children as a prop, you will then use div that renders that prop */
/*compoments are made using this established method. They are thus easy to maintain and reuse*/
function ContentWrapper({children}) {
    return (
        <div className={Styles.container}>
            {children}
        </div>

    )
}

export default ContentWrapper
