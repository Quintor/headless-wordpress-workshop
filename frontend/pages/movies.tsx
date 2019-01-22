import { NextContext } from 'next';
import Error from 'next/error';
import React, { Component, Fragment } from 'react';
import Layout from '../components/Layout';
import withHeaderMenu, { IMenuProps } from '../hoc/withHeaderMenu';
import service from '../services/wordpress.service';
import { IWpPost } from '../types/post';

interface IMovieModel {
  rating: string;
  release_year: string;
  description: string;
}
interface IOwnProps {
  movie: IWpPost<IMovieModel>;
}

type IProps = IOwnProps & IMenuProps;

class Movie extends Component<IProps> {
  public static async getInitialProps(context: NextContext) {
    const { slug, apiRoute } = context.query;
    const movie = await service.getPost<IMovieModel>(apiRoute, slug, true);
    return { movie };
  }

  public getImage(movie: IWpPost<IMovieModel>) {
    if (
      movie._embedded &&
      movie._embedded['wp:featuredmedia'] &&
      movie._embedded['wp:featuredmedia'].length > 0
    ) {
      return (
        <Fragment>
          <img
            className="image"
            src={movie._embedded['wp:featuredmedia'][0].source_url}
          />
          <style jsx={true}>
            {`
              .image {
                width: 100%;
              }
            `}
          </style>
        </Fragment>
      );
    }

    return null;
  }

  public render() {
    if (!this.props.movie.title) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout menu={this.props.headerMenu}>
        {this.getImage(this.props.movie)}
        <h1>{this.props.movie.title.rendered}</h1>
        <h3>{this.props.movie.acf.release_year}</h3>
        <h3>{this.props.movie.acf.rating}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.movie.acf.description
          }}
        />
      </Layout>
    );
  }
}

export default withHeaderMenu(Movie);
