export interface IWpPost<T = {}> {
  id: number;
  code: string;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  template: string;
  acf: T;
  _links: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
    about: [
      {
        href: string;
      }
    ];
    'wp:featuredmedia': [
      {
        embeddable: boolean;
        href: string;
      }
    ];
    'wp:attachment': [
      {
        href: string;
      }
    ];
    curies: [
      {
        name: string;
        href: string;
        templated: boolean;
      }
    ];
  };
}
