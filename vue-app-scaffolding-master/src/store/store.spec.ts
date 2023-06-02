/* scaffolding-delete-file unless keepExamples */
import { Snippet } from 'src/domain/snippet';
import { ApiMock } from 'test/utils/api-mock';
import { Store } from './store';

test('is unit testable with api mocked out', async () => {
	const snippets = [TestSnippet({ prefix: '' })];
	const { store } = setup({ snippets });
	await store.loadSnippets();
	expect(store.message.value).toEqual(expect.stringContaining('code-snippets'));
	expect(store.snippets.value).toEqual(snippets);
});

// The "setup" function as a pattern is used to initialize tests.
// It's responsible to provide descriptive options and return values
// in order to help tests to be easy to read and follow.
// Consider using it instead of the implicit beforeEach style.
function setup({ snippets }: { snippets: Snippet[] }) {
	const api = ApiMock();
	api.getSnippets.mockResolvedValue({ json: '{ "mock": true }', snippets });
	const store = Store({ api });
	return { store };
}

function TestSnippet(
	{ scopes = ['javascript'], body = 'test-body', prefix = 'test-prefix', rawForm = 'test-rawForm' }:
	Partial<Snippet>,
) {
	return Snippet({ scopes, body, prefix, rawForm });
}
