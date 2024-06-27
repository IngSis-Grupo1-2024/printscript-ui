import {Pagination} from "./pagination.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";

export type ComplianceEnum =
    'pending' |
    'failed' |
    'not-compliant' |
    'compliant'


export type CreateSnippet = {
  name: string;
  content: string;
  language: string;
  extension: string;
}

export type ShareSnippet = {
  "snippetId": string,
  "userId": string
}

export type PostTestCase = {
  "id": string,
  "snippetId": string,
  "name": string,
  "input"?: string[],
  "output"?: string[],
  "envVars"?: string
}

export type UpdateRules = {
  "rules": Rule[]
}

export type CreateSnippetWithLang = CreateSnippet & { language: string }

export type UpdateSnippet = {
  content: string
}

export type Snippet = CreateSnippet & {
  id: string
} & SnippetStatus

type SnippetStatus = {
  compliance: ComplianceEnum;
  author: string;
}
export type PaginatedSnippets = Pagination & {
  snippets: Snippet[]
}

export const getFileLanguage = (fileTypes: FileType[], fileExt?: string) => {
  return fileExt && fileTypes?.find(x => x.extension == fileExt)
}