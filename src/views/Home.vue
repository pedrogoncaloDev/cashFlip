<template>
    <section class="home-page container">
        <b-row class="justify-content-center flex-md-nowrap">
            <b-col cols="12" md="4" class="mb-4 mb-md-0">
                <CurrencyForm @convert="onConvert" />

                <p v-if="loading" class="loading" aria-live="polite">Converting…</p>
                <p v-if="error" class="error" role="alert">{{ error }}</p>

                <transition name="fade-up">
                    <div v-if="result" class="result" key="result">
                        <div class="line">
                            {{ formatMoney(result.amount, result.from) }}
                            =
                            <strong>{{ formatMoney(result.converted, result.to) }}</strong>
                        </div>
                        <small class="rate">Cotação: {{ result.rate.toFixed(4) }}</small>
                    </div>
                </transition>
            </b-col>

            <b-col cols="12" md="8">
                <HistoryList class="mt-2 mt-md-0" :items="history" :perPage="5" @remove="removeHistory"
                    @clear="clearHistory" />
            </b-col>
        </b-row>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import CurrencyForm from '@/components/CurrencyForm.vue';
import HistoryList from '@/components/HistoryList.vue';
import type { HistoryItem } from '@/types/history';
import { convert } from '@/services/exchangeService';
import type { ConvertPayload, ConvertResult, Currency } from '@/types/currency';
import { formatMoney } from '@/utils/format';

export default Vue.extend({
    name: 'Home',
    components: { CurrencyForm, HistoryList },
    data() {
        return {
            result: null as ConvertResult | null,
            history: [] as HistoryItem[],
            loading: false,
            error: null as string | null,
        };
    },
    created() {
        const raw = localStorage.getItem('fx_history');
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed) && parsed.every(item => item && typeof item.id === 'string')) {
                this.history = parsed;
            } else {
                console.warn('Invalid fx_history found in localStorage, clearing it.');
                localStorage.removeItem('fx_history');
            }
        } catch (err) {
            console.warn('Error parsing fx_history from localStorage:', err);
            localStorage.removeItem('fx_history');
        }
    },
    watch: {
        history: {
            deep: true,
            handler(v: HistoryItem[]) {
                localStorage.setItem('fx_history', JSON.stringify(v));
            },
        },
    },
    methods: {
        async onConvert(payload: ConvertPayload): Promise<void> {
            this.error = null; this.loading = true; this.result = null;
            try {
                const r = await convert(payload);
                this.result = r;

                const item: HistoryItem = {
                    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
                    timestamp: Date.now(),
                    ...r,
                };
                this.history.unshift(item);
            } catch (e) {
                this.error = e instanceof Error ? e.message : 'Unexpected error';
            } finally {
                this.loading = false;
            }
        },
        removeHistory(id: string) {
            this.history = this.history.filter(h => h.id !== id);
        },
        clearHistory() {
            this.history = [];
        },
        formatMoney,
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.home-page {
    text-align: center;
    color: $text;
    padding: $spacing-lg 0;

    .title {
        font-size: $font-size-lg;
        margin-bottom: $spacing-lg;
        font-weight: 700;
    }

    .loading {
        margin-top: $spacing-md;
        opacity: $opacity-light;
    }

    .error {
        margin-top: $spacing-md;
        color: #ffb4b4;
        font-weight: 600;
    }

    .result {
        margin: $spacing-lg auto 0;
        max-width: 520px;
        @include card-style;

        .line {
            font-size: $font-size-lg;
            margin-bottom: $spacing-sm;
        }

        .rate {
            opacity: 0.8;
        }
    }
}
</style>
