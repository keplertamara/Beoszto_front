/* scaffolding-delete-file unless keepExamples */
import { Api } from 'src/api';
import { Store } from 'src/store';
import { SnippetsResponse } from 'test/fixtures';
import { AxiosMock } from 'test/utils';

test('is integration testable with http client mock', async () => {
	const { store, axios } = setup();

	// Note that in integration tests we mock the network response
	// instead of the sanitized value the Api abstraction returns.
	const data = SnippetsResponse();
	axios.get.mockResolvedValue({ data });

	await store.loadSnippets();
	expect(axios.get).toHaveBeenCalledTimes(1);
	expect(axios.get).toHaveBeenCalledWith('snippets');
	expect(store.snippets.value.length).toBe(Object.entries(data).length);
	expect(JSON.parse(store.snippetsJson.value)).toEqual(data);
});

function setup() {
	const axios = AxiosMock();
	const api = Api(axios);
	const store = Store({ api });
	return { store, axios };
}
