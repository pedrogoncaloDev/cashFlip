<template>
    <b-form class="currency-form" @submit.prevent="handleSubmit">
        <h1 class="title">Conversor de moeda</h1>
        
        <b-form-group label="Valor" label-for="amount">
            <b-form-input id="amount" v-model.number="amount" type="number" placeholder="Digite o valor" required
                min="0" />
        </b-form-group>

        <b-form-group label="De" label-for="from">
            <b-form-select id="from" v-model="from" :options="currencies" required />
        </b-form-group>

        <b-form-group label="Para" label-for="to">
            <b-form-select id="to" v-model="to" :options="currencies" required />
        </b-form-group>

        <b-button type="submit" variant="primary" class="convert-button">
            Converter
        </b-button>
    </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { CURRENCIES, type Currency, type ConvertPayload } from '@/types/currency';

export default Vue.extend({
    name: 'CurrencyForm',
    data() {
        return {
            amount: 1,
            from: 'USD' as Currency,
            to: 'BRL' as Currency,
            currencies: CURRENCIES as readonly Currency[],
        };
    },
    methods: {
        handleSubmit() {
            const payload: ConvertPayload = {
                amount: this.amount,
                from: this.from,
                to: this.to,
            };
            this.$emit('convert', payload);
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.currency-form {
    width: 100%;
    padding: $spacing-md;
    @include card-style;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    .convert-button {
        @include fancy-button($secondary, #fff);
        font-weight: bold;
    }
}
</style>
