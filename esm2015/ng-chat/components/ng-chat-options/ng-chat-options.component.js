/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Window } from '../../core/window';
export class NgChatOptionsComponent {
    constructor() {
        this.activeOptionTrackerChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} option
     * @return {?}
     */
    onOptionClicked(option) {
        if (option.action) {
            option.isActive = true;
            option.action(this.chattingTo);
            this.activeOptionTrackerChange.emit(option);
        }
    }
}
NgChatOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-chat-options',
                template: "<div *ngIf=\"options && options.length > 0\" class=\"ng-chat-options\">\n  <button class=\"ng-chat-options-activator\">\n    <span class=\"primary-text\">...</span>\n  </button>\n  <div class=\"ng-chat-options-content primary-background shadowed\">\n    <a *ngFor=\"let option of options; let i = index\" [ngClass]=\"'primary-text'\" (click)=\"onOptionClicked(option)\">\n      {{option.displayLabel}}\n    </a>\n  </div>      \n</div>\n",
                styles: [".ng-chat-options-activator{background-color:unset;color:#fff;line-height:28px;border:none;position:relative}.ng-chat-options-activator>span{position:relative;top:-5px;left:0}.ng-chat-options{position:relative;display:inline-block}.ng-chat-options:hover .ng-chat-options-content{display:block}.ng-chat-options:hover .ng-chat-options-activator{background-color:#ddd}.ng-chat-options-content{display:none;position:absolute;min-width:160px;z-index:1}.ng-chat-options-content a:hover{background-color:#ddd}.ng-chat-options-content a{padding:6px 16px;text-decoration:none;display:block}"]
            }] }
];
/** @nocollapse */
NgChatOptionsComponent.ctorParameters = () => [];
NgChatOptionsComponent.propDecorators = {
    options: [{ type: Input }],
    activeOptionTracker: [{ type: Input }],
    activeOptionTrackerChange: [{ type: Output }],
    chattingTo: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2hhdC1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWNoYXQvIiwic291cmNlcyI6WyJuZy1jaGF0L2NvbXBvbmVudHMvbmctY2hhdC1vcHRpb25zL25nLWNoYXQtb3B0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUTNDLE1BQU0sT0FBTyxzQkFBc0I7SUFFakM7UUFTTyw4QkFBeUIsR0FBOEIsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQVQ5RSxDQUFDOzs7O0lBY2pCLFFBQVE7SUFDUixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxNQUFtQjtRQUUvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQ2pCO1lBQ0ksTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsaWNBQStDOzthQUVsRDs7Ozs7c0JBS0UsS0FBSztrQ0FHTCxLQUFLO3dDQUdMLE1BQU07eUJBR04sS0FBSzs7OztJQVROLHlDQUM4Qjs7SUFFOUIscURBQ3dDOztJQUV4QywyREFDOEY7O0lBRTlGLDRDQUMwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvdyB9IGZyb20gJy4uLy4uL2NvcmUvd2luZG93JztcbmltcG9ydCB7IElDaGF0T3B0aW9uIH0gZnJvbSAnLi4vLi4vY29yZS9jaGF0LW9wdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmctY2hhdC1vcHRpb25zJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctY2hhdC1vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZy1jaGF0LW9wdGlvbnMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nQ2hhdE9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIG9wdGlvbnM6IElDaGF0T3B0aW9uW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGFjdGl2ZU9wdGlvblRyYWNrZXI6IElDaGF0T3B0aW9uO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgYWN0aXZlT3B0aW9uVHJhY2tlckNoYW5nZTogRXZlbnRFbWl0dGVyPElDaGF0T3B0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8SUNoYXRPcHRpb24+KCk7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNoYXR0aW5nVG86IFdpbmRvdztcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uT3B0aW9uQ2xpY2tlZChvcHRpb246IElDaGF0T3B0aW9uKTogdm9pZFxuICB7XG4gICAgICBpZiAob3B0aW9uLmFjdGlvbilcbiAgICAgIHtcbiAgICAgICAgICBvcHRpb24uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIG9wdGlvbi5hY3Rpb24odGhpcy5jaGF0dGluZ1RvKTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvblRyYWNrZXJDaGFuZ2UuZW1pdChvcHRpb24pO1xuICAgICAgfVxuICB9XG59XG4iXX0=