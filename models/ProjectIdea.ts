import mongoose, { Schema, Document } from "mongoose"
import User, { IUser } from "./User"

export interface IProjectIdea {
    ownerId: string,
    title: string,
    description: string,
    comments: IComment[],
    likes: number,
    createdDate: Date
}

export interface IComment {
    text: String,
    User: IUser
}

const ProjectIdeaSchema: Schema = new Schema({
    ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    title: { type: String, required: true},
    description: { type: String, required: true},
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
    likes: { type: Number, required: false },
    createdDate: { type: Date, required: true },
})

export default mongoose.models.ProjectIdea || mongoose.model<IProjectIdea>('ProjectIdea', ProjectIdeaSchema);