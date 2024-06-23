import {FileType} from "../../types/FileType.ts";
import {FakeSnippetOperations} from "../mock/fakeSnippetOperations.ts";
import axiosInstance from "./axiosRequest.ts";
import {MANAGER_URL} from "../constants.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "../snippet.ts";

export class RemoteSnippetOperations extends FakeSnippetOperations {
    override async getFileTypes(): Promise<FileType[]> {
        const types = await axiosInstance.get(`${MANAGER_URL}/fileType`)
        return types.data
    }

    async saveName(name: string): Promise<string> {
        const types = await axiosInstance.post(`${MANAGER_URL}/userName`, name)
        return types.data
    }

    override createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        super.createSnippet(createSnippet)
        return axiosInstance.post(`${MANAGER_URL}`, createSnippet)
    }

    override deleteSnippet(id: string): Promise<string> {
        super.deleteSnippet(id)
        return axiosInstance.delete(`${MANAGER_URL}/${id}`)
    }

    override getSnippetById(id: string): Promise<Snippet | undefined> {
        super.getSnippetById(id)
        return axiosInstance.get(`${MANAGER_URL}/${id}`)
    }
    override updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        super.updateSnippetById(id, updateSnippet)
        return axiosInstance.put(`${MANAGER_URL}/${id}`, updateSnippet)
    }

    async listSnippetDescriptors(page: number,pageSize: number): Promise<PaginatedSnippets> {
        const response = await axiosInstance.get(`${MANAGER_URL}/snippetDescriptors`)
        const snippets = response.data.snippets
        const paginatedSnippets: PaginatedSnippets = {
            page: page,
            page_size: pageSize,
            count: 20,
            snippets: page == 0 ? snippets.splice(0,pageSize) : snippets.splice(1,2)
        }

        return new Promise(resolve => {
            setTimeout(() => resolve(paginatedSnippets))
        })
    }

    // postTestCase(testCase: Partial<TestCase>): Promise<TestCase>

    // shareSnippet(snippetId: string,userId: string): Promise<Snippet>

    // testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult>
}
