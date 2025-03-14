import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IProject extends Document {
    title: string;
    ownerId: string;
    ownerUsername: string;
    ownerName: string;
    shortDescription: string;
    detailedDescription: string,
    requiredSkills: String[],
    estimatedCompletion: Date,
    isPublic: boolean,
    createdDate: Date,
    likes: string[],
    comments: IComment[],
    relatedProjects: IProject[],
    participants: IUser[]
}
export interface IComment {
    text: String,
    User: IUser
}
const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    ownerId: { type: String, required: true},
    ownerUsername: {type: String, required: true },
    ownerName: {type: String, required: true},
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: false},
    requiredSkills: { type: [String], required: true},
    githubRepo: { type: String, required: false},
    whatsAppLink: { type: String, required: false},
    discordLink: { type: String, required: false},
    driveLink: { type: String, required: false },
    estimatedCompletion: {type: Date, required: false},
    isPublic: { type: Boolean, required: false },
    createdDate: { type: Date, required: true },
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [ { text: { type: String, required: true }, username: {type: String, required: true }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}}],
    relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    participants: 
    [
        {
            userId: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}, 
            username: {type: String, required: true}, 
            initials: {type: String, required: false},
            position: { type: String, required: true }
        }
    ]
}, {});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
