<template>
    <form class="currency-form" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="amount">Amount</label>
            <input v-model.number="amount" type="number" id="amount" placeholder="Enter amount" required />
        </div>

        <div class="form-group">
            <label for="from">From</label>
            <select v-model="from" id="from" required>
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="to">To</label>
            <select v-model="to" id="to" required>
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
        </div>

        <button type="submit" class="convert-button">Convert</button>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'CurrencyForm',
    
    data() {
        return {
            amount: 1,
            from: 'USD',
            to: 'BRL',
            currencies: ['USD', 'EUR', 'BRL', 'JPY', 'GBP'],
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('convert', {
                amount: this.amount,
                from: this.from,
                to: this.to,
            });
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.currency-form {
    width: 100%;
    max-width: 400px;
    padding: $spacing-md;
    @include card-style;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    .form-group {
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: $spacing-xs;
            font-weight: 600;
        }

        input,
        select {
            padding: $spacing-sm;
            border: none;
            border-radius: 4px;
            font-size: $font-size-base;
            color: $text-dark;
        }
    }

    .convert-button {
        @include fancy-button($secondary);
        font-weight: bold;
    }
}
</style>
