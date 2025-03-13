import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite for formatCurrency', () => {
    it('convert cents into dollors', () => {
        expect(formatCurrency(2045)).toEqual('20.45');
    });
    it('working with 0', () => {
        expect(formatCurrency(0)).toBe('0.00');
    });
    it('round up to nearnest int', () => {
        expect(formatCurrency(2000.5)).toBe('20.01');
    });
});