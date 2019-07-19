/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var DefaultFileUploadAdapter = /** @class */ (function () {
    /**
     * @summary Basic file upload adapter implementation for HTTP request form file consumption
     * @param _serverEndpointUrl The API endpoint full qualified address that will receive a form file to process and return the metadata.
     */
    function DefaultFileUploadAdapter(_serverEndpointUrl, _http) {
        this._serverEndpointUrl = _serverEndpointUrl;
        this._http = _http;
    }
    /**
     * @param {?} file
     * @param {?} participantId
     * @return {?}
     */
    DefaultFileUploadAdapter.prototype.uploadFile = /**
     * @param {?} file
     * @param {?} participantId
     * @return {?}
     */
    function (file, participantId) {
        /** @type {?} */
        var formData = new FormData();
        //formData.append('ng-chat-sender-userid', currentUserId);
        formData.append('ng-chat-participant-id', participantId);
        formData.append('file', file, file.name);
        return this._http.post(this._serverEndpointUrl, formData);
        // TODO: Leaving this if we want to track upload progress in detail in the future. Might need a different Subject generic type wrapper
        // const fileRequest = new HttpRequest('POST', this._serverEndpointUrl, formData, {
        //     reportProgress: true
        // });
        // const uploadProgress = new Subject<number>();
        // const uploadStatus = uploadProgress.asObservable();
        //const responsePromise = new Subject<Message>();
        // this._http
        //     .request(fileRequest)
        //     .subscribe(event => {
        //         // if (event.type == HttpEventType.UploadProgress)
        //         // {
        //         //     const percentDone = Math.round(100 * event.loaded / event.total);
        //         //     uploadProgress.next(percentDone);
        //         // }
        //         // else if (event instanceof HttpResponse)
        //         // {
        //         //     uploadProgress.complete();
        //         // }
        //     });
    };
    return DefaultFileUploadAdapter;
}());
export { DefaultFileUploadAdapter };
if (false) {
    /** @type {?} */
    DefaultFileUploadAdapter.prototype._serverEndpointUrl;
    /** @type {?} */
    DefaultFileUploadAdapter.prototype._http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1maWxlLXVwbG9hZC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS9kZWZhdWx0LWZpbGUtdXBsb2FkLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BO0lBRUk7OztPQUdHO0lBQ0gsa0NBQW9CLGtCQUEwQixFQUFVLEtBQWlCO1FBQXJELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7SUFDekUsQ0FBQzs7Ozs7O0lBRUQsNkNBQVU7Ozs7O0lBQVYsVUFBVyxJQUFVLEVBQUUsYUFBa0I7O1lBQy9CLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRTtRQUV6QywwREFBMEQ7UUFDMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5FLHNJQUFzSTtRQUN0SSxtRkFBbUY7UUFDbkYsMkJBQTJCO1FBQzNCLE1BQU07UUFFTixnREFBZ0Q7UUFDaEQsc0RBQXNEO1FBRXRELGlEQUFpRDtRQUVqRCxhQUFhO1FBQ2IsNEJBQTRCO1FBQzVCLDRCQUE0QjtRQUM1Qiw2REFBNkQ7UUFDN0QsZUFBZTtRQUNmLG1GQUFtRjtRQUVuRixtREFBbUQ7UUFDbkQsZUFBZTtRQUNmLHFEQUFxRDtRQUNyRCxlQUFlO1FBRWYsNENBQTRDO1FBQzVDLGVBQWU7UUFDZixVQUFVO0lBQ2QsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQzs7OztJQXRDZSxzREFBa0M7O0lBQUUseUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZpbGVVcGxvYWRBZGFwdGVyIH0gZnJvbSAnLi9maWxlLXVwbG9hZC1hZGFwdGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwRXZlbnRUeXBlLCBIdHRwUmVzcG9uc2UsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9tZXNzYWdlJztcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGaWxlVXBsb2FkQWRhcHRlciBpbXBsZW1lbnRzIElGaWxlVXBsb2FkQWRhcHRlclxue1xuICAgIC8qKlxuICAgICAqIEBzdW1tYXJ5IEJhc2ljIGZpbGUgdXBsb2FkIGFkYXB0ZXIgaW1wbGVtZW50YXRpb24gZm9yIEhUVFAgcmVxdWVzdCBmb3JtIGZpbGUgY29uc3VtcHRpb25cbiAgICAgKiBAcGFyYW0gX3NlcnZlckVuZHBvaW50VXJsIFRoZSBBUEkgZW5kcG9pbnQgZnVsbCBxdWFsaWZpZWQgYWRkcmVzcyB0aGF0IHdpbGwgcmVjZWl2ZSBhIGZvcm0gZmlsZSB0byBwcm9jZXNzIGFuZCByZXR1cm4gdGhlIG1ldGFkYXRhLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZlckVuZHBvaW50VXJsOiBzdHJpbmcsIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHtcbiAgICB9XG5cbiAgICB1cGxvYWRGaWxlKGZpbGU6IEZpbGUsIHBhcnRpY2lwYW50SWQ6IGFueSk6IE9ic2VydmFibGU8TWVzc2FnZT4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICAvL2Zvcm1EYXRhLmFwcGVuZCgnbmctY2hhdC1zZW5kZXItdXNlcmlkJywgY3VycmVudFVzZXJJZCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmctY2hhdC1wYXJ0aWNpcGFudC1pZCcsIHBhcnRpY2lwYW50SWQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3Q8TWVzc2FnZT4odGhpcy5fc2VydmVyRW5kcG9pbnRVcmwsIGZvcm1EYXRhKTtcblxuICAgICAgICAvLyBUT0RPOiBMZWF2aW5nIHRoaXMgaWYgd2Ugd2FudCB0byB0cmFjayB1cGxvYWQgcHJvZ3Jlc3MgaW4gZGV0YWlsIGluIHRoZSBmdXR1cmUuIE1pZ2h0IG5lZWQgYSBkaWZmZXJlbnQgU3ViamVjdCBnZW5lcmljIHR5cGUgd3JhcHBlclxuICAgICAgICAvLyBjb25zdCBmaWxlUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgnUE9TVCcsIHRoaXMuX3NlcnZlckVuZHBvaW50VXJsLCBmb3JtRGF0YSwge1xuICAgICAgICAvLyAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWVcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gY29uc3QgdXBsb2FkUHJvZ3Jlc3MgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgICAgIC8vIGNvbnN0IHVwbG9hZFN0YXR1cyA9IHVwbG9hZFByb2dyZXNzLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgICAgIC8vY29uc3QgcmVzcG9uc2VQcm9taXNlID0gbmV3IFN1YmplY3Q8TWVzc2FnZT4oKTtcblxuICAgICAgICAvLyB0aGlzLl9odHRwXG4gICAgICAgIC8vICAgICAucmVxdWVzdChmaWxlUmVxdWVzdClcbiAgICAgICAgLy8gICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIC8vIGlmIChldmVudC50eXBlID09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpXG4gICAgICAgIC8vICAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICBjb25zdCBwZXJjZW50RG9uZSA9IE1hdGgucm91bmQoMTAwICogZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xuXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIHVwbG9hZFByb2dyZXNzLm5leHQocGVyY2VudERvbmUpO1xuICAgICAgICAvLyAgICAgICAgIC8vIH1cbiAgICAgICAgLy8gICAgICAgICAvLyBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSlcbiAgICAgICAgLy8gICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIC8vICAgICB1cGxvYWRQcm9ncmVzcy5jb21wbGV0ZSgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==