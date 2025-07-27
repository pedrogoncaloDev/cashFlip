<template>
    <section class="history">
        <b-card class="mb-2">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <h2 class="h5 mb-2 mb-md-0">History</h2>
                <div class="d-flex gap-2">
                    <b-button size="sm" variant="outline-danger" @click="$emit('clear')">Clear</b-button>
                </div>
            </div>

            <b-input-group size="sm" class="mt-3">
                <b-form-input v-model="filter" placeholder="Filter by currency… (e.g. USD, BRL)"></b-form-input>
            </b-input-group>

            <b-table :items="items" :fields="fields" :filter="filter" :filter-included-fields="['from', 'to']"
                :per-page="perPage" :current-page="currentPage" responsive striped hover small stacked="md"
                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" class="mt-3">
                <template #cell(timestamp)="{ item }">
                    {{ formatDate(item.timestamp) }}
                </template>

                <template #cell(pair)="{ item }">
                    {{ item.from }} → {{ item.to }}
                </template>

                <template #cell(amount)="{ item }">
                    {{ formatMoney(item.amount, item.from) }}
                </template>

                <template #cell(converted)="{ item }">
                    {{ formatMoney(item.converted, item.to) }}
                </template>

                <template #cell(rate)="{ item }">
                    {{ item.rate.toFixed(4) }}
                </template>

                <template #cell(actions)="{ item }">
                    <b-button size="sm" variant="outline-danger" @click="$emit('remove', item.id)">Remove</b-button>
                </template>
            </b-table>

            <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="totalRows" align="center" size="sm"
                class="mt-2" />
        </b-card>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import type { HistoryItem } from '@/types/history';

export interface HistoryItem extends ConvertResult {
    id: string;
    timestamp: number;
}

export default Vue.extend({
    name: 'HistoryList',
    props: {
        items: {
            type: Array as () => HistoryItem[],
            required: true,
        },
        perPage: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            filter: '' as string,
            currentPage: 1,
            sortBy: 'timestamp' as string,
            sortDesc: true as boolean,
            fields: [
                { key: 'timestamp', label: 'Date', sortable: true },
                { key: 'pair', label: 'Pair', sortable: true, class: 'text-nowrap' },
                { key: 'amount', label: 'Amount', sortable: true, tdClass: 'text-right' },
                { key: 'converted', label: 'Converted', sortable: true, tdClass: 'text-right' },
                { key: 'rate', label: 'Rate', sortable: true, tdClass: 'text-right' },
                { key: 'actions', label: '', class: 'text-right' },
            ] as any[],
        };
    },
    computed: {
        totalRows(): number {
            return this.items.length;
        },
    },
    methods: {
        formatMoney(amount: number, code: Currency, locale = 'pt-BR'): string {
            try {
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: code,
                    maximumFractionDigits: 2,
                }).format(amount);
            } catch {
                return `${code} ${amount.toFixed(2)}`;
            }
        },
        formatDate(ts: number): string {
            try {
                const d = new Date(ts);
                return new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(d);
            } catch {
                return String(ts);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.history :deep(.table) {
    margin-bottom: 0;
}
</style>
