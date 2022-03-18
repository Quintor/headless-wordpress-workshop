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
    // TODO Get data from API
    return Promise.resolve({} as any);
  }

  public async getPages(): Promise<IWpPage[]> {
    // TODO Get data from API
    return Promise.resolve({} as any);

  }

  public async getMovies(): Promise<IWpPost[]> {
    // TODO Get data from API
    return Promise.resolve({} as any);

  }

  public async getPost<T = {}>(
    slugs: string | string[] = ""
  ): Promise<IWpPost<T>> {
    // TODO Get data from API
    return Promise.resolve({} as any);

  }

  public async getMovie<T = {}>(
    slugs: string | string[] = ""
  ): Promise<IWpPost<T>> {
    // TODO Get data from API
    return Promise.resolve({} as any);

  }

  public async getPage(slugs: string | string[] = ""): Promise<IWpPage> {
    const slug = getSlug(slugs);
    // TODO Get data from API
    return Promise.resolve({} as any);

  }

  public async getTypeByCategory(
    type: WpCategoryTypes,
    categoryId: number
  ): Promise<IWpPost[]> {
    // TODO Get data from API
    return Promise.resolve([] as any);

  }

  public async getCategories(
    slugs: string | string[] = ""
  ): Promise<IWpCategory[]> {
    // TODO Get data from API
    return Promise.resolve([] as any);

  }

  public async getCategory(id: number): Promise<IWpCategory | undefined> {
    // TODO Get data from API
    return Promise.resolve([] as any);

  }

  public async getMenu(): Promise<IWpMenu> {
    return fetchAPI("/wp-json/menus/v1/menus/header-menu");
  }
}

export default new WordpressService();
