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

  public getPost<T = {}>(
    apiRoute?: string | string[],
    slug?: string | string[]
  ): Promise<IWpPost<T>> {
    const apiRouteQS = Array.isArray(apiRoute) ? apiRoute.join('/') : apiRoute;
    const slugQS = queryString.stringify({
      slug
    });
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/${apiRouteQS}?${slugQS}`)
      .then(res => res.json())
      .then(post => post[0]);
  }

  public getPostByCategory(categoryId: number): Promise<IWpPost[]> {
    return fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${categoryId}`
    ).then(res => res.json());
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
