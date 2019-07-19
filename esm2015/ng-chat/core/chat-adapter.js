/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class ChatAdapter {
    constructor() {
        // ### Abstract adapter methods ###
        // Event handlers
        this.friendsListChangedHandler = (participantsResponse) => { };
        this.messageReceivedHandler = (participant, message) => { };
    }
    // ### Adapter/Chat income/ingress events ###
    /**
     * @param {?} participantsResponse
     * @return {?}
     */
    onFriendsListChanged(participantsResponse) {
        this.friendsListChangedHandler(participantsResponse);
    }
    /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    onMessageReceived(participant, message) {
        this.messageReceivedHandler(participant, message);
    }
}
if (false) {
    /** @type {?} */
    ChatAdapter.prototype.friendsListChangedHandler;
    /** @type {?} */
    ChatAdapter.prototype.messageReceivedHandler;
    /**
     * @abstract
     * @return {?}
     */
    ChatAdapter.prototype.listFriends = function () { };
    /**
     * @abstract
     * @param {?} destinataryId
     * @return {?}
     */
    ChatAdapter.prototype.getMessageHistory = function (destinataryId) { };
    /**
     * @abstract
     * @param {?} message
     * @return {?}
     */
    ChatAdapter.prototype.sendMessage = function (message) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS9jaGF0LWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BLE1BQU0sT0FBZ0IsV0FBVztJQUFqQztRQUVJLG1DQUFtQzs7UUFxQm5DLDhCQUF5QixHQUEyRCxDQUFDLG9CQUEyQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDeEksMkJBQXNCLEdBQThELENBQUMsV0FBNkIsRUFBRSxPQUFnQixFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDaEosQ0FBQzs7Ozs7O0lBYlUsb0JBQW9CLENBQUMsb0JBQTJDO1FBRW5FLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVNLGlCQUFpQixDQUFDLFdBQTZCLEVBQUUsT0FBZ0I7UUFFcEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBS0o7OztJQUZHLGdEQUF3STs7SUFDeEksNkNBQTRJOzs7OztJQXBCNUksb0RBQWlFOzs7Ozs7SUFFakUsdUVBQTZFOzs7Ozs7SUFFN0UsMkRBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudFJlc3BvbnNlIH0gZnJvbSBcIi4vcGFydGljaXBhbnQtcmVzcG9uc2VcIjtcbmltcG9ydCB7IElDaGF0UGFydGljaXBhbnQgfSBmcm9tICcuL2NoYXQtcGFydGljaXBhbnQnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hhdEFkYXB0ZXJcbntcbiAgICAvLyAjIyMgQWJzdHJhY3QgYWRhcHRlciBtZXRob2RzICMjI1xuXG4gICAgcHVibGljIGFic3RyYWN0IGxpc3RGcmllbmRzKCk6IE9ic2VydmFibGU8UGFydGljaXBhbnRSZXNwb25zZVtdPjtcbiAgICBcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0TWVzc2FnZUhpc3RvcnkoZGVzdGluYXRhcnlJZDogYW55KTogT2JzZXJ2YWJsZTxNZXNzYWdlW10+O1xuXG4gICAgcHVibGljIGFic3RyYWN0IHNlbmRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpOiB2b2lkO1xuXG4gICAgLy8gIyMjIEFkYXB0ZXIvQ2hhdCBpbmNvbWUvaW5ncmVzcyBldmVudHMgIyMjXG5cbiAgICBwdWJsaWMgb25GcmllbmRzTGlzdENoYW5nZWQocGFydGljaXBhbnRzUmVzcG9uc2U6IFBhcnRpY2lwYW50UmVzcG9uc2VbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZnJpZW5kc0xpc3RDaGFuZ2VkSGFuZGxlcihwYXJ0aWNpcGFudHNSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTWVzc2FnZVJlY2VpdmVkKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBtZXNzYWdlOiBNZXNzYWdlKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlUmVjZWl2ZWRIYW5kbGVyKHBhcnRpY2lwYW50LCBtZXNzYWdlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgICBmcmllbmRzTGlzdENoYW5nZWRIYW5kbGVyOiAocGFydGljaXBhbnRzUmVzcG9uc2U6IFBhcnRpY2lwYW50UmVzcG9uc2VbXSkgPT4gdm9pZCAgPSAocGFydGljaXBhbnRzUmVzcG9uc2U6IFBhcnRpY2lwYW50UmVzcG9uc2VbXSkgPT4ge307XG4gICAgbWVzc2FnZVJlY2VpdmVkSGFuZGxlcjogKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBtZXNzYWdlOiBNZXNzYWdlKSA9PiB2b2lkID0gKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBtZXNzYWdlOiBNZXNzYWdlKSA9PiB7fTtcbn1cbiJdfQ==