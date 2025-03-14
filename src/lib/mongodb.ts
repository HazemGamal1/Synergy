import Invitation, { IInvitation } from "../../models/Invitation";
import Team, { ITeam } from "../../models/Team";

export function watchInvitations(callback: (invitation : IInvitation) => void) {
  const changeStream = Invitation.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      callback(change.fullDocument);
    }
  });
}

export function watchTeams(callback: (team: ITeam ) => void) {
  const changeStream = Team.watch();
  changeStream.on('change', (change) => {
    if(change.operationType === 'insert'){
      callback(change.fullDocument);
    }
  })
}