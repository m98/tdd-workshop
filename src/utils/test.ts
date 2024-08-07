const LARGE_NUMBER_THRESHOLD = 1000
export const add = (numbers: string) => {
    const DELIMITER = numbers.indexOf('//') === 0 ? numbers[2] : ','
    const SPLIT_NEWLINE = '\n'
    if (numbers === '') {
        return 0
    }

    // index after the delimiter
    const numbersWithoutDelimiter =
        numbers.indexOf('//') === 0 ? numbers.slice(4) : numbers

    if (numbersWithoutDelimiter.includes(`${DELIMITER}\n`)) {
        throw new Error('Invalid input')
    }
    // Remove all the duplicate new lines, and keep only one if they are followed by each other
    const normalizedString = numbersWithoutDelimiter
        .replace(/\n+/g, SPLIT_NEWLINE)
        .trim()

    const commaSeparatedNums = normalizedString.split(DELIMITER)
    const newLineSeparatedNums = commaSeparatedNums
        .map(num => num.split(SPLIT_NEWLINE))
        .flat()

    const nums = newLineSeparatedNums.map(num => parseInt(num))
    checkForNegativeNumbers(nums)

    return filterLargeNumbers(nums).reduce((sum, num) => sum + num, 0)
}

export const checkForNegativeNumbers = (numbers: number[]) => {
    const negativeNumbers = numbers.filter(num => num < 0)
    if (negativeNumbers.length > 0) {
        throw new Error(`Negatives not allowed: ${negativeNumbers.join(',')}`)
    }
}

// anything larger than 1000 should be ignored
export const filterLargeNumbers = (numbers: number[]) => {
    return numbers.filter(num => num <= LARGE_NUMBER_THRESHOLD)
}
