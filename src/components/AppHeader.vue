<template>
    <b-navbar type="light" variant="light" class="app-header">
        <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
            <img
                :src="require('@/assets/logo.png')"
                alt="Logo"
                class="logo-img d-inline-block align-middle mr-2"
                height="40"
            />
                <span class="app-name">
                <span class="cash">Cash</span><span class="flip">Flip</span>
            </span>
        </router-link>
    </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'AppHeader',
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.app-header {
    box-shadow: 0 4px 18px 0 rgba(30, 60, 100, 0.22), 0 1.5px 4px 0 rgba(60, 90, 140, 0.09);

    .logo-img {
        margin-left: $spacing-lg;
        max-height: $font-size-logo;
        width: auto;
    }

    .app-name {
        font-size: 1.7rem;
        font-weight: 700;
        letter-spacing: 1px;
        vertical-align: middle;

        .cash {
            color: $secondary;
        }

        .flip {
            color: $primary;
        }
    }
}
</style>
