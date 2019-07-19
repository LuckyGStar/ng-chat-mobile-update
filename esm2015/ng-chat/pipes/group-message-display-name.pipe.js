/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { ChatParticipantType } from "../core/chat-participant-type.enum";
/*
 * Renders the display name of a participant in a group based on who's sent the message
*/
export class GroupMessageDisplayNamePipe {
    /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    transform(participant, message) {
        if (participant && participant.participantType == ChatParticipantType.Group) {
            /** @type {?} */
            let group = (/** @type {?} */ (participant));
            /** @type {?} */
            let userIndex = group.chattingTo.findIndex(x => x.id == message.fromId);
            return group.chattingTo[userIndex >= 0 ? userIndex : 0].displayName;
        }
        else
            return "";
    }
}
GroupMessageDisplayNamePipe.decorators = [
    { type: Pipe, args: [{ name: 'groupMessageDisplayName' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtbWVzc2FnZS1kaXNwbGF5LW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWNoYXQvIiwic291cmNlcyI6WyJuZy1jaGF0L3BpcGVzL2dyb3VwLW1lc3NhZ2UtZGlzcGxheS1uYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBUXpFLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQUNwQyxTQUFTLENBQUMsV0FBNkIsRUFBRSxPQUFnQjtRQUNyRCxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsZUFBZSxJQUFJLG1CQUFtQixDQUFDLEtBQUssRUFDM0U7O2dCQUNRLEtBQUssR0FBRyxtQkFBQSxXQUFXLEVBQVM7O2dCQUM1QixTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFdkUsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ3ZFOztZQUVHLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQVpKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSBcIi4uL2NvcmUvZ3JvdXBcIjtcbmltcG9ydCB7IENoYXRQYXJ0aWNpcGFudFR5cGUgfSBmcm9tIFwiLi4vY29yZS9jaGF0LXBhcnRpY2lwYW50LXR5cGUuZW51bVwiO1xuaW1wb3J0IHsgSUNoYXRQYXJ0aWNpcGFudCB9IGZyb20gXCIuLi9jb3JlL2NoYXQtcGFydGljaXBhbnRcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiLi4vY29yZS9tZXNzYWdlXCI7XG5cbi8qXG4gKiBSZW5kZXJzIHRoZSBkaXNwbGF5IG5hbWUgb2YgYSBwYXJ0aWNpcGFudCBpbiBhIGdyb3VwIGJhc2VkIG9uIHdobydzIHNlbnQgdGhlIG1lc3NhZ2VcbiovXG5AUGlwZSh7bmFtZTogJ2dyb3VwTWVzc2FnZURpc3BsYXlOYW1lJ30pXG5leHBvcnQgY2xhc3MgR3JvdXBNZXNzYWdlRGlzcGxheU5hbWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBtZXNzYWdlOiBNZXNzYWdlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHBhcnRpY2lwYW50ICYmIHBhcnRpY2lwYW50LnBhcnRpY2lwYW50VHlwZSA9PSBDaGF0UGFydGljaXBhbnRUeXBlLkdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSBwYXJ0aWNpcGFudCBhcyBHcm91cDtcbiAgICAgICAgICAgIGxldCB1c2VySW5kZXggPSBncm91cC5jaGF0dGluZ1RvLmZpbmRJbmRleCh4ID0+IHguaWQgPT0gbWVzc2FnZS5mcm9tSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuY2hhdHRpbmdUb1t1c2VySW5kZXggPj0gMCA/IHVzZXJJbmRleCA6IDBdLmRpc3BsYXlOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gXG59XG4iXX0=