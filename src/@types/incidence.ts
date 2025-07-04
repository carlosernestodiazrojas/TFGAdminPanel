export type Incidence = {
    id: string
    name: string
    description: string
    is_votable: boolean
    is_solved?: boolean
    solved_at?: string
    imagesUrls: string[]
}