/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
/*
 * Transforms text containing URLs or E-mails to valid links/mailtos
*/
export class LinkfyPipe {
    /**
     * @param {?} message
     * @param {?} pipeEnabled
     * @return {?}
     */
    transform(message, pipeEnabled) {
        if (pipeEnabled && message && message.length > 1) {
            /** @type {?} */
            let replacedText;
            /** @type {?} */
            let replacePatternProtocol;
            /** @type {?} */
            let replacePatternWWW;
            /** @type {?} */
            let replacePatternMailTo;
            // URLs starting with http://, https://, or ftp://
            replacePatternProtocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = message.replace(replacePatternProtocol, '<a href="$1" target="_blank">$1</a>');
            // URLs starting with "www." (ignoring // before it).
            replacePatternWWW = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePatternWWW, '$1<a href="http://$2" target="_blank">$2</a>');
            // Change email addresses to mailto:: links.
            replacePatternMailTo = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePatternMailTo, '<a href="mailto:$1">$1</a>');
            return replacedText;
        }
        else
            return message;
    }
}
LinkfyPipe.decorators = [
    { type: Pipe, args: [{ name: 'linkfy' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2Z5LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9waXBlcy9saW5rZnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7QUFNcEQsTUFBTSxPQUFPLFVBQVU7Ozs7OztJQUNuQixTQUFTLENBQUMsT0FBZSxFQUFFLFdBQW9CO1FBQzNDLElBQUksV0FBVyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDaEQ7O2dCQUNRLFlBQVk7O2dCQUNaLHNCQUFzQjs7Z0JBQ3RCLGlCQUFpQjs7Z0JBQ2pCLG9CQUFvQjtZQUV4QixrREFBa0Q7WUFDbEQsc0JBQXNCLEdBQUcseUVBQXlFLENBQUM7WUFDbkcsWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUU5RixxREFBcUQ7WUFDckQsaUJBQWlCLEdBQUcsZ0NBQWdDLENBQUM7WUFDckQsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsOENBQThDLENBQUMsQ0FBQztZQUV2Ryw0Q0FBNEM7WUFDNUMsb0JBQW9CLEdBQUcsMERBQTBELENBQUM7WUFDbEYsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztZQUV4RixPQUFPLFlBQVksQ0FBQztTQUN2Qjs7WUFFRyxPQUFPLE9BQU8sQ0FBQztJQUN2QixDQUFDOzs7WUExQkosSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLypcbiAqIFRyYW5zZm9ybXMgdGV4dCBjb250YWluaW5nIFVSTHMgb3IgRS1tYWlscyB0byB2YWxpZCBsaW5rcy9tYWlsdG9zXG4qL1xuQFBpcGUoe25hbWU6ICdsaW5rZnknfSlcbmV4cG9ydCBjbGFzcyBMaW5rZnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKG1lc3NhZ2U6IHN0cmluZywgcGlwZUVuYWJsZWQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICBpZiAocGlwZUVuYWJsZWQgJiYgbWVzc2FnZSAmJiBtZXNzYWdlLmxlbmd0aCA+IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByZXBsYWNlZFRleHQ7XG4gICAgICAgICAgICBsZXQgcmVwbGFjZVBhdHRlcm5Qcm90b2NvbDtcbiAgICAgICAgICAgIGxldCByZXBsYWNlUGF0dGVybldXVztcbiAgICAgICAgICAgIGxldCByZXBsYWNlUGF0dGVybk1haWxUbztcblxuICAgICAgICAgICAgLy8gVVJMcyBzdGFydGluZyB3aXRoIGh0dHA6Ly8sIGh0dHBzOi8vLCBvciBmdHA6Ly9cbiAgICAgICAgICAgIHJlcGxhY2VQYXR0ZXJuUHJvdG9jb2wgPSAvKFxcYihodHRwcz98ZnRwKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9naW07XG4gICAgICAgICAgICByZXBsYWNlZFRleHQgPSBtZXNzYWdlLnJlcGxhY2UocmVwbGFjZVBhdHRlcm5Qcm90b2NvbCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xuXG4gICAgICAgICAgICAvLyBVUkxzIHN0YXJ0aW5nIHdpdGggXCJ3d3cuXCIgKGlnbm9yaW5nIC8vIGJlZm9yZSBpdCkuXG4gICAgICAgICAgICByZXBsYWNlUGF0dGVybldXVyA9IC8oXnxbXlxcL10pKHd3d1xcLltcXFNdKyhcXGJ8JCkpL2dpbTtcbiAgICAgICAgICAgIHJlcGxhY2VkVGV4dCA9IHJlcGxhY2VkVGV4dC5yZXBsYWNlKHJlcGxhY2VQYXR0ZXJuV1dXLCAnJDE8YSBocmVmPVwiaHR0cDovLyQyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDI8L2E+Jyk7XG5cbiAgICAgICAgICAgIC8vIENoYW5nZSBlbWFpbCBhZGRyZXNzZXMgdG8gbWFpbHRvOjogbGlua3MuXG4gICAgICAgICAgICByZXBsYWNlUGF0dGVybk1haWxUbyA9IC8oKFthLXpBLVowLTlcXC1cXF9cXC5dKStAW2EtekEtWlxcX10rPyhcXC5bYS16QS1aXXsyLDZ9KSspL2dpbTtcbiAgICAgICAgICAgIHJlcGxhY2VkVGV4dCA9IHJlcGxhY2VkVGV4dC5yZXBsYWNlKHJlcGxhY2VQYXR0ZXJuTWFpbFRvLCAnPGEgaHJlZj1cIm1haWx0bzokMVwiPiQxPC9hPicpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZWRUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gXG59XG4iXX0=