import {FileType} from "../../types/FileType.ts";
import axiosInstance from "./axiosRequest.ts";
import {CONFIGURATION_URL, MANAGER_URL} from "../constants.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet, ShareSnippet, UpdateRules} from "../snippet.ts";
import {PaginatedUsers, User} from "../users.ts";
import {SnippetOperations} from "../snippetOperations.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {FakeSnippetOperations} from "../mock/fakeSnippetOperations.ts";

const fakeOpp = new FakeSnippetOperations()
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
        return axiosInstance.post(`${MANAGER_URL}`, createSnippet)
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

    // postTestCase(testCase: Partial<TestCase>): Promise<TestCase>

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const shareSnippet: ShareSnippet = {
            snippetId: snippetId,
            userId: userId
        }
        const types = await axiosInstance.post(`${MANAGER_URL}/share`, shareSnippet)
        return types.data
    }

    async formatSnippet(snippetId: string, snippetContent: string): Promise<string> {
        const response = await axiosInstance.post(`${MANAGER_URL}/run/format`, {id: snippetId, content: snippetContent})
        return response.data.message
    }

    async getFormatRules(): Promise<Rule[]> {
        const resp = await axiosInstance.get(`${CONFIGURATION_URL}/configuration/rules?ruleType=FORMATTING`)
        return resp.data.rules
    }

    async getLintingRules(): Promise<Rule[]> {
        const resp = await axiosInstance.get(`${CONFIGURATION_URL}/configuration/rules?ruleType=LINTING`)
        return resp.data.rules
        // return fakeOpp.getLintingRules()
    }

    // getTestCases(snippetId: string): Promise<TestCase[]> {
    getTestCases(): Promise<TestCase[]> {
        return fakeOpp.getTestCases();
    }

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const updateRules: UpdateRules = {
            rules: newRules
        }
        const types = await axiosInstance.post(`${CONFIGURATION_URL}/configuration/update_rules`, updateRules)
        return types.data
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const updateRules: UpdateRules = {
            rules: newRules
        }
        const types = await axiosInstance.post(`${CONFIGURATION_URL}/configuration/update_rules`, updateRules)
        return types.data
    }

    // postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
    postTestCase(testCase: TestCase): Promise<TestCase> {
        return fakeOpp.postTestCase(testCase);
    }

    removeTestCase(id: string): Promise<string> {
        return fakeOpp.removeTestCase(id);
    }

    // testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult>
    testSnippet(): Promise<TestCaseResult> {
        return fakeOpp.testSnippet();
    }

}
