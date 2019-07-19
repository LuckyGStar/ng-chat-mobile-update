/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Guid } from "./guid";
import { ChatParticipantStatus } from "./chat-participant-status.enum";
import { ChatParticipantType } from "./chat-participant-type.enum";
var Group = /** @class */ (function () {
    function Group(participants) {
        this.id = Guid.newGuid();
        this.participantType = ChatParticipantType.Group;
        this.chattingTo = participants;
        this.status = ChatParticipantStatus.Online;
        // TODO: Add some customization for this in future releases
        this.displayName = participants.map(function (p) { return p.displayName; }).sort(function (first, second) { return second > first ? -1 : 1; }).join(", ");
    }
    return Group;
}());
export { Group };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9jb3JlL2dyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRW5FO0lBRUksZUFBWSxZQUFvQjtRQVN6QixPQUFFLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBR25CLG9CQUFlLEdBQXdCLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQVY3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztRQUUzQywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBYixDQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsTUFBTSxJQUFLLE9BQUEsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxSCxDQUFDO0lBVUwsWUFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7Ozs7SUFSRyxtQkFBbUM7O0lBQ25DLDJCQUEwQjs7SUFFMUIsZ0NBQWlGOztJQUVqRix1QkFBcUM7O0lBQ3JDLHVCQUE2Qjs7SUFDN0IsNEJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpZCB9IGZyb20gXCIuL2d1aWRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBDaGF0UGFydGljaXBhbnRTdGF0dXMgfSBmcm9tIFwiLi9jaGF0LXBhcnRpY2lwYW50LXN0YXR1cy5lbnVtXCI7XG5pbXBvcnQgeyBJQ2hhdFBhcnRpY2lwYW50IH0gZnJvbSBcIi4vY2hhdC1wYXJ0aWNpcGFudFwiO1xuaW1wb3J0IHsgQ2hhdFBhcnRpY2lwYW50VHlwZSB9IGZyb20gXCIuL2NoYXQtcGFydGljaXBhbnQtdHlwZS5lbnVtXCI7XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBpbXBsZW1lbnRzIElDaGF0UGFydGljaXBhbnRcbntcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWNpcGFudHM6IFVzZXJbXSlcbiAgICB7ICAgXG4gICAgICAgIHRoaXMuY2hhdHRpbmdUbyA9IHBhcnRpY2lwYW50cztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBDaGF0UGFydGljaXBhbnRTdGF0dXMuT25saW5lO1xuXG4gICAgICAgIC8vIFRPRE86IEFkZCBzb21lIGN1c3RvbWl6YXRpb24gZm9yIHRoaXMgaW4gZnV0dXJlIHJlbGVhc2VzXG4gICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSBwYXJ0aWNpcGFudHMubWFwKChwKSA9PiBwLmRpc3BsYXlOYW1lKS5zb3J0KChmaXJzdCwgc2Vjb25kKSA9PiBzZWNvbmQgPiBmaXJzdCA/IC0xIDogMSkuam9pbihcIiwgXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gR3VpZC5uZXdHdWlkKCk7XG4gICAgcHVibGljIGNoYXR0aW5nVG86IFVzZXJbXTtcblxuICAgIHB1YmxpYyByZWFkb25seSBwYXJ0aWNpcGFudFR5cGU6IENoYXRQYXJ0aWNpcGFudFR5cGUgPSBDaGF0UGFydGljaXBhbnRUeXBlLkdyb3VwO1xuXG4gICAgcHVibGljIHN0YXR1czogQ2hhdFBhcnRpY2lwYW50U3RhdHVzO1xuICAgIHB1YmxpYyBhdmF0YXI6IHN0cmluZyB8IG51bGw7XG4gICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG59XG4iXX0=