/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
/** @type {?} */
var emojiDictionary = [
    { patterns: [':)', ':-)', '=)'], unicode: '😃' },
    { patterns: [':D', ':-D', '=D'], unicode: '😀' },
    { patterns: [':(', ':-(', '=('], unicode: '🙁' },
    { patterns: [':|', ':-|', '=|'], unicode: '😐' },
    { patterns: [':*', ':-*', '=*'], unicode: '😙' },
    { patterns: ['T_T', 'T.T'], unicode: '😭' },
    { patterns: [':O', ':-O', '=O', ':o', ':-o', '=o'], unicode: '😮' },
    { patterns: [':P', ':-P', '=P', ':p', ':-p', '=p'], unicode: '😋' },
    { patterns: ['>.<'], unicode: '😣' },
    { patterns: ['@.@'], unicode: '😵' },
    { patterns: ['*.*'], unicode: '😍' },
    { patterns: ['<3'], unicode: '❤️' },
    { patterns: ['^.^'], unicode: '😊' },
    { patterns: [':+1'], unicode: '👍' },
    { patterns: [':-1'], unicode: '👎' }
];
/*
 * Transforms common emoji text to UTF encoded emojis
*/
var EmojifyPipe = /** @class */ (function () {
    function EmojifyPipe() {
    }
    /**
     * @param {?} message
     * @param {?} pipeEnabled
     * @return {?}
     */
    EmojifyPipe.prototype.transform = /**
     * @param {?} message
     * @param {?} pipeEnabled
     * @return {?}
     */
    function (message, pipeEnabled) {
        if (pipeEnabled && message && message.length > 1) {
            emojiDictionary.forEach(function (emoji) {
                emoji.patterns.forEach(function (pattern) {
                    message = message.replace(pattern, emoji.unicode);
                });
            });
        }
        return message;
    };
    EmojifyPipe.decorators = [
        { type: Pipe, args: [{ name: 'emojify' },] }
    ];
    return EmojifyPipe;
}());
export { EmojifyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamlmeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctY2hhdC8iLCJzb3VyY2VzIjpbIm5nLWNoYXQvcGlwZXMvZW1vamlmeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7SUFFaEQsZUFBZSxHQUFHO0lBQ2xCLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ2hELEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ2hELEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ2hELEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ2hELEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ2hELEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDM0MsRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDbkUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDbkUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ3BDLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtJQUNwQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDcEMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ25DLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtJQUNwQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDcEMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0NBQ3ZDOzs7O0FBS0Q7SUFBQTtJQWFBLENBQUM7Ozs7OztJQVhHLCtCQUFTOzs7OztJQUFULFVBQVUsT0FBZSxFQUFFLFdBQW9CO1FBQzNDLElBQUksV0FBVyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFTCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnQkFaRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDOztJQWF2QixrQkFBQztDQUFBLEFBYkQsSUFhQztTQVpZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBlbW9qaURpY3Rpb25hcnkgPSBbXG4gICAgeyBwYXR0ZXJuczogWyc6KScsICc6LSknLCAnPSknXSwgdW5pY29kZTogJ/CfmIMnIH0sXG4gICAgeyBwYXR0ZXJuczogWyc6RCcsICc6LUQnLCAnPUQnXSwgdW5pY29kZTogJ/CfmIAnIH0sXG4gICAgeyBwYXR0ZXJuczogWyc6KCcsICc6LSgnLCAnPSgnXSwgdW5pY29kZTogJ/CfmYEnIH0sXG4gICAgeyBwYXR0ZXJuczogWyc6fCcsICc6LXwnLCAnPXwnXSwgdW5pY29kZTogJ/CfmJAnIH0sXG4gICAgeyBwYXR0ZXJuczogWyc6KicsICc6LSonLCAnPSonXSwgdW5pY29kZTogJ/CfmJknIH0sXG4gICAgeyBwYXR0ZXJuczogWydUX1QnLCAnVC5UJ10sIHVuaWNvZGU6ICfwn5itJyB9LFxuICAgIHsgcGF0dGVybnM6IFsnOk8nLCAnOi1PJywgJz1PJywgJzpvJywgJzotbycsICc9byddLCB1bmljb2RlOiAn8J+YricgfSxcbiAgICB7IHBhdHRlcm5zOiBbJzpQJywgJzotUCcsICc9UCcsICc6cCcsICc6LXAnLCAnPXAnXSwgdW5pY29kZTogJ/CfmIsnIH0sXG4gICAgeyBwYXR0ZXJuczogWyc+LjwnXSwgdW5pY29kZTogJ/CfmKMnIH0sXG4gICAgeyBwYXR0ZXJuczogWydALkAnXSwgdW5pY29kZTogJ/CfmLUnIH0sXG4gICAgeyBwYXR0ZXJuczogWycqLionXSwgdW5pY29kZTogJ/CfmI0nIH0sXG4gICAgeyBwYXR0ZXJuczogWyc8MyddLCB1bmljb2RlOiAn4p2k77iPJyB9LFxuICAgIHsgcGF0dGVybnM6IFsnXi5eJ10sIHVuaWNvZGU6ICfwn5iKJyB9LFxuICAgIHsgcGF0dGVybnM6IFsnOisxJ10sIHVuaWNvZGU6ICfwn5GNJyB9LFxuICAgIHsgcGF0dGVybnM6IFsnOi0xJ10sIHVuaWNvZGU6ICfwn5GOJyB9XG5dO1xuXG4vKlxuICogVHJhbnNmb3JtcyBjb21tb24gZW1vamkgdGV4dCB0byBVVEYgZW5jb2RlZCBlbW9qaXNcbiovXG5AUGlwZSh7bmFtZTogJ2Vtb2ppZnknfSlcbmV4cG9ydCBjbGFzcyBFbW9qaWZ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShtZXNzYWdlOiBzdHJpbmcsIHBpcGVFbmFibGVkOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHBpcGVFbmFibGVkICYmIG1lc3NhZ2UgJiYgbWVzc2FnZS5sZW5ndGggPiAxKSB7ICBcbiAgICAgICAgICAgIGVtb2ppRGljdGlvbmFyeS5mb3JFYWNoKGVtb2ppID0+IHtcbiAgICAgICAgICAgICAgICBlbW9qaS5wYXR0ZXJucy5mb3JFYWNoKHBhdHRlcm4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKHBhdHRlcm4sIGVtb2ppLnVuaWNvZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cbn1cbiJdfQ==