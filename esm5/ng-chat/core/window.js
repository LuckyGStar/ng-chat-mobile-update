/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var Window = /** @class */ (function () {
    function Window(participant, isLoadingHistory, isCollapsed) {
        this.messages = [];
        this.newMessage = "";
        // UI Behavior properties
        this.isCollapsed = false;
        this.isLoadingHistory = false;
        this.hasFocus = false;
        this.hasMoreMessages = true;
        this.historyPage = 0;
        this.participant = participant;
        this.messages = [];
        this.isLoadingHistory = isLoadingHistory;
        this.hasFocus = false; // This will be triggered when the 'newMessage' input gets the current focus
        this.isCollapsed = isCollapsed;
        this.hasMoreMessages = false;
        this.historyPage = 0;
    }
    return Window;
}());
export { Window };
if (false) {
    /** @type {?} */
    Window.prototype.participant;
    /** @type {?} */
    Window.prototype.messages;
    /** @type {?} */
    Window.prototype.newMessage;
    /** @type {?} */
    Window.prototype.isCollapsed;
    /** @type {?} */
    Window.prototype.isLoadingHistory;
    /** @type {?} */
    Window.prototype.hasFocus;
    /** @type {?} */
    Window.prototype.hasMoreMessages;
    /** @type {?} */
    Window.prototype.historyPage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BO0lBRUksZ0JBQVksV0FBNkIsRUFBRSxnQkFBeUIsRUFBRSxXQUFvQjtRQVluRixhQUFRLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxFQUFFLENBQUM7O1FBR3pCLGdCQUFXLEdBQWEsS0FBSyxDQUFDO1FBQzlCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBbEIzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFJLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyw0RUFBNEU7UUFDbkcsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVlMLGFBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDOzs7O0lBVkcsNkJBQXFDOztJQUNyQywwQkFBZ0M7O0lBQ2hDLDRCQUFnQzs7SUFHaEMsNkJBQXFDOztJQUNyQyxrQ0FBeUM7O0lBQ3pDLDBCQUFpQzs7SUFDakMsaUNBQXVDOztJQUN2Qyw2QkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCB7IENoYXRQYXJ0aWNpcGFudFR5cGUgfSBmcm9tIFwiLi9jaGF0LXBhcnRpY2lwYW50LXR5cGUuZW51bVwiO1xuaW1wb3J0IHsgQ2hhdFBhcnRpY2lwYW50U3RhdHVzIH0gZnJvbSBcIi4vY2hhdC1wYXJ0aWNpcGFudC1zdGF0dXMuZW51bVwiO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiLi9ncm91cFwiO1xuaW1wb3J0IHsgSUNoYXRQYXJ0aWNpcGFudCB9IGZyb20gXCIuL2NoYXQtcGFydGljaXBhbnRcIjtcblxuZXhwb3J0IGNsYXNzIFdpbmRvd1xue1xuICAgIGNvbnN0cnVjdG9yKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBpc0xvYWRpbmdIaXN0b3J5OiBib29sZWFuLCBpc0NvbGxhcHNlZDogYm9vbGVhbilcbiAgICB7XG4gICAgICAgIHRoaXMucGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudDtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9ICBbXTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmdIaXN0b3J5ID0gaXNMb2FkaW5nSGlzdG9yeTtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlOyAvLyBUaGlzIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gdGhlICduZXdNZXNzYWdlJyBpbnB1dCBnZXRzIHRoZSBjdXJyZW50IGZvY3VzXG4gICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBpc0NvbGxhcHNlZDtcbiAgICAgICAgdGhpcy5oYXNNb3JlTWVzc2FnZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaXN0b3J5UGFnZSA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50OyAgICBcbiAgICBwdWJsaWMgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtdO1xuICAgIHB1YmxpYyBuZXdNZXNzYWdlPzogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIFVJIEJlaGF2aW9yIHByb3BlcnRpZXNcbiAgICBwdWJsaWMgaXNDb2xsYXBzZWQ/OiBib29sZWFuID0gZmFsc2U7IFxuICAgIHB1YmxpYyBpc0xvYWRpbmdIaXN0b3J5OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGhhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGhhc01vcmVNZXNzYWdlczogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGhpc3RvcnlQYWdlOiBudW1iZXIgPSAwO1xufVxuIl19