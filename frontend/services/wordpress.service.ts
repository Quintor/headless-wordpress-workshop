import fetch from "isomorphic-unfetch";
import { WpPost } from "../types/post";
import { Config } from "../config";
import { WpPage } from "../types/page";
import { WpCategory } from "../types/category";
import { WpMenu } from "../types/menu";

class WordpressService {
  getPosts(): Promise<WpPost[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`).then(res =>
      res.json()
    );
  }

  getPost(apiRoute: string, slug: string): Promise<WpPost> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/${apiRoute}?slug=${slug}`)
      .then(res => res.json())
      .then(post => post[0]);
  }

  getPostByCategory(categoryId: number): Promise<WpPost[]> {
    return fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${categoryId}`
    ).then(res => res.json());
  }

  getPages(): Promise<WpPage[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/pages?_embed`).then(res =>
      res.json()
    );
  }

  getCategories(slug: string): Promise<WpCategory[]> {
    return fetch(`${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`).then(
      res => res.json()
    );
  }

  getMenu(): Promise<WpMenu[]> {
    return fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`).then(
      res => res.json()
    );
  }
}

export default new WordpressService();
