import Image from 'next/image';
import styles from '../styles/Footer.module.css'
{/*next image allows you to use an image as a component and it also optimizes them for faster rendering*/}

function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                    {/*these css modules are vital to how this ends up looking, separating concerns*/}
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </footer>
    )
}

export default Footer
