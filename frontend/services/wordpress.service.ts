import fetch from "isomorphic-unfetch";
import { Config } from "../config";
import { IWpCategory } from "../types/category";
import { IWpMenu } from "../types/menu";
import { IWpPage } from "../types/page";
import { IWpPost } from "../types/post";
import { WpCategoryTypes } from "../types/wp-types";
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

  public async getTypeByCategory(
    type: WpCategoryTypes,
    categoryId: number
  ): Promise<IWpPost[]> {
    return fetchAPI(`/wp-json/wp/v2/${type}?_embed&categories=${categoryId}`);
  }

  public async getCategories(
    slugs: string | string[] = ""
  ): Promise<IWpCategory[]> {
    const slug = getSlug(slugs);
    const slugQS = `${slug ? `slug=${slug}` : ""}`;
    try {
      return fetchAPI(`/wp-json/wp/v2/categories?${slugQS}`);
    } catch (e) {
      return [];
    }
  }

  public async getCategory(id: number): Promise<IWpCategory | undefined> {
    try {
      return fetchAPI(`/wp-json/wp/v2/categories/${id}`);
    } catch (e) {
      return;
    }
  }

  public async getMenu(): Promise<IWpMenu> {
    return fetchAPI("/wp-json/menus/v1/menus/header-menu");
  }
}

export default new WordpressService();
