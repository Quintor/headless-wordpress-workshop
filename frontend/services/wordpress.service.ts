import fetch from "isomorphic-unfetch";
import { Config } from "../config";
import { IWpMenu } from "../types/menu";
import { IWpPage } from "../types/page";
import { IWpPost } from "../types/post";
import { JSONAPIError } from "./JSONAPIError";

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
    const response = await fetch(
      `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      // convert non-2xx HTTP responses into errors:
      const error = new JSONAPIError(response.statusText, response);
      return Promise.reject(error);
    }
    return response.json();
  }
}

export default new WordpressService();
