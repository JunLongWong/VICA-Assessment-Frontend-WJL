export const dataTransform = (dataArrlist: any[], type: string) => {
    const dataArr: any[] = []

    dataArrlist.map(obj => {
        dataArr.push({ name: obj.type, Quantity: obj.quantity })
    })

    return dataArr
}