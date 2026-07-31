import Head from 'next/head';

const SITE_NAME = 'Rakkidi';

type PageMetaProps = {
  /** Page-specific part of the title, e.g. "Dashboard". */
  title: string;
  description?: string;
};

/**
 * Every route used to inherit the single `<title>` set in _app, which leaves
 * screen-reader users and browser history with no way to tell pages apart
 * (WCAG 2.4.2). Drop this at the top of a page to give it its own title.
 */
const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => (
  <Head>
    <title>{`${title} | ${SITE_NAME}`}</title>
    {description && <meta name="description" content={description} />}
  </Head>
);

export default PageMeta;
