import { Client } from '@notionhq/client';
import { Owner, Platform } from './games';

// example:
// https://github.com/morethanmin/morethan-log/blob/main/src/libs/apis/getPosts.ts

const NOTION_DATABASE = process.env.NOTION_DATABASE!;
const NOTION_TOKEN = process.env.NOTION_TOKEN!;

type Entry = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: null;
  icon: null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    wishlist: {
      id: string;
      type: string;
      checkbox: boolean;
    };
    owner: {
      id: string;
      type: string;
      select: {
        id: string;
        name: Owner;
        color: string;
      };
    };
    platform: {
      id: string;
      type: string;
      select: {
        id: string;
        name: Platform;
        color: string;
      };
    };
    name: {
      id: string;
      type: string;
      title: {
        type: string;
        text: {
          content: string;
          link: null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }[];
    };
  };
  url: string;
};

export type Game = {
  name: string;
  owner: Owner;
  platform: Platform;
  wishlist: boolean;
};

const parseResponse = (data: Entry[]) => {
  return data.map<Game>((entry) => {
    return {
      name: entry.properties.name.title[0].plain_text,
      owner: entry.properties.owner.select.name,
      platform: entry.properties.platform.select.name,
      wishlist: entry.properties.wishlist.checkbox,
    };
  });
};

export async function getGames() {
  const notion = new Client({
    auth: NOTION_TOKEN,
  });
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE,
  });
  return parseResponse(response.results as Entry[]);
}
