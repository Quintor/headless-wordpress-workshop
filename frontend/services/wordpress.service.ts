import fetch from 'isomorphic-unfetch';
import { Config } from '../config';
import { IWpMenu } from '../types/menu';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

class WordpressService {
  public getPosts(): Promise<IWpPost[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`).then(res =>
      res.json()
    );
  }

  public getPages(): Promise<IWpPage[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/pages?_embed`).then(res =>
      res.json()
    );
  }

  public getMenu(): Promise<IWpMenu> {
    return fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`).then(
      res => res.json()
    );
  }
}

export default new WordpressService();
