import type { ParsedUrlQuery } from 'node:querystring';

export type HomestayDTO = {
    name: string
    city_id: number
    num_bedroom: number
    price: number
    num_bathroom: number
    description: string
}

export type AddHomestayDTO = {
    name?: string
    city_id?: string
    num_bedroom?: string
    price?: string
    num_bathroom?: string
    description?: string
}

export type ParsedAddHomestayDTO = ParsedUrlQuery & AddHomestayDTO;

export type UpdateHomestayDTO = {
    name?: string
    city_id?: string
    num_bedroom?: string
    price?: string
    num_bathroom?: string
    description?: string
}

export type ParsedUpdateHomestayDTO = ParsedUrlQuery & UpdateHomestayDTO;
