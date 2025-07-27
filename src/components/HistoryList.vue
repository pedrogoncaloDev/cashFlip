<template>
    <section class="history">
        <b-card class="mb-2">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <h2 class="h5 mb-2 mb-md-0">Histórico de Conversões</h2>
                <div class="d-flex gap-2">
                    <b-button size="sm" variant="outline-danger" @click="$emit('clear')">Limpar Histórico</b-button>
                </div>
            </div>

            <b-input-group size="sm" class="mt-3">
                <b-form-input v-model="filter" placeholder="Filtrar"></b-form-input>
            </b-input-group>

            <b-table :items="items" :fields="fields" :filter="filter"
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
                    <b-button size="sm" variant="outline-danger" @click="$emit('remove', item.id)">Remover</b-button>
                </template>
            </b-table>

            <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="totalRows" align="center" size="sm"
                class="mt-2" />
        </b-card>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import type { HistoryItem, TableField } from '@/types/history';
import { formatMoney, formatDate } from '@/utils/format';

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
                { key: 'timestamp', label: 'Data/Hora', sortable: true },
                { key: 'pair', label: 'Par de Moedas', sortable: true, class: 'text-nowrap' },
                { key: 'amount', label: 'Valor Original', sortable: true, tdClass: 'text-right' },
                { key: 'converted', label: 'Valor Convertido', sortable: true, tdClass: 'text-right' },
                { key: 'rate', label: 'Cotação', sortable: true, tdClass: 'text-right' },
                { key: 'actions', label: '', class: 'text-right' },
            ] as TableField[],
        };
    },
    computed: {
        totalRows(): number {
            return this.items.length;
        },
    },
    methods: {
        formatMoney,
        formatDate,
    },
});
</script>

<style lang="scss" scoped>
.history :deep(.table) {
    margin-bottom: 0;
}

.history :deep(.sr-only) {
    display: none !important;
}
</style>
