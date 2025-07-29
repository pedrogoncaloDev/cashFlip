import { ConvertPayload, ConvertResult, Currency, ExchangeApiResponse } from '@/types/currency';

type CacheEntry = { value: number; expires: number };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 10 * 60 * 1000;
const BASE_URL = process.env.VUE_APP_EXCHANGE_API_URL?.trim();

// PRIVATE
function __key(from: Currency, to: Currency): string {
    return `${from}->${to}`;
}

// PUBLIC
export class ExchangeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExchangeError';
    }
}

export async function fetchRate(from: Currency, to: Currency): Promise<number> {
    const localKey = __key(from, to);
    const now = Date.now();
    const hit = cache.get(localKey);

    if (hit && hit.expires > now) return hit.value;

    const url = `${BASE_URL}/${encodeURIComponent(from)}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new ExchangeError(`HTTP ${res.status} (${res.statusText}) while fetching ${from}->${to}`);
    }

    const data: ExchangeApiResponse = await res.json();

    if (data.result !== "success") {
        throw new ExchangeError(`API result was not success: ${data.result}`);
    }

    const rate = data?.conversion_rates?.[to];
    if (typeof rate !== 'number' || !isFinite(rate)) {
        throw new ExchangeError(`Invalid rate payload for ${from}->${to}`);
    }

    cache.set(localKey, { value: rate, expires: now + TTL_MS });
    return rate;
}

export async function convert({ amount, from, to }: ConvertPayload): Promise<ConvertResult> {
    if (amount < 0) throw new ExchangeError('Amount must be >= 0');
    const rate = await fetchRate(from, to);

    return { amount, from, to, rate, converted: amount * rate };
}

export function clearCache() {
    cache.clear();
}