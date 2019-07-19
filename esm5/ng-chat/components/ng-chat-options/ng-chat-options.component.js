/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Window } from '../../core/window';
var NgChatOptionsComponent = /** @class */ (function () {
    function NgChatOptionsComponent() {
        this.activeOptionTrackerChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgChatOptionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} option
     * @return {?}
     */
    NgChatOptionsComponent.prototype.onOptionClicked = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option.action) {
            option.isActive = true;
            option.action(this.chattingTo);
            this.activeOptionTrackerChange.emit(option);
        }
    };
    NgChatOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-chat-options',
                    template: "<div *ngIf=\"options && options.length > 0\" class=\"ng-chat-options\">\n  <button class=\"ng-chat-options-activator\">\n    <span class=\"primary-text\">...</span>\n  </button>\n  <div class=\"ng-chat-options-content primary-background shadowed\">\n    <a *ngFor=\"let option of options; let i = index\" [ngClass]=\"'primary-text'\" (click)=\"onOptionClicked(option)\">\n      {{option.displayLabel}}\n    </a>\n  </div>      \n</div>\n",
                    styles: [".ng-chat-options-activator{background-color:unset;color:#fff;line-height:28px;border:none;position:relative}.ng-chat-options-activator>span{position:relative;top:-5px;left:0}.ng-chat-options{position:relative;display:inline-block}.ng-chat-options:hover .ng-chat-options-content{display:block}.ng-chat-options:hover .ng-chat-options-activator{background-color:#ddd}.ng-chat-options-content{display:none;position:absolute;min-width:160px;z-index:1}.ng-chat-options-content a:hover{background-color:#ddd}.ng-chat-options-content a{padding:6px 16px;text-decoration:none;display:block}"]
                }] }
    ];
    /** @nocollapse */
    NgChatOptionsComponent.ctorParameters = function () { return []; };
    NgChatOptionsComponent.propDecorators = {
        options: [{ type: Input }],
        activeOptionTracker: [{ type: Input }],
        activeOptionTrackerChange: [{ type: Output }],
        chattingTo: [{ type: Input }]
    };
    return NgChatOptionsComponent;
}());
export { NgChatOptionsComponent };
if (false) {
    /** @type {?} */
    NgChatOptionsComponent.prototype.options;
    /** @type {?} */
    NgChatOptionsComponent.prototype.activeOptionTracker;
    /** @type {?} */
    NgChatOptionsComponent.prototype.activeOptionTrackerChange;
    /** @type {?} */
    NgChatOptionsComponent.prototype.chattingTo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2hhdC1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWNoYXQvIiwic291cmNlcyI6WyJuZy1jaGF0L2NvbXBvbmVudHMvbmctY2hhdC1vcHRpb25zL25nLWNoYXQtb3B0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzNDO0lBT0U7UUFTTyw4QkFBeUIsR0FBOEIsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQVQ5RSxDQUFDOzs7O0lBY2pCLHlDQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7O0lBRUQsZ0RBQWU7Ozs7SUFBZixVQUFnQixNQUFtQjtRQUUvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQ2pCO1lBQ0ksTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7O2dCQWhDRixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsaWNBQStDOztpQkFFbEQ7Ozs7OzBCQUtFLEtBQUs7c0NBR0wsS0FBSzs0Q0FHTCxNQUFNOzZCQUdOLEtBQUs7O0lBZVIsNkJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQTVCWSxzQkFBc0I7OztJQUlqQyx5Q0FDOEI7O0lBRTlCLHFEQUN3Qzs7SUFFeEMsMkRBQzhGOztJQUU5Riw0Q0FDMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3cgfSBmcm9tICcuLi8uLi9jb3JlL3dpbmRvdyc7XG5pbXBvcnQgeyBJQ2hhdE9wdGlvbiB9IGZyb20gJy4uLy4uL2NvcmUvY2hhdC1vcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nLWNoYXQtb3B0aW9ucycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25nLWNoYXQtb3B0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmctY2hhdC1vcHRpb25zLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0NoYXRPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBvcHRpb25zOiBJQ2hhdE9wdGlvbltdO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhY3RpdmVPcHRpb25UcmFja2VyOiBJQ2hhdE9wdGlvbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGFjdGl2ZU9wdGlvblRyYWNrZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQ2hhdE9wdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPElDaGF0T3B0aW9uPigpO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjaGF0dGluZ1RvOiBXaW5kb3c7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbk9wdGlvbkNsaWNrZWQob3B0aW9uOiBJQ2hhdE9wdGlvbik6IHZvaWRcbiAge1xuICAgICAgaWYgKG9wdGlvbi5hY3Rpb24pXG4gICAgICB7XG4gICAgICAgICAgb3B0aW9uLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBvcHRpb24uYWN0aW9uKHRoaXMuY2hhdHRpbmdUbyk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVPcHRpb25UcmFja2VyQ2hhbmdlLmVtaXQob3B0aW9uKTtcbiAgICAgIH1cbiAgfVxufVxuIl19