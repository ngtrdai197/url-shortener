import { URLDto } from "../models/url.dto";
import { ActionMap, RootActions } from ".";

export enum URL_ACTION {
  GET_LIST_URLS = "GET_LIST_URLS",
}

type URLPayload = {
  [URL_ACTION.GET_LIST_URLS]: URLDto[];
};

export type URLActions = ActionMap<URLPayload>[keyof ActionMap<URLPayload>];

export const urlReducer = (state: URLDto[], action: RootActions) => {
  switch (action.type) {
    case URL_ACTION.GET_LIST_URLS:
      return state;
    default:
      return state;
  }
};
