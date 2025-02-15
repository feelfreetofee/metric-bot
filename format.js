String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1).toLowerCase()
}

export function FormatStats(key, stats) {
    const capital = key.capitalize(), count = stats.resource[`${key}s`]
    return {
        name: `${capital} Statistics`,
        value: `#${stats.resource[`${key}Rank`]} ${count.toLocaleString()} (${(count * 100 / stats[`total${capital}s`]).toFixed(2)}%)`
    }
}