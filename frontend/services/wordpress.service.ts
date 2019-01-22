import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';
import { Config } from '../config';
import { IWpCategory } from '../types/category';
import { IWpMenu } from '../types/menu';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

class WordpressService {
  public getPosts(): Promise<IWpPost[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`).then(res =>
      res.json()
    );
  }

  public getPostOrPage<T = {}>(
    apiRoute?: string | string[],
    slug?: string | string[],
    embed?: boolean
  ): Promise<IWpPost<T>> {
    const apiRouteQS = Array.isArray(apiRoute) ? apiRoute.join('/') : apiRoute;
    const slugQS = queryString.stringify({
      slug
    });
    return fetch(
      `${Config.apiUrl}/wp-json/headless/v1/${apiRouteQS}?${
        embed ? '_embed&' : ''
      }${slugQS}`
    ).then(res => res.json());
  }

  public getMovie<T = {}>(slug?: string | string[]): Promise<IWpPost<T>> {
    const slugQS = queryString.stringify({
      slug
    });
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/movies?_embed&${slugQS}`)
      .then(res => res.json())
      .then(movies => movies[0]);
  }

  public async getPostByCategory(categoryId: number): Promise<IWpPost[]> {
    const postUri = `${
      Config.apiUrl
    }/wp-json/wp/v2/posts?_embed&categories=${categoryId}`;
    const moviesUri = `${
      Config.apiUrl
    }/wp-json/wp/v2/movies?_embed&categories=${categoryId}`;

    const [posts, movies] = await Promise.all([
      fetch(postUri).then(res => res.json()),
      fetch(moviesUri).then(res => res.json())
    ]);

    return [...posts, ...movies];
  }

  public getPages(): Promise<IWpPage[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/pages?_embed`).then(res =>
      res.json()
    );
  }

  public getCategories(slug?: string | string[]): Promise<IWpCategory[]> {
    if (slug == null) {
      return Promise.resolve([]);
    }
    const slugQS = queryString.stringify({
      slug
    });

    return fetch(`${Config.apiUrl}/wp-json/wp/v2/categories?${slugQS}`).then(
      res => res.json()
    );
  }

  public getMenu(): Promise<IWpMenu> {
    return fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`).then(
      res => res.json()
    );
  }
}

export default new WordpressService();
