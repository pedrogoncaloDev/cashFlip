import { fetchRate, convert, ExchangeError, clearCache } from "@/services/exchangeService";

describe("exchangeService", () => {
    beforeEach(() => {
        clearCache();
        // @ts-ignore
        globalThis.fetch = jest.fn();
    });

    it('fetchRate retorna a taxa correta do mock da API', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "success",
                conversion_rates: { BRL: 1.0 }
            }),
            status: 200,
            statusText: 'OK',
        });

        const rate = await fetchRate('USD', 'BRL');

        expect(rate).toBe(1.0);
        expect(globalThis.fetch).toHaveBeenCalled();
    });

    it('fetchRate usa o cache se a chamada for repetida', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                result: 'success',
                conversion_rates: { EUR: 1.2 }
            }),
            status: 200,
            statusText: 'OK'
        });

        await fetchRate('USD', 'EUR'); // Primeira chamada vai na "API"
        await fetchRate('USD', 'EUR'); // Segunda chamada usa o cache

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it('fetchRate lança erro se status HTTP não for ok', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        });

        await expect(fetchRate('USD', 'BRL')).rejects.toThrow(ExchangeError);
    });

    it('fetchRate lança erro se result não for success', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: 'fail',
                conversion_rates: {}
            }),
            status: 200,
            statusText: 'OK'
        });

        await expect(fetchRate('USD', 'BRL')).rejects.toThrow('API result was not success');
    });

    it('fetchRate lança erro se não houver rate válido', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: 'success',
                conversion_rates: { BRL: 'nada_a_ver' }
            }),
            status: 200,
            statusText: 'OK'
        });

        await expect(fetchRate('USD', 'BRL')).rejects.toThrow('Invalid rate payload');
    });

    it('convert retorna amount, rate e converted corretamente', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                result: 'success',
                conversion_rates: { EUR: 6 }
            }),
            status: 200,
            statusText: 'OK'
        });

        const res = await convert({ amount: 2, from: 'USD', to: 'EUR' });
        expect(res.amount).toBe(2);
        expect(res.from).toBe('USD');
        expect(res.to).toBe('EUR');
        expect(res.rate).toBe(6);
        expect(res.converted).toBe(12);
    });

    it('convert lança erro se amount for negativo', async () => {
        await expect(convert({ amount: -1, from: 'USD', to: 'EUR' })).rejects.toThrow('Amount must be >= 0');
    });
});