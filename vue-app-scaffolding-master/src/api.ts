import axios, { type AxiosInstance } from 'axios';
import { type Scope, Scopes, Snippet } from './domain/snippet'; // scaffolding-disable-line unless keepExamples

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get }: AxiosPartial = Axios()) {
	return {
		/* scaffolding-disable unless keepExamples */
		async getSnippets() {
			const { data } = await get('snippets');
			const json = data as Record<string, Record<string, unknown>>;
			// It's recommended to convert untyped JSON responses to domain objects at the edge
			const snippets = Object.entries(json)
					.map(([name, value]) => toSnippet({ name, value }));
			// Favor returning objects as they are simple to extend with additional properties as needed
			return { json: JSON.stringify(json, null, '\t'), snippets };
		},
		/* scaffolding-enable */
	};
}
export type Api = ReturnType<typeof Api>;

// Use to set convenient defaults.
// * It's recommended that a request starts with a '/'
// * If it starts with http(s):// then its either unnecessary or triggers cross-origin requests.
// * If it leaves the '/' out then it will be relative to the current path, which requests sensitive to navigation.
function Axios() {
	return axios.create({ baseURL: process.env.API_PATH });
}

/* scaffolding-disable unless keepExamples */
// The api.ts may also act as an anti-corruption layer, adjusting or otherwise stabilizing the API-returned
// domain objects to the format the client requires. In this example:
// - "scopes" arrives as a comma separated string, but is better used as an array
// - "body" arrives as an array of lines, but is best used as string
export function toSnippet({ name, value }: { name: string; value: Record<string, unknown> }) {
	// The JSON response is almost like the Snippet, but has a "scope" or comma separated values
	const { scope, ...rest } = value as Omit<Snippet, 'body' | 'scopes'> & { body: string[]; scope: string };
	const knownScopes = Object.values(Scopes) as string[];
	const scopes = (scope as string)
			.split(',')
			// The clients sometimes skip information they are aren't ready to make sense of
			.filter(scope => knownScopes.includes(scope))
			.map(string => string.trim()) as Scope[];
	const body = rest.body.join('\n');
	const rawForm = `"${name}": ${JSON.stringify(value, null, '\t')}`;
	return Snippet({ scopes, ...rest, body, rawForm });
}

export function findInJson(
	{ snippetsJson, prefix }:
	{ snippetsJson: string; prefix: string },
) {
	const entries = Object.entries(JSON.parse(snippetsJson)) as [string, { prefix: string }][];
	return entries.find(([_, snippet]) => snippet.prefix === prefix);
}
/* scaffolding-enable */
