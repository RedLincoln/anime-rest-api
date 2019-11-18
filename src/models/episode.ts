import {
    createSchema,
    Type,
    typedModel,
    ExtractDoc,
    ExtractProps,
} from 'ts-mongoose';
import { AnimeSchema } from './anime'

const EpisodeSchema = createSchema({
    number: Type.number({ required: true, unique: true }),
    strNumber: Type.string({ required: true }),
    videoSrc: Type.string({ required: true }),
    subtitleSrc: Type.array({ required: true, default: undefined }).of(Type.string({ required: true })),
    openingStart: Type.number(),
    openingEnd: Type.number(),
    endingStart: Type.number(),
    endingEnd: Type.number(),
    anime: Type.ref(Type.objectId()).to('animes', AnimeSchema)
})

export const Episode = typedModel('episodes', EpisodeSchema)
export type EpisodeDoc = ExtractDoc<typeof EpisodeSchema>
export type EpisodeProp = ExtractProps<typeof EpisodeSchema>
