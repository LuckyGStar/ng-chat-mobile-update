/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChat } from './ng-chat.component';
import { EmojifyPipe } from './pipes/emojify.pipe';
import { LinkfyPipe } from './pipes/linkfy.pipe';
import { GroupMessageDisplayNamePipe } from './pipes/group-message-display-name.pipe';
import { NgChatOptionsComponent } from './components/ng-chat-options/ng-chat-options.component';
var NgChatModule = /** @class */ (function () {
    function NgChatModule() {
    }
    NgChatModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, HttpClientModule],
                    declarations: [NgChat, EmojifyPipe, LinkfyPipe, GroupMessageDisplayNamePipe, NgChatOptionsComponent],
                    exports: [NgChat]
                },] }
    ];
    return NgChatModule;
}());
export { NgChatModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2hhdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9uZy1jaGF0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRWhHO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDdEQsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsc0JBQXNCLENBQUM7b0JBQ3BHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDbEI7O0lBRUQsbUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE5nQ2hhdCB9IGZyb20gJy4vbmctY2hhdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW1vamlmeVBpcGUgfSBmcm9tICcuL3BpcGVzL2Vtb2ppZnkucGlwZSc7XG5pbXBvcnQgeyBMaW5rZnlQaXBlIH0gZnJvbSAnLi9waXBlcy9saW5rZnkucGlwZSc7XG5pbXBvcnQgeyBHcm91cE1lc3NhZ2VEaXNwbGF5TmFtZVBpcGUgfSBmcm9tICcuL3BpcGVzL2dyb3VwLW1lc3NhZ2UtZGlzcGxheS1uYW1lLnBpcGUnO1xuaW1wb3J0IHsgTmdDaGF0T3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZy1jaGF0LW9wdGlvbnMvbmctY2hhdC1vcHRpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmdDaGF0LCBFbW9qaWZ5UGlwZSwgTGlua2Z5UGlwZSwgR3JvdXBNZXNzYWdlRGlzcGxheU5hbWVQaXBlLCBOZ0NoYXRPcHRpb25zQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nQ2hhdF1cbn0pXG5leHBvcnQgY2xhc3MgTmdDaGF0TW9kdWxlIHtcbn1cbiJdfQ==