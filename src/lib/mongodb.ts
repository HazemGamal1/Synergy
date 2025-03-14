import Invitation, { IInvitation } from "../../models/Invitation";

export function watchInvitations(callback: (invitation : IInvitation) => void) {
  const changeStream = Invitation.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      callback(change.fullDocument);
    }
  });
}
