<template>
    <section class="home-page">
        <h1 class="title">Currency Converter</h1>

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
                <small class="rate">rate: {{ result.rate.toFixed(4) }}</small>
            </div>
        </transition>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import CurrencyForm from '@/components/CurrencyForm.vue';
import { convert } from '@/services/exchangeService';
import type { ConvertPayload, ConvertResult, Currency } from '@/types/currency';

export default Vue.extend({
    name: 'Home',
    components: { CurrencyForm },
    data() {
        return {
            result: null as ConvertResult | null,
            loading: false as boolean,
            error: null as string | null,
        };
    },
    methods: {
        async onConvert(payload: ConvertPayload): Promise<void> {
            this.error = null;
            this.loading = true;
            this.result = null;

            try {
                const r = await convert(payload);
                this.result = r;
            } catch (e) {
                this.error = e instanceof Error ? e.message : 'Unexpected error';
            } finally {
                this.loading = false;
            }
        },

        // Formata valores conforme a moeda (locale pt-BR por padrão).
        formatMoney(amount: number, code: Currency, locale = 'pt-BR'): string {
            try {
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: code,
                    maximumFractionDigits: 2,
                }).format(amount);
            } catch {
                // Fallback se a moeda não for suportada pelo Intl do ambiente
                return `${code} ${amount.toFixed(2)}`;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.home-page {
    background: $background;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-lg $spacing-md;
    color: $text;
    text-align: center;

    .title {
        font-size: $font-size-lg;
        margin-bottom: $spacing-lg;
        font-weight: 700;
    }

    .currency-form-card {
        background: #fff;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1.5px 6px rgba(0,0,0,0.04);
        border-radius: 18px;
        padding: 2.5rem 2rem;
        max-width: 420px;
        width: 100%;
        margin: 0 auto $spacing-lg auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
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

.currency-form-card button,
.currency-form-card input[type="submit"] {
    background: $primary;
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(0, 82, 204, 0.15);
    cursor: pointer;
    transition: background 0.2s;
}
.currency-form-card button:hover,
.currency-form-card input[type="submit"]:hover {
    background: darken($primary, 8%);
}

/* Transição simples de entrada (mobile-first) */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 280ms ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
