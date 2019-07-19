/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Guid } from "./guid";
import { ChatParticipantStatus } from "./chat-participant-status.enum";
import { ChatParticipantType } from "./chat-participant-type.enum";
export class Group {
    /**
     * @param {?} participants
     */
    constructor(participants) {
        this.id = Guid.newGuid();
        this.participantType = ChatParticipantType.Group;
        this.chattingTo = participants;
        this.status = ChatParticipantStatus.Online;
        // TODO: Add some customization for this in future releases
        this.displayName = participants.map((p) => p.displayName).sort((first, second) => second > first ? -1 : 1).join(", ");
    }
}
if (false) {
    /** @type {?} */
    Group.prototype.id;
    /** @type {?} */
    Group.prototype.chattingTo;
    /** @type {?} */
    Group.prototype.participantType;
    /** @type {?} */
    Group.prototype.status;
    /** @type {?} */
    Group.prototype.avatar;
    /** @type {?} */
    Group.prototype.displayName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9jb3JlL2dyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRW5FLE1BQU0sT0FBTyxLQUFLOzs7O0lBRWQsWUFBWSxZQUFvQjtRQVN6QixPQUFFLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBR25CLG9CQUFlLEdBQXdCLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQVY3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztRQUUzQywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxSCxDQUFDO0NBVUo7OztJQVJHLG1CQUFtQzs7SUFDbkMsMkJBQTBCOztJQUUxQixnQ0FBaUY7O0lBRWpGLHVCQUFxQzs7SUFDckMsdUJBQTZCOztJQUM3Qiw0QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlkIH0gZnJvbSBcIi4vZ3VpZFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCB7IENoYXRQYXJ0aWNpcGFudFN0YXR1cyB9IGZyb20gXCIuL2NoYXQtcGFydGljaXBhbnQtc3RhdHVzLmVudW1cIjtcbmltcG9ydCB7IElDaGF0UGFydGljaXBhbnQgfSBmcm9tIFwiLi9jaGF0LXBhcnRpY2lwYW50XCI7XG5pbXBvcnQgeyBDaGF0UGFydGljaXBhbnRUeXBlIH0gZnJvbSBcIi4vY2hhdC1wYXJ0aWNpcGFudC10eXBlLmVudW1cIjtcblxuZXhwb3J0IGNsYXNzIEdyb3VwIGltcGxlbWVudHMgSUNoYXRQYXJ0aWNpcGFudFxue1xuICAgIGNvbnN0cnVjdG9yKHBhcnRpY2lwYW50czogVXNlcltdKVxuICAgIHsgICBcbiAgICAgICAgdGhpcy5jaGF0dGluZ1RvID0gcGFydGljaXBhbnRzO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IENoYXRQYXJ0aWNpcGFudFN0YXR1cy5PbmxpbmU7XG5cbiAgICAgICAgLy8gVE9ETzogQWRkIHNvbWUgY3VzdG9taXphdGlvbiBmb3IgdGhpcyBpbiBmdXR1cmUgcmVsZWFzZXNcbiAgICAgICAgdGhpcy5kaXNwbGF5TmFtZSA9IHBhcnRpY2lwYW50cy5tYXAoKHApID0+IHAuZGlzcGxheU5hbWUpLnNvcnQoKGZpcnN0LCBzZWNvbmQpID0+IHNlY29uZCA+IGZpcnN0ID8gLTEgOiAxKS5qb2luKFwiLCBcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSBHdWlkLm5ld0d1aWQoKTtcbiAgICBwdWJsaWMgY2hhdHRpbmdUbzogVXNlcltdO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHBhcnRpY2lwYW50VHlwZTogQ2hhdFBhcnRpY2lwYW50VHlwZSA9IENoYXRQYXJ0aWNpcGFudFR5cGUuR3JvdXA7XG5cbiAgICBwdWJsaWMgc3RhdHVzOiBDaGF0UGFydGljaXBhbnRTdGF0dXM7XG4gICAgcHVibGljIGF2YXRhcjogc3RyaW5nIHwgbnVsbDtcbiAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZztcbn1cbiJdfQ==