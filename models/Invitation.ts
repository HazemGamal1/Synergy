import mongoose, { Schema } from "mongoose";

export interface IInvitation {
    _id: string,
    inviter: string,
    inviterUsername: string,
    invitee: string,
    project: string,
    projectName: string,
    position: string,
    status: string,
    createdDate : string,
    updatedAt: string
}

const InvitationSchema : Schema = new Schema({
    inviter: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    inviterUsername: { type: String, required: true},
    invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    inviteeUsername: { type: String, required: false},
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    projectName: { type: String, required: true},
    position: { type: String, required: true}, 
    type: { type: String, required: true },
    createdDate: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
}, {});

export default mongoose.models.Invitation || mongoose.model<IInvitation>('Invitation', InvitationSchema)