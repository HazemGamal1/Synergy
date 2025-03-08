import mongoose , { Schema, Document, mongo } from "mongoose";

export interface IMember {
    userId: string,
    username: string,
    initials: string,
    id: string
}
export interface ITeam {
    title: string,
    description: string,
    members: IMember[],
    _id: string
}
const TeamSchema : Schema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    members: 
    [
        {
            userId: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}, 
            username: {type: String, required: true}, 
            initials: {type: String, required: false}
        }
    ]
})

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);