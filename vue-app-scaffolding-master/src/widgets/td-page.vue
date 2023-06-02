<template>
	<div class="page">
		<div class="page__notifications">
			<div class="page__notification-group" role="alert">
				<slot name="alert" />
			</div>

			<div class="page__notification-group" role="status">
				<slot name="status" />
			</div>
		</div>

		<header class="page__header">
			<slot name="header" />
		</header>

		<div class="page__side">
			<slot name="side" />
		</div>

		<main class="page__main">
			<slot />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TdPage',
});
</script>

<style lang="scss" scoped>
// Make sure to only @use scss files in scoped style blocks that
// DO NOT have selectors or anything else that will get converted to CSS.
// Otherwise that chunk of CSS will be duplicated into every Vue compoent that @use-d it.
// Only @use scss modules which exclusively export
// constants, mixins, and rarely functions as those are safe.
// We had projects ending up with 2MB of CSS because of this mistake.
@use '@topdesk/components-vue/utilities.scss' as ds;
@use 'src/style/utilities/all.scss' as *;

.page {
	// Flex is better used for dynamically apppearing content, in this case the alert and status slots.
	@include layout-main-grid;
	width: 100%;
	// The dvh is a recent viewport unit. It means Dynamic Viewport Height %, ie. 100% of the current height.
	min-height: 100dvh;
	grid-template-rows: auto auto 1fr;
	position: relative;

	@include ds.media-tablet {
		grid-template-rows: auto 1fr;
	}
}

.page__notifications {
	@include layout-flex;
	gap: ds.$spacer-1x;
	position: absolute;
	width: 100%;
	top: 0;
	background: ds.$color-bg-default;
}

.page__notification-group {
	@include layout-flex;
	gap: ds.$spacer-1x;

	// The absolute position lifts the empty element out from the layouting, so that
	// we don't end up with unwanted extra whitespace.
	&:empty {
		position: absolute;
	}
}

.page__side {
	@include layout-column-span($small: 4, $medium: 4, $large: 4);
	@include layout-grid;
	grid-auto-rows: 1fr;
}

.page__main {
	@include layout-column-span($small: 4, $medium: 4, $large: 8);
	@include layout-gap;
	display: grid;
	grid-template-columns: 1fr;
	padding: 0;
	@include ds.media-laptop {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
