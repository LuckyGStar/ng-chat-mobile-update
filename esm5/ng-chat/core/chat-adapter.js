/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
ChatAdapter = /** @class */ (function () {
    function ChatAdapter() {
        // ### Abstract adapter methods ###
        // Event handlers
        this.friendsListChangedHandler = function (participantsResponse) { };
        this.messageReceivedHandler = function (participant, message) { };
    }
    // ### Adapter/Chat income/ingress events ###
    // ### Adapter/Chat income/ingress events ###
    /**
     * @param {?} participantsResponse
     * @return {?}
     */
    ChatAdapter.prototype.onFriendsListChanged = 
    // ### Adapter/Chat income/ingress events ###
    /**
     * @param {?} participantsResponse
     * @return {?}
     */
    function (participantsResponse) {
        this.friendsListChangedHandler(participantsResponse);
    };
    /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    ChatAdapter.prototype.onMessageReceived = /**
     * @param {?} participant
     * @param {?} message
     * @return {?}
     */
    function (participant, message) {
        this.messageReceivedHandler(participant, message);
    };
    return ChatAdapter;
}());
/**
 * @abstract
 */
export { ChatAdapter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS9jaGF0LWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOzs7O0lBQUE7UUFFSSxtQ0FBbUM7O1FBcUJuQyw4QkFBeUIsR0FBMkQsVUFBQyxvQkFBMkMsSUFBTSxDQUFDLENBQUM7UUFDeEksMkJBQXNCLEdBQThELFVBQUMsV0FBNkIsRUFBRSxPQUFnQixJQUFNLENBQUMsQ0FBQztJQUNoSixDQUFDO0lBZkcsNkNBQTZDOzs7Ozs7SUFFdEMsMENBQW9COzs7Ozs7SUFBM0IsVUFBNEIsb0JBQTJDO1FBRW5FLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVNLHVDQUFpQjs7Ozs7SUFBeEIsVUFBeUIsV0FBNkIsRUFBRSxPQUFnQjtRQUVwRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFLTCxrQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7Ozs7Ozs7SUFGRyxnREFBd0k7O0lBQ3hJLDZDQUE0STs7Ozs7SUFwQjVJLG9EQUFpRTs7Ozs7O0lBRWpFLHVFQUE2RTs7Ozs7O0lBRTdFLDJEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vdXNlclwiO1xuaW1wb3J0IHsgUGFydGljaXBhbnRSZXNwb25zZSB9IGZyb20gXCIuL3BhcnRpY2lwYW50LXJlc3BvbnNlXCI7XG5pbXBvcnQgeyBJQ2hhdFBhcnRpY2lwYW50IH0gZnJvbSAnLi9jaGF0LXBhcnRpY2lwYW50JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoYXRBZGFwdGVyXG57XG4gICAgLy8gIyMjIEFic3RyYWN0IGFkYXB0ZXIgbWV0aG9kcyAjIyNcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBsaXN0RnJpZW5kcygpOiBPYnNlcnZhYmxlPFBhcnRpY2lwYW50UmVzcG9uc2VbXT47XG4gICAgXG4gICAgcHVibGljIGFic3RyYWN0IGdldE1lc3NhZ2VIaXN0b3J5KGRlc3RpbmF0YXJ5SWQ6IGFueSk6IE9ic2VydmFibGU8TWVzc2FnZVtdPjtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZW5kTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKTogdm9pZDtcblxuICAgIC8vICMjIyBBZGFwdGVyL0NoYXQgaW5jb21lL2luZ3Jlc3MgZXZlbnRzICMjI1xuXG4gICAgcHVibGljIG9uRnJpZW5kc0xpc3RDaGFuZ2VkKHBhcnRpY2lwYW50c1Jlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlW10pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmZyaWVuZHNMaXN0Q2hhbmdlZEhhbmRsZXIocGFydGljaXBhbnRzUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1lc3NhZ2VSZWNlaXZlZChwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCwgbWVzc2FnZTogTWVzc2FnZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubWVzc2FnZVJlY2VpdmVkSGFuZGxlcihwYXJ0aWNpcGFudCwgbWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IGhhbmRsZXJzXG4gICAgZnJpZW5kc0xpc3RDaGFuZ2VkSGFuZGxlcjogKHBhcnRpY2lwYW50c1Jlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlW10pID0+IHZvaWQgID0gKHBhcnRpY2lwYW50c1Jlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlW10pID0+IHt9O1xuICAgIG1lc3NhZ2VSZWNlaXZlZEhhbmRsZXI6IChwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCwgbWVzc2FnZTogTWVzc2FnZSkgPT4gdm9pZCA9IChwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge307XG59XG4iXX0=