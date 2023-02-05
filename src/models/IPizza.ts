export interface IPizza {
    id: number,
    imageUrl: string,
    title: string,
    types: number[] | string | null,
    sizes: number[] | number | null,
    price: number,
    category: number,
    rating: number,
    count?: number
}