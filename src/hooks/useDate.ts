export const useDate = () => {
    const getDateString = (date: string | number | undefined, birth?: boolean) => {
        if (!date) return

        let dateObj = new Date(date)

        if (birth) dateObj.setDate(dateObj.getDate() + 1)

        return dateObj.toLocaleDateString("pt-br")
    }

    return { getDateString }
}
