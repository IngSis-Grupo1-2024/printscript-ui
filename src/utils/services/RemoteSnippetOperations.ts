import {FileType} from "../../types/FileType.ts";
import axiosInstance from "./axiosRequest.ts";
import {CONFIGURATION_URL, MANAGER_URL} from "../constants.ts";
import {
    CreateSnippet,
    PaginatedSnippets,
    Snippet,
    UpdateSnippet,
    ShareSnippet,
    UpdateRules,
    PostTestCase
} from "../snippet.ts";
import {PaginatedUsers, User} from "../users.ts";
import {SnippetOperations} from "../snippetOperations.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";

export class RemoteSnippetOperations implements SnippetOperations {
    async getFileTypes(): Promise<FileType[]> {
        const types = await axiosInstance.get(`${MANAGER_URL}/fileType`)
        return types.data
    }

     async saveName(name: string): Promise<string> {
        const types = await axiosInstance.post(`${MANAGER_URL}/userName`, name)
        return types.data
    }

     createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/`, createSnippet)
    }

     deleteSnippet(id: string): Promise<string> {
        return axiosInstance.delete(`${MANAGER_URL}/${id}`)
    }

     async getSnippetById(id: string): Promise<Snippet | undefined> {
        const resp = await axiosInstance.get(`${MANAGER_URL}/${id}`)
        return resp.data
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
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
     async getUserFriends(name: string = "", page: number = 1, pageSize: number = 10): Promise<PaginatedUsers> {
        const resp = await axiosInstance.get(`${MANAGER_URL}/users`)
        const users: User[] = resp.data.users.filter((x: User) => x.name.includes(name))
        return {
            page: page,
            page_size: pageSize,
            count: users.length,
            users: users
        };
    }

     async getDefaultConfig(): Promise<string> {
        const types = await axiosInstance.post(`${MANAGER_URL}/rules/default`)
        return types.data
    }


    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const shareSnippet: ShareSnippet = {
            snippetId: snippetId,
            userId: userId
        }
        const types = await axiosInstance.post(`${MANAGER_URL}/share`, shareSnippet)
        return types.data
    }

    async formatSnippet(snippetId: string): Promise<string> {
        const response = await axiosInstance.post(`${MANAGER_URL}/run/format/${snippetId}`)
        return response.data.message
    }

    async runSnippet(snippetId: string): Promise<string> {
        const response = await axiosInstance.post(`${MANAGER_URL}/run/execute/${snippetId}`).catch(
            (error) => {
                return error.response
            }
        )
        return response.data
    }

    async getFormatRules(): Promise<Rule[]> {
        const resp = await axiosInstance.get(`${MANAGER_URL}/rules/formatting`)
        return resp.data.rules
    }

    async getLintingRules(): Promise<Rule[]> {
        const resp = await axiosInstance.get(`${MANAGER_URL}/rules/linting`)
        return resp.data.rules
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const types = await axiosInstance.get(`${CONFIGURATION_URL}/test_case/${snippetId}`)
        return types.data.testCases
    }

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const updateRules: UpdateRules = {
            rules: newRules,
            type: "FORMATTING"
        }
        const types = await axiosInstance.put(`${MANAGER_URL}/rules`, updateRules)
        return types.data
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const updateRules: UpdateRules = {
            rules: newRules,
            type: "LINTING"
        }
        const types = await axiosInstance.put(`${MANAGER_URL}/rules`, updateRules)
        return types.data
    }

    async postTestCase(snippetId: string, testCase: TestCase): Promise<TestCase> {
        testCase = this.getTestCase(testCase)
        const postTestCase: PostTestCase = {
            id: testCase.id,
            snippetId: snippetId,
            name: testCase.name,
            input: testCase.input,
            output: testCase.output,
            envVars: testCase.envVars
        }
        const types = await axiosInstance.post(`${MANAGER_URL}/test_case`, postTestCase)
        return types.data
    }

    async removeTestCase(id: string): Promise<string> {
        const types = await axiosInstance.delete(`${MANAGER_URL}/test_case/${id}`)
        return types.data
    }

    async testSnippet(snippetId:string, testCase: TestCase): Promise<TestCaseResult> {
        testCase = this.getTestCase(testCase)
        const postTestCase: PostTestCase = {
            id: testCase.id,
            snippetId: snippetId,
            name: testCase.name,
            input: testCase.input,
            output: testCase.output,
            envVars: testCase.envVars
        }
        const types = await axiosInstance.put(`${MANAGER_URL}/test_case/${snippetId}`, postTestCase)
        return types.data
    }

    private getTestCase(testCase: TestCase): TestCase{
        if(testCase.id === undefined) testCase.id = "0"
        if(testCase.input === undefined) testCase.input = []
        if(testCase.output === undefined) testCase.output = []
        if(testCase.envVars === undefined) testCase.envVars = ""
        return testCase
    }
}
