export type CityDAO = {
    id: number
    name: string
}

export type HomestayDAO = {
    id: number
    name: string
    city_id: number
    num_bedroom: number
    price: number
    num_bathroom: number
    description: string
}

export type HomestayWithCity = HomestayDAO & {
    city_name: string
}
