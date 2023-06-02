<!-- scaffolding-delete-file unless keepExamples -->
<template>
	<ds-modal
		:opened="!!message"
		v-bind="$attrs"
		:config="{ hidesOnEsc: false }"
		@before-closed="dismissMessage"
	>
		<template #content>
			<ds-modal-content header="Hey" @keydown.esc="dismissMessage">
				<template #default>
					<div class="has-layout-grid">
						<div data-testid="modal-message">
							{{ message }}
						</div>
						<td-snippet
							v-for="{ prefix, body, description, rawForm } in snippets"
							:key="prefix"
							v-bind="{ prefix, body, description }"
							@copy="copy({ rawForm })"
						/>
					</div>
				</template>

				<template #footer>
					<ds-button data-testid="action-copy-all" variant="primary" @click="copyAll">Copy all</ds-button>
					<ds-button @click="dismissMessage">Cancel</ds-button>
				</template>
			</ds-modal-content>
		</template>
	</ds-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import { type Snippet } from 'src/domain/snippet';
import TdSnippet from './td-snippet.vue';

export default defineComponent({
	components: { TdSnippet },
	setup() {
		const store = useStore();

		const copy = ({ rawForm }: Pick<Snippet, 'rawForm'>) => {
			navigator.clipboard.writeText(rawForm);
		};

		const copyAll = () => {
			navigator.clipboard.writeText(store.snippetsJson);
			store.dismissMessage();
		};

		return {
			message: computed(() => store.message),
			snippets: computed(() => store.snippets),
			dismissMessage: () => store.dismissMessage(),
			copy, copyAll,
		};
	},
});
</script>
