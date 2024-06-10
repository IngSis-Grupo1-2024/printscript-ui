import {SnippetOperations} from "./snippetOperations.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "./mock/fakeSnippetStore.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {TestCaseResult} from "./queries.tsx";
import axios from "axios"
import {BACKEND_URL} from "./constants.ts";


axios.interceptors.request.use(
    (config) => {
        try {
            const userToken = localStorage.getItem('token')
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => {
        return Promise.reject(error);
    }
)


const SnippetOperationsImpl: SnippetOperations = {

    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return Promise.resolve(undefined);
    }, deleteSnippet(id: string): Promise<string> {
        return Promise.resolve("");
    }, formatSnippet(snippet: string): Promise<string> {
        return Promise.resolve("");
    }, getFileTypes(): Promise<FileType[]> {
        return Promise.resolve([]);
    },
    async getFormatRules(): Promise<Rule[]> {
        try {
            const response = await axios.get(BACKEND_URL + "/configuration/rules", {
                params: {
                    userId:'ab9c5a41-c08c-4b85-bf8c-2da4bd8b7773',
                    ruleType: "FORMATTING"
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }, getLintingRules(): Promise<Rule[]> {
        return Promise.resolve([]);
    }, getSnippetById(id: string): Promise<Snippet | undefined> {
        return Promise.resolve(undefined);
    }, getTestCases(): Promise<TestCase[]> {
        return Promise.resolve([]);
    }, getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return Promise.resolve(undefined);
    }, listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return Promise.resolve(undefined);
    }, postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return Promise.resolve(undefined);
    }, removeTestCase(id: string): Promise<string> {
        return Promise.resolve("");
    }, shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return Promise.resolve(undefined);
    }, testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return Promise.resolve(undefined);
    }, updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return Promise.resolve(undefined);
    }
}

export default SnippetOperationsImpl
