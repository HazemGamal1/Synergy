import Invitation from "../../models/Invitation";

export function watchInvitations(callback: (invitation : any) => void) {
  const changeStream = Invitation.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      callback(change.fullDocument);
    }
  });
}
