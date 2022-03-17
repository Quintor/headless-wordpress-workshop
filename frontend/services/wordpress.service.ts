import fetch from "isomorphic-unfetch";
import { Config } from "../config";
import { IWpMenu } from "../types/menu";
import { IWpPage } from "../types/page";
import { IWpPost } from "../types/post";
import { JSONAPIError } from "./JSONAPIError";

async function fetchAPI(url: string) {
  const response = await fetch(`${Config.apiUrl}${url}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    console.error(
      `Failed to load '${response.url}'`,
      response.status,
      response.statusText,
      await response.text()
    );
    // convert non-2xx HTTP responses into errors:
    throw new JSONAPIError(response.statusText, response);
  }
  return response.json();
}

function getSlug(slugs: string | string[]): string {
  return encodeURIComponent(Array.isArray(slugs) ? slugs[0] : slugs);
}

class WordpressService {
  public async getPosts(): Promise<IWpPost[]> {
    return fetchAPI("/wp-json/wp/v2/posts?_embed");
  }

  public async getPages(): Promise<IWpPage[]> {
    return fetchAPI("/wp-json/wp/v2/pages?_embed");
  }

  public async getMovies(): Promise<IWpPost[]> {
    return fetchAPI("/wp-json/wp/v2/movies?_embed");
  }

  public async getPost<T = {}>(
    slugs: string | string[] = ""
  ): Promise<IWpPost<T>> {
    const slug = getSlug(slugs);
    return fetchAPI(`/wp-json/headless/v1/post?_embed&slug=${slug}`);
  }

  public async getMovie<T = {}>(
    slugs: string | string[] = ""
  ): Promise<IWpPost<T>> {
    const slug = getSlug(slugs);
    return fetchAPI(`/wp-json/headless/v1/movies?_embed&slug=${slug}`);
  }

  public async getPage(slugs: string | string[] = ""): Promise<IWpPage> {
    const slug = getSlug(slugs);
    // TODO Get page by slug from API
    return Promise.resolve({} as any);
  }

  public async getMenu(): Promise<IWpMenu> {
    return fetchAPI("/wp-json/menus/v1/menus/header-menu");
  }
}

export default new WordpressService();
