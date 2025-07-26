<template>
    <section class="home-page">
        <h1 class="title">Currency Converter</h1>

        <CurrencyForm @convert="onConvert" />

        <div v-if="result" class="result">
            {{ result.amount }} {{ result.from }} = <strong>{{ result.converted }}</strong> {{ result.to }}
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import CurrencyForm from '@/components/CurrencyForm.vue';

interface ResultType {
    amount: number;
    from: string;
    to: string;
    converted: number | string;
}

export default Vue.extend({
    name: 'Home',
    components: {
        CurrencyForm,
    },
    data() {
        return {
            result: null as ResultType | null,
        };
    },
    methods: {
        async onConvert({ amount, from, to }) {
            // Simulação de chamada real de API (depois vamos mover isso pra service)
            const rate = await this.getMockRate(from, to);
            this.result = {
                amount,
                from,
                to,
                converted: (amount * rate).toFixed(2),
            };
        },
        async getMockRate(from: string, to: string): Promise<number> {
            // Fake API rate só pra teste
            const mockRates = {
                USD: { BRL: 5.0, EUR: 0.9 },
                BRL: { USD: 0.2, EUR: 0.18 },
                EUR: { USD: 1.1, BRL: 5.5 },
            };
            return mockRates[from]?.[to] ?? 1;
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.home-page {
    text-align: center;
    color: $text;

    .title {
        font-size: $font-size-lg;
        margin-bottom: $spacing-lg;
    }

    .result {
        margin-top: $spacing-lg;
        font-size: $font-size-lg;
    }
}
</style>
