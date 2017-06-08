describe("compareNumbers(a, b)", function() { //suite
    
    it("should return 0 if the two numbers are the same", function() { //spec
        expect(compareNumbers(0, 0)).toBe(0); //expectation
        expect(compareNumbers(1, 1)).toBe(0);
        expect(compareNumbers(-1, -1)).toBe(0);
        expect(compareNumbers(0.1, .1)).toBe(0);
        expect(compareNumbers(10000001, 10000001)).toBe(0);
        expect(compareNumbers(23.5, 23.5)).toBe(0);
    });

    it("and should return positive number if first number is bigger", function() {
        expect(compareNumbers(1, 0)).toBeGreaterThan(0);
        expect(compareNumbers(1.0, .5)).toBeGreaterThan(0);
        expect(compareNumbers(-1, -4)).toBeGreaterThan(0);
        expect(compareNumbers(0.1, 0.0)).toBeGreaterThan(0);
        expect(compareNumbers(10000001, 10000000)).toBeGreaterThan(0);
        expect(compareNumbers(23.51, 23.5)).toBeGreaterThan(0);
    });

    it("and should return negative number if first number is smaller", function() {
        expect(compareNumbers(0, 1)).toBeLessThan(0);
        expect(compareNumbers(.5, 1.0)).toBeLessThan(0);
        expect(compareNumbers(-4, -1)).toBeLessThan(0);
        expect(compareNumbers(0.0, 0.1)).toBeLessThan(0);
        expect(compareNumbers(10000000, 10000001)).toBeLessThan(0);
        expect(compareNumbers(23.5, 23.51)).toBeLessThan(0);
    });
});

describe("compareString(a, b)", function() {
    
    it("should return 0 if the two strings are the same", function() {
        expect(compareStrings("0", "0")).toBe(0);
        expect(compareStrings("rolex", "Rolex")).toBe(0);
        expect(compareStrings("Ape", "ape")).toBe(0);
        expect(compareStrings("test","test")).toBe(0);
    });

    it("and should return positive number if first string should come after", function() {
        expect(compareStrings("rolex", "boy")).toBeGreaterThan(0);
        expect(compareStrings("lion", "dog")).toBeGreaterThan(0);
        expect(compareStrings("cats", "Cat")).toBeGreaterThan(0);
        expect(compareStrings("Doves", "dove")).toBeGreaterThan(0);
        expect(compareStrings("lion", "Ape")).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(compareStrings("alex", "boy")).toBeLessThan(0);
        expect(compareStrings("best", "dog")).toBeLessThan(0);
        expect(compareStrings("cat", "cats")).toBeLessThan(0);
        expect(compareStrings("dove", "doves")).toBeLessThan(0);
        expect(compareStrings("lion", "Zebra")).toBeLessThan(0);
    });
});

describe("compareDates(a, b)", function() {
    
    it("should return 0 if the two dates are the same", function() {
        expect(compareDates("12-11-1988", "12-11-1988")).toBe(0);
        expect(compareDates("1-8-2015","1-8-2015")).toBe(0);
        expect(compareDates("05/21/1987", "5/21/1987")).toBe(0);
    });

    it("and should return positive number if first string should come after", function() {
        expect(compareDates("6/25/2012", "5/15/2011")).toBeGreaterThan(0);
        expect(compareDates("3/27/90", "3/26/90")).toBeGreaterThan(0);
        expect(compareDates("7/23/56", "5/5/56")).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(compareDates("5/25/2013", "5/26/2013")).toBeLessThan(0);
        expect(compareDates("1/25/2011", "5/25/2011")).toBeLessThan(0);
        expect(compareDates("5/25/2013", "5/26/2013")).toBeLessThan(0);
    });
});