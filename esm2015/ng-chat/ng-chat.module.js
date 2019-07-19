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
export class NgChatModule {
}
NgChatModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, HttpClientModule],
                declarations: [NgChat, EmojifyPipe, LinkfyPipe, GroupMessageDisplayNamePipe, NgChatOptionsComponent],
                exports: [NgChat]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2hhdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9uZy1jaGF0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBT2hHLE1BQU0sT0FBTyxZQUFZOzs7WUFMeEIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ3RELFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLDJCQUEyQixFQUFFLHNCQUFzQixDQUFDO2dCQUNwRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgTmdDaGF0IH0gZnJvbSAnLi9uZy1jaGF0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbW9qaWZ5UGlwZSB9IGZyb20gJy4vcGlwZXMvZW1vamlmeS5waXBlJztcbmltcG9ydCB7IExpbmtmeVBpcGUgfSBmcm9tICcuL3BpcGVzL2xpbmtmeS5waXBlJztcbmltcG9ydCB7IEdyb3VwTWVzc2FnZURpc3BsYXlOYW1lUGlwZSB9IGZyb20gJy4vcGlwZXMvZ3JvdXAtbWVzc2FnZS1kaXNwbGF5LW5hbWUucGlwZSc7XG5pbXBvcnQgeyBOZ0NoYXRPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25nLWNoYXQtb3B0aW9ucy9uZy1jaGF0LW9wdGlvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ0NoYXQsIEVtb2ppZnlQaXBlLCBMaW5rZnlQaXBlLCBHcm91cE1lc3NhZ2VEaXNwbGF5TmFtZVBpcGUsIE5nQ2hhdE9wdGlvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdDaGF0XVxufSlcbmV4cG9ydCBjbGFzcyBOZ0NoYXRNb2R1bGUge1xufVxuIl19