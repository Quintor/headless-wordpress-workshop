import fetch from 'isomorphic-unfetch';
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

  public getPost<T = {}>(apiRoute: string, slug: string): Promise<IWpPost<T>> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/${apiRoute}?slug=${slug}`)
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

  public getCategories(slug: string): Promise<IWpCategory[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`).then(
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
