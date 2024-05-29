import {Page} from "./types";

export function toPageDTO<T>(findAndCount: [T[], number], page: number, limit: number): Page<T> {
  return {
    page,
    limit,
    total: findAndCount[1],
    contents: findAndCount[0]
  }
}