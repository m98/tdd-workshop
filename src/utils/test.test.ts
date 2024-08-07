import {add, checkForNegativeNumbers, filterLargeNumbers} from "./test";

describe('add', () => {
    it('should return 0 for empty string', () => {
        expect(add('')).toBe(0);
    })

    it('should return 1 for 1', () => {
        expect(add('1')).toBe(1);
    })

    it('should return 3 for 1,2', () => {
        expect(add('1,2')).toBe(3);
    })

    it('should return 40 for 10,10,20', ()=>{
        expect(add('10,10,20')).toBe(40);
    })

    it('should return 5 for 1,2,3,4,5', ()=>{
        expect(add('1,2,3,4,5')).toBe(15);
    })

    // when numbers are seperated with newline and commas
    it('should return 6 for 1\n2,3', ()=>{
        expect(add('1\n2,3')).toBe(6);
    })
    it('should return 6 for 1\n2\n3', ()=>{
        expect(add('1\n2\n3')).toBe(6);
    })
    it('should return 6 for 1,2\n3', ()=>{
        expect(add('1,2\n3')).toBe(6);
    })
    it('should return 18 for 1,2\n3,4,5\n1\n2', ()=>{
        expect(add('1,2\n3,4,5\n1\n2')).toBe(18);
    })

    // handle multiple newlines
    it('should return 10 for \n\n\n1,2,3\n\n4\n', ()=>{
        expect(add('\n\n\n1,2,3\n\n4\n')).toBe(10);
    })

    it('should handle multiple new lines \n\n1\n\n2\n/', ()=>{
        expect(add('\n\n1\n\n2\n\ ')).toBe(3);
    })
    
    // newline with comma in the same order is not allowed
    it('should throw error for 1,\n2', ()=>{
        expect(()=>add('1,\n2')).toThrowError('Invalid input');
    })

    // When the delimiter is passed as part of the input. The delimiter is passed in the format: //{delimiter}\n{numbers}
    it.skip('should return 3 for //;\n1;2', ()=>{
        expect(add('//;\n1;2')).toBe(3);
    })
    it.skip('should return 3 for another delimiter //:\n3:2', ()=>{
        expect(add('//:\n3:2')).toBe(5);
    })

    it.skip('should return 3 for newline as delimiter //\n\n2\n2', ()=>{
        expect(add('//\n\n2\n2')).toBe(4);
    })

    it.skip('should throw error for //:\n1:\n2', ()=>{
        expect(()=>add('//:\n1:\n2')).toThrowError('Invalid input');
    })

    // When the delimiter is passed as part of the input. The delimiter is passed in the format: //[delimiter]\n{numbers}. Example: //[;;]\n1;;2
    it('should return 3 for //[;;]\n1;;2', ()=>{
        expect(add('//[;;]\n1;;2')).toBe(3);
    })
    it('should return 3 for //[::]\n1::2', ()=>{
        expect(add('//[::]\n1::2')).toBe(3);
    })
    it('should return 3 for //[*]\n1*2', ()=>{
        expect(add('//[*]\n1*2')).toBe(3);
    })
    it('should throw error when delimiter is followed by newline in input', ()=>{
        expect(()=>add('//[*]\n1*\n2')).toThrowError('Invalid input');
    })

    it('should throw error for when delimiter is a number', ()=>{
        expect(()=>add('//[1]1\n12')).toThrowError('Invalid delimiter');
    })

    it('should throw error for when delimiter is a special character', ()=>{
        expect(()=>add('//[!@#]1\n12')).toThrowError('Invalid delimiter');
    })

    // Should throw error for negative numbers
    it('should throw error for -1', ()=>{
        expect(()=>add('-1')).toThrowError('Negatives not allowed: -1');
    })
    it('should throw error for -1,2,-3', ()=>{
        expect(()=>add('-1,2,-3')).toThrowError('Negatives not allowed: -1,-3');
    })
    it('should throw error for //;\n-1;2;-3', ()=>{
        expect(()=>add('//;\n-1;2;-3')).toThrowError('Negatives not allowed: -1,-3');
    })
    it.skip('should throw error for //;\n-1;2;-3\n\n1;5;-6', ()=>{
        expect(()=>add(';\n-1;2;-3\n\n1;5;-6')).toThrowError('Negatives not allowed: -1,-3, -6');
    })

    // any number larger than 1000 should be ignored:
    it('should return 2 for 1001,2', ()=>{
        expect(add('1001,2')).toBe(2);
    })
    it('should return 1002 for 1000,2', ()=>{
        expect(add('1000,2')).toBe(1002);
    })
});


describe('checkForNegativeNumbers', () => {
    it('should throw error for -1', () => {
        expect(()=>checkForNegativeNumbers([-1])).toThrowError('Negatives not allowed: -1');
    })

    it('should throw error for -1,2,-3', () => {
        expect(()=>checkForNegativeNumbers([-1, 2, -3])).toThrowError('Negatives not allowed: -1,-3');
    })

    it('should not throw error for 1', () => {
        expect(()=>checkForNegativeNumbers([1])).not.toThrowError();
    })

    it('should not throw error for 1,2', () => {
        expect(()=>checkForNegativeNumbers([1,2])).not.toThrowError();
    })
    
    
});

describe('filterLargeNumbers', () => {
    it('should return 2 for 1001,2', () => {
        expect(filterLargeNumbers([1001, 2])).toEqual([2]);
    })
    
    it('should return 1002 for 1000,2', () => {
        expect(filterLargeNumbers([1000, 2])).toEqual([1000, 2]);
    })
});