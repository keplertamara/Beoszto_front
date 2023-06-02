<!-- scaffolding-delete-file unless keepExamples -->
<template>
	<div class="td-snippet">
		<div class="td-snippet__title">
			{{ prefix }}
		</div>
		<ds-button compact data-testid="action-copy" @click="$emit('copy')">
			Copy
		</ds-button>
		<details class="td-snippet__details" v-bind="{ open }">
			<summary class="td-snippet__summary">
				<ds-icon class="td-snippet__icon" :icon="dsChevronRight" />
				{{ description }}
			</summary>
			<pre class="td-snippet__code">{{ body }}</pre>
		</details>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { dsChevronRight } from '@topdesk/icons';

export default defineComponent({
	props: {
		body: { type: String, default: '' },
		description: { type: String, default: '' },
		prefix: { type: String, default: '' },
		scopes: { type: Array as PropType<string[]>, default: () => [] },
		open: { type: Boolean, default: false },
	},
	emits: ['copy'],
	setup: () => ({ dsChevronRight }),
});
</script>

<style scoped lang="scss">
@use '@topdesk/components-vue/utilities.scss' as ds;

.td-snippet {
	display: inline-grid;
	grid-template-columns: 1fr auto;
	gap: ds.$spacer-3x;
	background: ds.$color-bg-subtle;
	padding: ds.$spacer-3x;
	border-radius: ds.$spacer-radius;
}

.td-snippet__title {
	@include ds.text-title-3;
	align-self: center;
	min-width: 16ch;
}

.td-snippet__details {
	grid-column: 1 / -1;
	/* Hide summary rectangle */
	list-style: none;
	&::-webkit-details-marker { display: none; }
}

.td-snippet__summary {
	display: flex;
	position: relative;
	flex-wrap: nowrap;
	align-items: center;
	gap: ds.$spacer-2x;
	margin: calc(-1 * ds.$spacer-3x);
	margin-top: calc(-1 * ds.$spacer-1x);
	padding: ds.$spacer-2x ds.$spacer-3x;
	border-bottom-left-radius: ds.$spacer-radius;
	border-bottom-right-radius: ds.$spacer-radius;
	cursor: default;
	min-width: 30ch;

	// Include in an element to apply the interactive states
	@include ds.interactive-focus;
	@include ds.interactive-hover;
}

.td-snippet__details[open] > .td-snippet__summary {
	margin-bottom: ds.$spacer-1x;
	border-radius: 0;
}

.td-snippet__icon {
	transition: rotate 150ms ease-in-out;
	// Control the center of rotation
	transform-origin: 40% 50%;
	// Using a CSS variable allows declaring related props in one place
	rotate: var(--_td-snippet-icon-rotation);
}

.td-snippet__details[open] .td-snippet__icon {
	--_td-snippet-icon-rotation: 90deg;
}

.td-snippet__code {
	background: ds.$color-bg-default;
	margin: calc(-1 * ds.$spacer-1x);
	padding: ds.$spacer-1x;
	border-radius: ds.$spacer-radius;
	overflow: auto;
}
</style>
