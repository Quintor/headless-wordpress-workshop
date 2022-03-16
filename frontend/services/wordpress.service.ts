import fetch from 'isomorphic-unfetch';
import { Config } from '../config';
import { IWpMenu } from '../types/menu';
import { IWpPage } from '../types/page';
import { IWpPost } from '../types/post';

class WordpressService {
  public async getPosts(): Promise<IWpPost[]> {
    // TODO Get posts from API
    return Promise.resolve([] as any);
  }

  public async getPages(): Promise<IWpPage[]> {
    // TODO Get pages from API
    return Promise.resolve([] as any);
  }

  public async getPost(slug: string): Promise<IWpPost> {
    // TODO Get post by slug from API
    return Promise.resolve({} as any);
  }

  public async getPage(slug: string): Promise<IWpPage> {
    // TODO Get page by slug from API
    return Promise.resolve({} as any);
  }

  public async getMenu(): Promise<IWpMenu> {
    return fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`).then(
      res => res.json()
    );
  }
}

export default new WordpressService();
