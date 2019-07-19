/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
export class DefaultFileUploadAdapter {
    /**
     * \@summary Basic file upload adapter implementation for HTTP request form file consumption
     * @param {?} _serverEndpointUrl The API endpoint full qualified address that will receive a form file to process and return the metadata.
     * @param {?} _http
     */
    constructor(_serverEndpointUrl, _http) {
        this._serverEndpointUrl = _serverEndpointUrl;
        this._http = _http;
    }
    /**
     * @param {?} file
     * @param {?} participantId
     * @return {?}
     */
    uploadFile(file, participantId) {
        /** @type {?} */
        const formData = new FormData();
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
    }
}
if (false) {
    /** @type {?} */
    DefaultFileUploadAdapter.prototype._serverEndpointUrl;
    /** @type {?} */
    DefaultFileUploadAdapter.prototype._http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1maWxlLXVwbG9hZC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvY29yZS9kZWZhdWx0LWZpbGUtdXBsb2FkLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQU1qQyxZQUFvQixrQkFBMEIsRUFBVSxLQUFpQjtRQUFyRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO0lBQ3pFLENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxJQUFVLEVBQUUsYUFBa0I7O2NBQy9CLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRTtRQUV6QywwREFBMEQ7UUFDMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5FLHNJQUFzSTtRQUN0SSxtRkFBbUY7UUFDbkYsMkJBQTJCO1FBQzNCLE1BQU07UUFFTixnREFBZ0Q7UUFDaEQsc0RBQXNEO1FBRXRELGlEQUFpRDtRQUVqRCxhQUFhO1FBQ2IsNEJBQTRCO1FBQzVCLDRCQUE0QjtRQUM1Qiw2REFBNkQ7UUFDN0QsZUFBZTtRQUNmLG1GQUFtRjtRQUVuRixtREFBbUQ7UUFDbkQsZUFBZTtRQUNmLHFEQUFxRDtRQUNyRCxlQUFlO1FBRWYsNENBQTRDO1FBQzVDLGVBQWU7UUFDZixVQUFVO0lBQ2QsQ0FBQztDQUNKOzs7SUF0Q2Usc0RBQWtDOztJQUFFLHlDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGaWxlVXBsb2FkQWRhcHRlciB9IGZyb20gJy4vZmlsZS11cGxvYWQtYWRhcHRlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEV2ZW50VHlwZSwgSHR0cFJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vbWVzc2FnZSc7XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmlsZVVwbG9hZEFkYXB0ZXIgaW1wbGVtZW50cyBJRmlsZVVwbG9hZEFkYXB0ZXJcbntcbiAgICAvKipcbiAgICAgKiBAc3VtbWFyeSBCYXNpYyBmaWxlIHVwbG9hZCBhZGFwdGVyIGltcGxlbWVudGF0aW9uIGZvciBIVFRQIHJlcXVlc3QgZm9ybSBmaWxlIGNvbnN1bXB0aW9uXG4gICAgICogQHBhcmFtIF9zZXJ2ZXJFbmRwb2ludFVybCBUaGUgQVBJIGVuZHBvaW50IGZ1bGwgcXVhbGlmaWVkIGFkZHJlc3MgdGhhdCB3aWxsIHJlY2VpdmUgYSBmb3JtIGZpbGUgdG8gcHJvY2VzcyBhbmQgcmV0dXJuIHRoZSBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2ZXJFbmRwb2ludFVybDogc3RyaW5nLCBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgdXBsb2FkRmlsZShmaWxlOiBGaWxlLCBwYXJ0aWNpcGFudElkOiBhbnkpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgLy9mb3JtRGF0YS5hcHBlbmQoJ25nLWNoYXQtc2VuZGVyLXVzZXJpZCcsIGN1cnJlbnRVc2VySWQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ25nLWNoYXQtcGFydGljaXBhbnQtaWQnLCBwYXJ0aWNpcGFudElkKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0PE1lc3NhZ2U+KHRoaXMuX3NlcnZlckVuZHBvaW50VXJsLCBmb3JtRGF0YSk7XG5cbiAgICAgICAgLy8gVE9ETzogTGVhdmluZyB0aGlzIGlmIHdlIHdhbnQgdG8gdHJhY2sgdXBsb2FkIHByb2dyZXNzIGluIGRldGFpbCBpbiB0aGUgZnV0dXJlLiBNaWdodCBuZWVkIGEgZGlmZmVyZW50IFN1YmplY3QgZ2VuZXJpYyB0eXBlIHdyYXBwZXJcbiAgICAgICAgLy8gY29uc3QgZmlsZVJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCB0aGlzLl9zZXJ2ZXJFbmRwb2ludFVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgLy8gICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGNvbnN0IHVwbG9hZFByb2dyZXNzID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgICAgICAvLyBjb25zdCB1cGxvYWRTdGF0dXMgPSB1cGxvYWRQcm9ncmVzcy5hc09ic2VydmFibGUoKTtcblxuICAgICAgICAvL2NvbnN0IHJlc3BvbnNlUHJvbWlzZSA9IG5ldyBTdWJqZWN0PE1lc3NhZ2U+KCk7XG5cbiAgICAgICAgLy8gdGhpcy5faHR0cFxuICAgICAgICAvLyAgICAgLnJlcXVlc3QoZmlsZVJlcXVlc3QpXG4gICAgICAgIC8vICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgLy8gICAgICAgICAvLyBpZiAoZXZlbnQudHlwZSA9PSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzKVxuICAgICAgICAvLyAgICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgY29uc3QgcGVyY2VudERvbmUgPSBNYXRoLnJvdW5kKDEwMCAqIGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKTtcblxuICAgICAgICAvLyAgICAgICAgIC8vICAgICB1cGxvYWRQcm9ncmVzcy5uZXh0KHBlcmNlbnREb25lKTtcbiAgICAgICAgLy8gICAgICAgICAvLyB9XG4gICAgICAgIC8vICAgICAgICAgLy8gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpXG4gICAgICAgIC8vICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgdXBsb2FkUHJvZ3Jlc3MuY29tcGxldGUoKTtcbiAgICAgICAgLy8gICAgICAgICAvLyB9XG4gICAgICAgIC8vICAgICB9KTtcbiAgICB9XG59XG4iXX0=