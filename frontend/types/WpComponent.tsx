import { Component } from "react";

export type WpComponent<P, S> = Component<P, S> & {
  getInitialProps?: <T>(ctx: any) => Promise<T>;
};
