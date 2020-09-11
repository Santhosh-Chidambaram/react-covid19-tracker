import numeral from 'numeral'
export const sortData = (data) =>{
    const sortedData = [...data]

    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
}


export const  prettyFormat = (txt) =>{
        const formattedText = txt ? `+${numeral(txt).format('0.0a')}`:'0'
        return formattedText
}