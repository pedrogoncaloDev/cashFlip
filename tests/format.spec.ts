import { formatMoney, formatDate } from '@/utils/format';

describe('formatMoney', () => {
    it('formata corretamente BRL em pt-BR', () => {
        expect(formatMoney(1234.56, 'BRL')).toMatch(/R\$\s?1.234,56/);
    });

    it('formata corretamente USD em en-US', () => {
        expect(formatMoney(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
    });

    it('usa símbolo genérico quando moeda é inválida', () => {
        expect(formatMoney(10, 'XXX' as any)).toContain('10');
    });

    it('mostra sempre duas casas', () => {
        expect(formatMoney(5, 'USD', 'en-US')).toBe('$5.00');
        expect(formatMoney(5.5, 'USD', 'en-US')).toBe('$5.50');
    });
});

describe('formatDate', () => {
    const ts = new Date('2023-08-15T10:30:00Z').getTime();

    it('formata corretamente em pt-BR', () => {
        const res = formatDate(ts, 'pt-BR');
        expect(res).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('formata corretamente em en-US', () => {
        const res = formatDate(ts, 'en-US');
        expect(res).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/);
    });

    it('faz fallback se der erro', () => {
        expect(formatDate(NaN)).toBe('NaN');
    });
});
