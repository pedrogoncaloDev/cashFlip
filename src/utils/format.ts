import type { Currency } from '@/types/currency';

export function formatMoney(amount: number, code: Currency, locale = 'pt-BR'): string {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: code,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return `${code} ${amount.toFixed(2)}`;
    }
}

export function formatDate(ts: number, locale = 'pt-BR'): string {
    try {
        const d = new Date(ts);
        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(d);
    } catch {
        return String(ts);
    }
}
