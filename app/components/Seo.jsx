import Head from 'next/head';
import { siteURL } from '@/lib/env';
// import { useRouter } from 'next/router';

function Seo({
    title,
    image,
    description
}) {
    // const { asPath } = useRouter();

    return (
        <Head>
            <title>{title}</title>
            <meta name='og:title' content={title} />
            {/* <link rel='icon' href='/favicon.ico' />
            <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
            <meta name='twitter:site' content='@ccrsxx' />
            <meta name='twitter:card' content='summary_large_image' /> */}
            {description && <meta name='description' content={description} />}
            {description && <meta name='og:description' content={description} />}
            {image && <meta property='og:image' content={image} />}
            <meta
                name='og:url'
                content={siteURL}
            // content={`${siteURL}${asPath === '/' ? '' : asPath}`}
            />
        </Head>
    );
}

export default Seo;
