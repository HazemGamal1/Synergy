import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from './Project';

interface Iinvite {

}
export interface IUser extends Document {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    skills: string[];
    savedProjects: IProject[],
    participationProjects: IProject[],
    github: string,
    linkedin: string,
    twitter: string,
    youtube: string,
    website: string
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: false },
    password: { type: String, required: true },
    skills: { type: [String], required: false },
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    participationProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    github: { type: String, requried: false },
    linkedin: { type: String, required: false },
    twitter: { type: String, required: false },
    youtube: { type: String, required: false },
    website: { type: String, required: false }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
