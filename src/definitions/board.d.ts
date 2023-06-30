declare interface Board {
    id: number
    name: string
    access: number
    columns: string
    inputColumn: number
    nextBoardId?: number
}

declare interface Column {
    id: number
    name: string
    status: number
}
