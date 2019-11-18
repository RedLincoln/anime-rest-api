import {
    createSchema,
    Type,
    typedModel,
    ExtractDoc,
    ExtractProps
} from 'ts-mongoose';


export const AnimeSchema = createSchema({
    name: Type.string({ required: true }),
    thumbnail: Type.string(),
    synopsis: Type.string(),
    score: Type.number(),
    realeseDate: Type.string(),
    numberOfEpisodes: Type.number(),
    durationPerEpisode: Type.string(),
    rating: Type.string(),
    status: Type.string(),
    genre: Type.array({ default: undefined }).of(Type.string()),
    addedDate: Type.date(),
    type: Type.string(),
    studios: Type.array({ default: undefined }).of(Type.string())
})


export const Anime = typedModel('animes', AnimeSchema)
export type AnimeDoc = ExtractDoc<typeof AnimeSchema>
export type AnimeProps = ExtractProps<typeof AnimeSchema>