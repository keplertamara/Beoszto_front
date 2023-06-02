<template>
	<div class="sb-placeholder" v-bind="{ variant }">
		{{ name }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SbPlaceholder',
	props: {
		name: { type: String, default: '' },
		variant: { type: String, default: null },
	},
});
</script>

<style lang="scss" scoped>
@use '@topdesk/components-vue/utilities.scss' as ds;

.sb-placeholder {
	@include ds.text-title-4;
	padding: ds.$spacer-4x;
	min-width: 100%;
	color: ds.$color-fg-default;
	background: ds.$color-bg-mild;
}

[variant="danger"] {
	background: ds.$color-bg-danger-mild;
	color: ds.$color-fg-danger-emphasis;
}
[variant="primary"] {
	background: ds.$color-bg-primary-mild;
	color: ds.$color-fg-primary-emphasis;
}
</style>
