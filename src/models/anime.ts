import {
    createSchema,
    Type,
    typedModel,
    ExtractDoc,
    ExtractProps,
} from 'ts-mongoose';


const animeSchema = createSchema({
    name: Type.string({ required: true }),
    thumbnail: Type.string(),
    synopsis: Type.string(),
    score: Type.number(),
    realeseDate: Type.string(),
    numberOfEpisodes: Type.number(),
    durationPerEpisode: Type.string(),
    rating: Type.string(),
    status: Type.string(),
    genre: Type.array().of(Type.string()),
    addedDate: Type.date(),
    type: Type.string(),
    studios: Type.array().of(Type.string())
})


export const Anime = typedModel('animes', animeSchema)
export type AnimeDoc = ExtractDoc<typeof animeSchema>
export type AnimeProps = ExtractProps<typeof animeSchema>