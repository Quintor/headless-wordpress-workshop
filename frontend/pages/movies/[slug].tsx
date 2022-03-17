import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { IMenuProps } from "../../components/Menu";
import { getMenu } from "../../services/menu.service";
import { IWpPost } from "../../types/post";
import service from "../../services/wordpress.service";
import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";

interface IMovieModel {
  rating: string;
  release_year: string;
  description: string;
}

interface IOwnProps {
  movie: IWpPost<IMovieModel>;
}

type IProps = IOwnProps & IMenuProps;

const Movie: NextPage<IProps> = ({ movie, menu }) => {
  const router = useRouter();

  if ((!router.isFallback && !movie?.slug) || !movie) {
    return <ErrorPage statusCode={404} />;
  }

  const coverImage = movie?._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <Layout menu={menu}>
      <article>
        <Head>
          <title>{movie.title.rendered} | Star Wars 🌌 - WordPress + Next.JS</title>
          <meta property="og:image" content={coverImage?.source_url} />
        </Head>
        <header>
          {coverImage && (
            <Image
              width={2000}
              height={1000}
              alt={`Cover Image for ${movie.title.rendered}`}
              src={coverImage.source_url}
            />
          )}
          <h1>{movie.title.rendered}</h1>
          <h3>{movie.acf.release_year}</h3>
          <h3>{movie.acf.rating}</h3>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: movie.acf.description,
          }}
        />
      </article>
    </Layout>
  );
};

export default Movie;

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const menu = await getMenu();
  const movie = await service.getMovie<IMovieModel>(params?.slug);

  return { props: { movie, ...menu } };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const allMovies = await service.getMovies();

  return {
    paths: allMovies.map(({ slug }) => `/movies/${slug}`) || [],
    fallback: true,
  };
};
