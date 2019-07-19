/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Message } from './message';
import { MessageType } from './message-type.enum';
export class FileMessage extends Message {
    constructor() {
        super();
        this.fileSizeInBytes = 0;
        this.type = MessageType.File;
    }
}
if (false) {
    /** @type {?} */
    FileMessage.prototype.downloadUrl;
    /** @type {?} */
    FileMessage.prototype.mimeType;
    /** @type {?} */
    FileMessage.prototype.fileSizeInBytes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS9maWxlLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE1BQU0sT0FBTyxXQUFZLFNBQVEsT0FBTztJQUVwQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBT0wsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFML0IsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ2pDLENBQUM7Q0FLSjs7O0lBSEcsa0NBQTJCOztJQUMzQiwrQkFBd0I7O0lBQ3hCLHNDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL21lc3NhZ2UtdHlwZS5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEZpbGVNZXNzYWdlIGV4dGVuZHMgTWVzc2FnZVxue1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50eXBlID0gTWVzc2FnZVR5cGUuRmlsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG93bmxvYWRVcmw6IHN0cmluZztcbiAgICBwdWJsaWMgbWltZVR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgZmlsZVNpemVJbkJ5dGVzOiBudW1iZXIgPSAwO1xufVxuIl19