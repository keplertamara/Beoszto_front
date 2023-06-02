/* scaffolding-delete-file unless keepExamples */
// Exposing primitive values is fine as a constant
export const SNIPPETS_API_PATH = 'snippets';

// To prevent accidentally mutating the non-primitive values it's recommended
// to expose them as functions. This eliminates the need to deep-freeze them.
// Additionally, it allows for backwards compatible customizations via options.
export function SnippetsResponse() {
	return {
		'Sass - Hotpink!': {
			scope: 'scss',
			prefix: 'use-hotpink',
			body: ['body { background: hotpink; }'],
		},
		'Js - Log!': {
			scope: 'javascript',
			prefix: 'use-log',
			body: ['console.log($0);'],
			description: "Good ol' console.log",
		},
	};
}
