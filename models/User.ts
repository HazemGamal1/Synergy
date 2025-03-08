import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from './Project';

interface Iinvite {

}
export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    skills: string[];
    savedProjects: IProject[],
    participationProjects: IProject[]
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    skills: { type: [String], required: false },
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    participationProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
