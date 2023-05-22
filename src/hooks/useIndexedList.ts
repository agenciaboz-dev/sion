export const useIndexedList = () => {
    const newArray = (lenght: number) => {
        return Array.from({ length: lenght }, (_, i) => i)
    }

    return { newArray }
}
