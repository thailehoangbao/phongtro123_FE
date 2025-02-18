import { getNumbersArea, getNumbersPrice } from "./getNumbers"

export const getCodePrice = (totals) => {
    return totals.map(item => {
        let arrMinMax = getNumbersPrice(item.value)
        let min
        let max
        if(arrMinMax[0] === 1 && arrMinMax.length === 1) {
            min = 0
            max = 1
        } else if (arrMinMax[0] === 15 && arrMinMax.length === 1) {
            min = 15
            max = 99999
        } else {
            min = arrMinMax[0]
            max = arrMinMax[1]
        }
        return ({
            ...item,
            min,
            max
        })
    })
}

export const getCodeArea = (totals) => {
    return totals.map(item => {
        let arrMinMax = getNumbersArea(item.value)
        let min
        let max
        if(arrMinMax[0] === 20 && arrMinMax.length === 1) {
            min = 0
            max = 20
        } else if (arrMinMax[0] === 90 && arrMinMax.length === 1) {
            min = 90
            max = 99999
        } else {
            min = arrMinMax[0]
            max = arrMinMax[1]
        }
        return ({
            ...item,
            min,
            max
        })
    })
}
export const getCodesPrices = (arrMinMax,prices) => {
    const pricesWithMinMax = getCodePrice(prices)
    return pricesWithMinMax.filter(item => ((item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])))
}

export const getCodesAreas = (arrMinMax,areas) => {
    const pricesWithMinMax = getCodeArea(areas)
    return pricesWithMinMax.filter(item => ((item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])))
}

export const getCodePriceExactly = (price,arrPrices) => {
    return arrPrices.find(item => (+price <= item.max) && (+price >= item.min))?.code
}

export const getCodeAreaExactly = (area,arrAreas) => {
    return arrAreas.find(item => (+area <= item.max) && (+area >= item.min))?.code
}