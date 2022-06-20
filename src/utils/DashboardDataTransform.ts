export const dataTransform = (dataArrObj: any, dataArrDuplicate: any) => {
    const counter: any = {}

    dataArrDuplicate.forEach((element: any) => {
        let k = JSON.stringify(element);
        counter[k] = (counter[k] || 0) + 1
    })

    return counter
}