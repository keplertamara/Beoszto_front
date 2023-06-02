/* scaffolding-delete-file unless keepExamples */
export const Scopes = Object.freeze({
	JAVA_SCRIPT: 'javascript',
	TYPE_SCRIPT: 'typescript',
	SCSS: 'scss',
});
// Take an enum-like oject and only allow its values
export type Scope = typeof Scopes[keyof typeof Scopes];

// Domain object factories make it explicit what properties
// and expectations exist for the most important data types
// the application uses. They are especially useful when
// connecting to a REST API.
// Note that domain objects also may parse or tweak the naming of parameters
// they receive. In this example the prop "joke" is renamed as "content".
export function Snippet(
	{ scopes = [], prefix, body, description = '', rawForm }:
	{ scopes: Scope[]; prefix: string; body: string; description?: string; rawForm: string },
) {
	return { scopes, prefix, body, description, rawForm };
}
export type Snippet = ReturnType<typeof Snippet>;

// Instead of coupling methods on the objects directly favor
// simply exporting pure functions. They return updated objects
// or derive additional information from the passed in data.
export function withNamespace<T extends Snippet>(namespace: string, { prefix = 'sc-unknown', ...rest }: T) {
	const [/* old namespace */, ...parts] = prefix.split('-');
	const newPrefix = [namespace, ...parts].join('-');
	return { ...rest, prefix: newPrefix } as T;
}
