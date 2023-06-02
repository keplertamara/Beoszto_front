import { type Api } from 'src/api';

export function ApiMock(): jest.Mocked<Api> {
	return {
		/*
		 * If rejecting calls by default consider returning helpful values. Eg.:
		 * getUser: jest.fn().mockRejectedValue('Tried to call getUser() which was not explicitly mocked'),
		 */
		/* scaffolding-disable unless keepExamples */
		getSnippets: jest.fn().mockRejectedValue('Tried to call getSnippets() which was not explicitly mocked'),
		/* scaffolding-enable */
	};
}
