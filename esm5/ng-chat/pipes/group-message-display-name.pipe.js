/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { ChatParticipantType } from "../core/chat-participant-type.enum";
/*
 * Renders the display name of a participant in a group based on who's sent the message
*/
var GroupMessageDisplayNamePipe = /** @class */ (function () {
    function GroupMessageDisplayNamePipe() {
    }
    /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    GroupMessageDisplayNamePipe.prototype.transform = /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    function (participant, message) {
        if (participant && participant.participantType == ChatParticipantType.Group) {
            /** @type {?} */
            var group = (/** @type {?} */ (participant));
            /** @type {?} */
            var userIndex = group.chattingTo.findIndex(function (x) { return x.id == message.fromId; });
            return group.chattingTo[userIndex >= 0 ? userIndex : 0].displayName;
        }
        else
            return "";
    };
    GroupMessageDisplayNamePipe.decorators = [
        { type: Pipe, args: [{ name: 'groupMessageDisplayName' },] }
    ];
    return GroupMessageDisplayNamePipe;
}());
export { GroupMessageDisplayNamePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtbWVzc2FnZS1kaXNwbGF5LW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWNoYXQvIiwic291cmNlcyI6WyJuZy1jaGF0L3BpcGVzL2dyb3VwLW1lc3NhZ2UtZGlzcGxheS1uYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBT3pFO0lBQUE7SUFhQSxDQUFDOzs7Ozs7SUFYRywrQ0FBUzs7Ozs7SUFBVCxVQUFVLFdBQTZCLEVBQUUsT0FBZ0I7UUFDckQsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLGVBQWUsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQzNFOztnQkFDUSxLQUFLLEdBQUcsbUJBQUEsV0FBVyxFQUFTOztnQkFDNUIsU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUF0QixDQUFzQixDQUFDO1lBRXZFLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUN2RTs7WUFFRyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDOztnQkFaSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUM7O0lBYXZDLGtDQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiLi4vY29yZS9ncm91cFwiO1xuaW1wb3J0IHsgQ2hhdFBhcnRpY2lwYW50VHlwZSB9IGZyb20gXCIuLi9jb3JlL2NoYXQtcGFydGljaXBhbnQtdHlwZS5lbnVtXCI7XG5pbXBvcnQgeyBJQ2hhdFBhcnRpY2lwYW50IH0gZnJvbSBcIi4uL2NvcmUvY2hhdC1wYXJ0aWNpcGFudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuLi9jb3JlL21lc3NhZ2VcIjtcblxuLypcbiAqIFJlbmRlcnMgdGhlIGRpc3BsYXkgbmFtZSBvZiBhIHBhcnRpY2lwYW50IGluIGEgZ3JvdXAgYmFzZWQgb24gd2hvJ3Mgc2VudCB0aGUgbWVzc2FnZVxuKi9cbkBQaXBlKHtuYW1lOiAnZ3JvdXBNZXNzYWdlRGlzcGxheU5hbWUnfSlcbmV4cG9ydCBjbGFzcyBHcm91cE1lc3NhZ2VEaXNwbGF5TmFtZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0ocGFydGljaXBhbnQ6IElDaGF0UGFydGljaXBhbnQsIG1lc3NhZ2U6IE1lc3NhZ2UpOiBzdHJpbmcge1xuICAgICAgICBpZiAocGFydGljaXBhbnQgJiYgcGFydGljaXBhbnQucGFydGljaXBhbnRUeXBlID09IENoYXRQYXJ0aWNpcGFudFR5cGUuR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBncm91cCA9IHBhcnRpY2lwYW50IGFzIEdyb3VwO1xuICAgICAgICAgICAgbGV0IHVzZXJJbmRleCA9IGdyb3VwLmNoYXR0aW5nVG8uZmluZEluZGV4KHggPT4geC5pZCA9PSBtZXNzYWdlLmZyb21JZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBncm91cC5jaGF0dGluZ1RvW3VzZXJJbmRleCA+PSAwID8gdXNlckluZGV4IDogMF0uZGlzcGxheU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSBcbn1cbiJdfQ==