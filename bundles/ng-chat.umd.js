(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/forms'), require('@angular/common/http'), require('@angular/platform-browser'), require('rxjs/operators'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ng-chat', ['exports', '@angular/common', '@angular/forms', '@angular/common/http', '@angular/platform-browser', 'rxjs/operators', '@angular/core'], factory) :
    (factory((global['ng-chat'] = {}),global.ng.common,global.ng.forms,global.ng.common.http,global.ng.platformBrowser,global.rxjs.operators,global.ng.core));
}(this, (function (exports,common,forms,http,platformBrowser,operators,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ ChatAdapter = /** @class */ (function () {
        function ChatAdapter() {
            // ### Abstract adapter methods ###
            // Event handlers
            this.friendsListChangedHandler = function (participantsResponse) { };
            this.messageReceivedHandler = function (participant, message) { };
        }
        // ### Adapter/Chat income/ingress events ###
        // ### Adapter/Chat income/ingress events ###
        /**
         * @param {?} participantsResponse
         * @return {?}
         */
        ChatAdapter.prototype.onFriendsListChanged =
            // ### Adapter/Chat income/ingress events ###
            /**
             * @param {?} participantsResponse
             * @return {?}
             */
            function (participantsResponse) {
                this.friendsListChangedHandler(participantsResponse);
            };
        /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
        ChatAdapter.prototype.onMessageReceived = /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
            function (participant, message) {
                this.messageReceivedHandler(participant, message);
            };
        return ChatAdapter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var MessageType = {
        Text: 1,
        File: 2,
    };
    MessageType[MessageType.Text] = 'Text';
    MessageType[MessageType.File] = 'File';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var Message = /** @class */ (function () {
        function Message() {
            this.type = MessageType.Text;
        }
        return Message;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ChatParticipantStatus = {
        Online: 0,
        Busy: 1,
        Away: 2,
        Offline: 3,
    };
    ChatParticipantStatus[ChatParticipantStatus.Online] = 'Online';
    ChatParticipantStatus[ChatParticipantStatus.Busy] = 'Busy';
    ChatParticipantStatus[ChatParticipantStatus.Away] = 'Away';
    ChatParticipantStatus[ChatParticipantStatus.Offline] = 'Offline';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ChatParticipantType = {
        User: 0,
        Group: 1,
    };
    ChatParticipantType[ChatParticipantType.User] = 'User';
    ChatParticipantType[ChatParticipantType.Group] = 'Group';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var User = /** @class */ (function () {
        function User() {
            this.participantType = ChatParticipantType.User;
        }
        return User;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ParticipantResponse = /** @class */ (function () {
        function ParticipantResponse() {
        }
        return ParticipantResponse;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ParticipantMetadata = /** @class */ (function () {
        function ParticipantMetadata() {
            this.totalUnreadMessages = 0;
        }
        return ParticipantMetadata;
    }());

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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * \@description Chat Adapter decorator class that adds pagination to load the history of messagesr.
     * You will need an existing \@see ChatAdapter implementation
     * @abstract
     */
    var /**
     * \@description Chat Adapter decorator class that adds pagination to load the history of messagesr.
     * You will need an existing \@see ChatAdapter implementation
     * @abstract
     */ PagedHistoryChatAdapter = /** @class */ (function (_super) {
        __extends(PagedHistoryChatAdapter, _super);
        function PagedHistoryChatAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PagedHistoryChatAdapter;
    }(ChatAdapter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var Theme = {
        Custom: 'custom-theme',
        Light: 'light-theme',
        Dark: 'dark-theme',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    // Poached from: https://github.com/Steve-Fenton/TypeScriptUtilities
    // @dynamic
    var 
    // Poached from: https://github.com/Steve-Fenton/TypeScriptUtilities
    // @dynamic
    Guid = /** @class */ (function () {
        function Guid() {
        }
        /**
         * @return {?}
         */
        Guid.newGuid = /**
         * @return {?}
         */
            function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    /** @type {?} */
                    var r = Math.random() * 16 | 0;
                    /** @type {?} */
                    var v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
        return Guid;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var Group = /** @class */ (function () {
        function Group(participants) {
            this.id = Guid.newGuid();
            this.participantType = ChatParticipantType.Group;
            this.chattingTo = participants;
            this.status = ChatParticipantStatus.Online;
            // TODO: Add some customization for this in future releases
            this.displayName = participants.map(function (p) { return p.displayName; }).sort(function (first, second) { return second > first ? -1 : 1; }).join(", ");
        }
        return Group;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ScrollDirection = {
        Top: 0,
        Bottom: 1,
    };
    ScrollDirection[ScrollDirection.Top] = 'Top';
    ScrollDirection[ScrollDirection.Bottom] = 'Bottom';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgChat = /** @class */ (function () {
        function NgChat(sanitizer, _httpClient) {
            this.sanitizer = sanitizer;
            this._httpClient = _httpClient;
            // Exposes enums for the ng-template
            this.ChatParticipantType = ChatParticipantType;
            this.ChatParticipantStatus = ChatParticipantStatus;
            this.MessageType = MessageType;
            this.isCollapsed = false;
            this.maximizeWindowOnNewMessage = true;
            this.pollFriendsList = false;
            this.pollingInterval = 5000;
            this.historyEnabled = true;
            this.emojisEnabled = true;
            this.linkfyEnabled = true;
            this.audioEnabled = true;
            this.searchEnabled = true;
            this.audioSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.wav';
            this.persistWindowsState = true;
            this.title = "Friends";
            this.messagePlaceholder = "Type a message";
            this.searchPlaceholder = "Search";
            this.browserNotificationsEnabled = true;
            this.browserNotificationIconSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.png';
            this.browserNotificationTitle = "New message from";
            this.historyPageSize = 10;
            this.hideFriendsList = false;
            this.hideFriendsListOnUnsupportedViewport = true;
            this.theme = Theme.Light;
            this.messageDatePipeFormat = "short";
            this.showMessageDate = true;
            this.isViewportOnMobileEnabled = false;
            this.onParticipantClicked = new core.EventEmitter();
            this.onParticipantChatOpened = new core.EventEmitter();
            this.onParticipantChatClosed = new core.EventEmitter();
            this.onMessagesSeen = new core.EventEmitter();
            this.browserNotificationsBootstrapped = false;
            this.hasPagedHistory = false;
            // Don't want to add this as a setting to simplify usage. Previous placeholder and title settings available to be used, or use full Localization object.
            this.statusDescription = {
                online: 'Online',
                busy: 'Busy',
                away: 'Away',
                offline: 'Offline'
            };
            this.searchInput = '';
            this.participantsInteractedWith = [];
            this.selectedUsersFromFriendsList = [];
            // Defines the size of each opened window to calculate how many windows can be opened on the viewport at the same time.
            this.windowSizeFactor = 320;
            // Total width size of the friends list section
            this.friendsListWidth = 262;
            // Set to true if there is no space to display at least one chat window and 'hideFriendsListOnUnsupportedViewport' is true
            this.unsupportedViewport = false;
            // File upload state
            this.fileUploadersInUse = []; // Id bucket of uploaders in use
            this.windows = [];
            this.isBootstrapped = false;
        }
        /**
         * @param {?} currentWindow
         * @return {?}
         */
        NgChat.prototype.defaultWindowOptions = /**
         * @param {?} currentWindow
         * @return {?}
         */
            function (currentWindow) {
                var _this = this;
                if (this.groupAdapter && currentWindow.participant.participantType == ChatParticipantType.User) {
                    return [{
                            isActive: false,
                            action: function (chattingWindow) {
                                _this.selectedUsersFromFriendsList = _this.selectedUsersFromFriendsList.concat(( /** @type {?} */(chattingWindow.participant)));
                            },
                            validateContext: function (participant) {
                                return participant.participantType == ChatParticipantType.User;
                            },
                            displayLabel: 'Add People' // TODO: Localize this
                        }];
                }
                return [];
            };
        Object.defineProperty(NgChat.prototype, "localStorageKey", {
            get: /**
             * @return {?}
             */ function () {
                return "ng-chat-users-" + this.userId; // Appending the user id so the state is unique per user in a computer.   
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgChat.prototype, "filteredParticipants", {
            get: /**
             * @return {?}
             */ function () {
                var _this = this;
                if (this.searchInput.length > 0) {
                    // Searches in the friend list by the inputted search string
                    return this.participants.filter(function (x) { return x.displayName.toUpperCase().includes(_this.searchInput.toUpperCase()); });
                }
                return this.participants;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgChat.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.bootstrapChat();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgChat.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.viewPortTotalArea = event.target.innerWidth;
                this.NormalizeWindows();
            };
        // Checks if there are more opened windows than the view port can display
        // Checks if there are more opened windows than the view port can display
        /**
         * @return {?}
         */
        NgChat.prototype.NormalizeWindows =
            // Checks if there are more opened windows than the view port can display
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var maxSupportedOpenedWindows = Math.floor((this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0)) / this.windowSizeFactor);
                /** @type {?} */
                var difference = this.windows.length - maxSupportedOpenedWindows;
                if (difference >= 0) {
                    this.windows.splice(this.windows.length - difference);
                }
                this.updateWindowsState(this.windows);
                // Viewport should have space for at least one chat window but should show in mobile if option is enabled.
                this.unsupportedViewport = this.isViewportOnMobileEnabled ? false : this.hideFriendsListOnUnsupportedViewport && maxSupportedOpenedWindows < 1;
            };
        // Initializes the chat plugin and the messaging adapter
        // Initializes the chat plugin and the messaging adapter
        /**
         * @return {?}
         */
        NgChat.prototype.bootstrapChat =
            // Initializes the chat plugin and the messaging adapter
            /**
             * @return {?}
             */
            function () {
                var _this = this;
                /** @type {?} */
                var initializationException = null;
                if (this.adapter != null && this.userId != null) {
                    try {
                        this.viewPortTotalArea = window.innerWidth;
                        this.initializeTheme();
                        this.initializeDefaultText();
                        this.initializeBrowserNotifications();
                        // Binding event listeners
                        this.adapter.messageReceivedHandler = function (participant, msg) { return _this.onMessageReceived(participant, msg); };
                        this.adapter.friendsListChangedHandler = function (participantsResponse) { return _this.onFriendsListChanged(participantsResponse); };
                        // Loading current users list
                        if (this.pollFriendsList) {
                            // Setting a long poll interval to update the friends list
                            this.fetchFriendsList(true);
                            setInterval(function () { return _this.fetchFriendsList(false); }, this.pollingInterval);
                        }
                        else {
                            // Since polling was disabled, a friends list update mechanism will have to be implemented in the ChatAdapter.
                            this.fetchFriendsList(true);
                        }
                        this.bufferAudioFile();
                        this.hasPagedHistory = this.adapter instanceof PagedHistoryChatAdapter;
                        if (this.fileUploadUrl && this.fileUploadUrl !== "") {
                            this.fileUploadAdapter = new DefaultFileUploadAdapter(this.fileUploadUrl, this._httpClient);
                        }
                        this.isBootstrapped = true;
                    }
                    catch (ex) {
                        initializationException = ex;
                    }
                }
                if (!this.isBootstrapped) {
                    console.error("ng-chat component couldn't be bootstrapped.");
                    if (this.userId == null) {
                        console.error("ng-chat can't be initialized without an user id. Please make sure you've provided an userId as a parameter of the ng-chat component.");
                    }
                    if (this.adapter == null) {
                        console.error("ng-chat can't be bootstrapped without a ChatAdapter. Please make sure you've provided a ChatAdapter implementation as a parameter of the ng-chat component.");
                    }
                    if (initializationException) {
                        console.error("An exception has occurred while initializing ng-chat. Details: " + initializationException.message);
                        console.error(initializationException);
                    }
                }
            };
        // Initializes browser notifications
        // Initializes browser notifications
        /**
         * @return {?}
         */
        NgChat.prototype.initializeBrowserNotifications =
            // Initializes browser notifications
            /**
             * @return {?}
             */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(this.browserNotificationsEnabled && ("Notification" in window)))
                                    return [3 /*break*/, 2];
                                return [4 /*yield*/, Notification.requestPermission()];
                            case 1:
                                if (_a.sent()) {
                                    this.browserNotificationsBootstrapped = true;
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
        // Initializes default text
        // Initializes default text
        /**
         * @return {?}
         */
        NgChat.prototype.initializeDefaultText =
            // Initializes default text
            /**
             * @return {?}
             */
            function () {
                if (!this.localization) {
                    this.localization = {
                        messagePlaceholder: this.messagePlaceholder,
                        searchPlaceholder: this.searchPlaceholder,
                        title: this.title,
                        statusDescription: this.statusDescription,
                        browserNotificationTitle: this.browserNotificationTitle,
                        loadMessageHistoryPlaceholder: "Load older messages"
                    };
                }
            };
        /**
         * @return {?}
         */
        NgChat.prototype.initializeTheme = /**
         * @return {?}
         */
            function () {
                if (this.customTheme) {
                    this.theme = Theme.Custom;
                }
                else if (this.theme != Theme.Light && this.theme != Theme.Dark) {
                    // TODO: Use es2017 in future with Object.values(Theme).includes(this.theme) to do this check
                    throw new Error("Invalid theme configuration for ng-chat. \"" + this.theme + "\" is not a valid theme value.");
                }
            };
        // Sends a request to load the friends list
        // Sends a request to load the friends list
        /**
         * @param {?} isBootstrapping
         * @return {?}
         */
        NgChat.prototype.fetchFriendsList =
            // Sends a request to load the friends list
            /**
             * @param {?} isBootstrapping
             * @return {?}
             */
            function (isBootstrapping) {
                var _this = this;
                this.adapter.listFriends()
                    .pipe(operators.map(function (participantsResponse) {
                    _this.participantsResponse = participantsResponse;
                    _this.participants = participantsResponse.map(function (response) {
                        return response.participant;
                    });
                })).subscribe(function () {
                    if (isBootstrapping) {
                        _this.restoreWindowsState();
                    }
                });
            };
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.fetchMessageHistory = /**
         * @param {?} window
         * @return {?}
         */
            function (window) {
                var _this = this;
                // Not ideal but will keep this until we decide if we are shipping pagination with the default adapter
                if (this.adapter instanceof PagedHistoryChatAdapter) {
                    window.isLoadingHistory = true;
                    this.adapter.getMessageHistoryByPage(window.participant.id, this.historyPageSize, ++window.historyPage)
                        .pipe(operators.map(function (result) {
                        result.forEach(function (message) { return _this.assertMessageType(message); });
                        window.messages = result.concat(window.messages);
                        window.isLoadingHistory = false;
                        /** @type {?} */
                        var direction = (window.historyPage == 1) ? ScrollDirection.Bottom : ScrollDirection.Top;
                        window.hasMoreMessages = result.length == _this.historyPageSize;
                        setTimeout(function () { return _this.onFetchMessageHistoryLoaded(result, window, direction, true); });
                    })).subscribe();
                }
                else {
                    this.adapter.getMessageHistory(window.participant.id)
                        .pipe(operators.map(function (result) {
                        result.forEach(function (message) { return _this.assertMessageType(message); });
                        window.messages = result.concat(window.messages);
                        window.isLoadingHistory = false;
                        setTimeout(function () { return _this.onFetchMessageHistoryLoaded(result, window, ScrollDirection.Bottom); });
                    })).subscribe();
                }
            };
        /**
         * @param {?} messages
         * @param {?} window
         * @param {?} direction
         * @param {?=} forceMarkMessagesAsSeen
         * @return {?}
         */
        NgChat.prototype.onFetchMessageHistoryLoaded = /**
         * @param {?} messages
         * @param {?} window
         * @param {?} direction
         * @param {?=} forceMarkMessagesAsSeen
         * @return {?}
         */
            function (messages, window, direction, forceMarkMessagesAsSeen) {
                if (forceMarkMessagesAsSeen === void 0) {
                    forceMarkMessagesAsSeen = false;
                }
                this.scrollChatWindow(window, direction);
                if (window.hasFocus || forceMarkMessagesAsSeen) {
                    /** @type {?} */
                    var unseenMessages = messages.filter(function (m) { return !m.dateSeen; });
                    this.markMessagesAsRead(unseenMessages);
                    this.onMessagesSeen.emit(unseenMessages);
                }
            };
        // Updates the friends list via the event handler
        // Updates the friends list via the event handler
        /**
         * @param {?} participantsResponse
         * @return {?}
         */
        NgChat.prototype.onFriendsListChanged =
            // Updates the friends list via the event handler
            /**
             * @param {?} participantsResponse
             * @return {?}
             */
            function (participantsResponse) {
                if (participantsResponse) {
                    this.participantsResponse = participantsResponse;
                    this.participants = participantsResponse.map(function (response) {
                        return response.participant;
                    });
                    this.participantsInteractedWith = [];
                }
            };
        // Handles received messages by the adapter
        // Handles received messages by the adapter
        /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
        NgChat.prototype.onMessageReceived =
            // Handles received messages by the adapter
            /**
             * @param {?} participant
             * @param {?} message
             * @return {?}
             */
            function (participant, message) {
                if (participant && message) {
                    /** @type {?} */
                    var chatWindow = this.openChatWindow(participant);
                    this.assertMessageType(message);
                    if (!chatWindow[1] || !this.historyEnabled) {
                        chatWindow[0].messages.push(message);
                        this.scrollChatWindow(chatWindow[0], ScrollDirection.Bottom);
                        if (chatWindow[0].hasFocus) {
                            this.markMessagesAsRead([message]);
                            this.onMessagesSeen.emit([message]);
                        }
                    }
                    this.emitMessageSound(chatWindow[0]);
                    // Github issue #58 
                    // Do not push browser notifications with message content for privacy purposes if the 'maximizeWindowOnNewMessage' setting is off and this is a new chat window.
                    if (this.maximizeWindowOnNewMessage || (!chatWindow[1] && !chatWindow[0].isCollapsed)) {
                        // Some messages are not pushed because they are loaded by fetching the history hence why we supply the message here
                        this.emitBrowserNotification(chatWindow[0], message);
                    }
                }
            };
        // Opens a new chat whindow. Takes care of available viewport
        // Works for opening a chat window for an user or for a group
        // Returns => [Window: Window object reference, boolean: Indicates if this window is a new chat window]
        // Opens a new chat whindow. Takes care of available viewport
        // Works for opening a chat window for an user or for a group
        // Returns => [Window: Window object reference, boolean: Indicates if this window is a new chat window]
        /**
         * @param {?} participant
         * @param {?=} focusOnNewWindow
         * @param {?=} invokedByUserClick
         * @return {?}
         */
        NgChat.prototype.openChatWindow =
            // Opens a new chat whindow. Takes care of available viewport
            // Works for opening a chat window for an user or for a group
            // Returns => [Window: Window object reference, boolean: Indicates if this window is a new chat window]
            /**
             * @param {?} participant
             * @param {?=} focusOnNewWindow
             * @param {?=} invokedByUserClick
             * @return {?}
             */
            function (participant, focusOnNewWindow, invokedByUserClick) {
                if (focusOnNewWindow === void 0) {
                    focusOnNewWindow = false;
                }
                if (invokedByUserClick === void 0) {
                    invokedByUserClick = false;
                }
                // Is this window opened?
                /** @type {?} */
                var openedWindow = this.windows.find(function (x) { return x.participant.id == participant.id; });
                if (!openedWindow) {
                    if (invokedByUserClick) {
                        this.onParticipantClicked.emit(participant);
                    }
                    // Refer to issue #58 on Github 
                    /** @type {?} */
                    var collapseWindow = invokedByUserClick ? false : !this.maximizeWindowOnNewMessage;
                    /** @type {?} */
                    var newChatWindow = new Window(participant, this.historyEnabled, collapseWindow);
                    // Loads the chat history via an RxJs Observable
                    if (this.historyEnabled) {
                        this.fetchMessageHistory(newChatWindow);
                    }
                    this.windows.unshift(newChatWindow);
                    // Is there enough space left in the view port ? but should be displayed in mobile if option is enabled
                    if (!this.isViewportOnMobileEnabled) {
                        if (this.windows.length * this.windowSizeFactor >= this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0)) {
                            this.windows.pop();
                        }
                    }
                    this.updateWindowsState(this.windows);
                    if (focusOnNewWindow && !collapseWindow) {
                        this.focusOnWindow(newChatWindow);
                    }
                    this.participantsInteractedWith.push(participant);
                    this.onParticipantChatOpened.emit(participant);
                    return [newChatWindow, true];
                }
                else {
                    // Returns the existing chat window     
                    return [openedWindow, false];
                }
            };
        // Focus on the input element of the supplied window
        // Focus on the input element of the supplied window
        /**
         * @param {?} window
         * @param {?=} callback
         * @return {?}
         */
        NgChat.prototype.focusOnWindow =
            // Focus on the input element of the supplied window
            /**
             * @param {?} window
             * @param {?=} callback
             * @return {?}
             */
            function (window, callback) {
                var _this = this;
                if (callback === void 0) {
                    callback = function () { };
                }
                /** @type {?} */
                var windowIndex = this.windows.indexOf(window);
                if (windowIndex >= 0) {
                    setTimeout(function () {
                        if (_this.chatWindowInputs) {
                            /** @type {?} */
                            var messageInputToFocus = _this.chatWindowInputs.toArray()[windowIndex];
                            messageInputToFocus.nativeElement.focus();
                        }
                        callback();
                    });
                }
            };
        // Scrolls a chat window message flow to the bottom
        // Scrolls a chat window message flow to the bottom
        /**
         * @param {?} window
         * @param {?} direction
         * @return {?}
         */
        NgChat.prototype.scrollChatWindow =
            // Scrolls a chat window message flow to the bottom
            /**
             * @param {?} window
             * @param {?} direction
             * @return {?}
             */
            function (window, direction) {
                var _this = this;
                if (!window.isCollapsed) {
                    /** @type {?} */
                    var windowIndex_1 = this.windows.indexOf(window);
                    setTimeout(function () {
                        if (_this.chatMessageClusters) {
                            /** @type {?} */
                            var targetWindow = _this.chatMessageClusters.toArray()[windowIndex_1];
                            if (targetWindow) {
                                /** @type {?} */
                                var element = _this.chatMessageClusters.toArray()[windowIndex_1].nativeElement;
                                /** @type {?} */
                                var position = (direction === ScrollDirection.Top) ? 0 : element.scrollHeight;
                                element.scrollTop = position;
                            }
                        }
                    });
                }
            };
        // Marks all messages provided as read with the current time.
        // Marks all messages provided as read with the current time.
        /**
         * @param {?} messages
         * @return {?}
         */
        NgChat.prototype.markMessagesAsRead =
            // Marks all messages provided as read with the current time.
            /**
             * @param {?} messages
             * @return {?}
             */
            function (messages) {
                /** @type {?} */
                var currentDate = new Date();
                messages.forEach(function (msg) {
                    msg.dateSeen = currentDate;
                });
            };
        // Buffers audio file (For component's bootstrapping)
        // Buffers audio file (For component's bootstrapping)
        /**
         * @return {?}
         */
        NgChat.prototype.bufferAudioFile =
            // Buffers audio file (For component's bootstrapping)
            /**
             * @return {?}
             */
            function () {
                if (this.audioSource && this.audioSource.length > 0) {
                    this.audioFile = new Audio();
                    this.audioFile.src = this.audioSource;
                    this.audioFile.load();
                }
            };
        // Emits a message notification audio if enabled after every message received
        // Emits a message notification audio if enabled after every message received
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.emitMessageSound =
            // Emits a message notification audio if enabled after every message received
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                if (this.audioEnabled && !window.hasFocus && this.audioFile) {
                    this.audioFile.play();
                }
            };
        // Emits a browser notification
        // Emits a browser notification
        /**
         * @param {?} window
         * @param {?} message
         * @return {?}
         */
        NgChat.prototype.emitBrowserNotification =
            // Emits a browser notification
            /**
             * @param {?} window
             * @param {?} message
             * @return {?}
             */
            function (window, message) {
                if (this.browserNotificationsBootstrapped && !window.hasFocus && message) {
                    /** @type {?} */
                    var notification_1 = new Notification(this.localization.browserNotificationTitle + " " + window.participant.displayName, {
                        'body': message.message,
                        'icon': this.browserNotificationIconSource
                    });
                    setTimeout(function () {
                        notification_1.close();
                    }, message.message.length <= 50 ? 5000 : 7000); // More time to read longer messages
                }
            };
        // Saves current windows state into local storage if persistence is enabled
        // Saves current windows state into local storage if persistence is enabled
        /**
         * @param {?} windows
         * @return {?}
         */
        NgChat.prototype.updateWindowsState =
            // Saves current windows state into local storage if persistence is enabled
            /**
             * @param {?} windows
             * @return {?}
             */
            function (windows) {
                if (this.persistWindowsState) {
                    /** @type {?} */
                    var participantIds = windows.map(function (w) {
                        return w.participant.id;
                    });
                    localStorage.setItem(this.localStorageKey, JSON.stringify(participantIds));
                }
            };
        /**
         * @return {?}
         */
        NgChat.prototype.restoreWindowsState = /**
         * @return {?}
         */
            function () {
                var _this = this;
                try {
                    if (this.persistWindowsState) {
                        /** @type {?} */
                        var stringfiedParticipantIds = localStorage.getItem(this.localStorageKey);
                        if (stringfiedParticipantIds && stringfiedParticipantIds.length > 0) {
                            /** @type {?} */
                            var participantIds_1 = ( /** @type {?} */(JSON.parse(stringfiedParticipantIds)));
                            /** @type {?} */
                            var participantsToRestore = this.participants.filter(function (u) { return participantIds_1.indexOf(u.id) >= 0; });
                            participantsToRestore.forEach(function (participant) {
                                _this.openChatWindow(participant);
                            });
                        }
                    }
                }
                catch (ex) {
                    console.error("An error occurred while restoring ng-chat windows state. Details: " + ex);
                }
            };
        // Gets closest open window if any. Most recent opened has priority (Right)
        // Gets closest open window if any. Most recent opened has priority (Right)
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.getClosestWindow =
            // Gets closest open window if any. Most recent opened has priority (Right)
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                /** @type {?} */
                var index = this.windows.indexOf(window);
                if (index > 0) {
                    return this.windows[index - 1];
                }
                else if (index == 0 && this.windows.length > 1) {
                    return this.windows[index + 1];
                }
            };
        /**
         * @param {?} message
         * @return {?}
         */
        NgChat.prototype.assertMessageType = /**
         * @param {?} message
         * @return {?}
         */
            function (message) {
                // Always fallback to "Text" messages to avoid rendenring issues
                if (!message.type) {
                    message.type = MessageType.Text;
                }
            };
        /**
         * @param {?} totalUnreadMessages
         * @return {?}
         */
        NgChat.prototype.formatUnreadMessagesTotal = /**
         * @param {?} totalUnreadMessages
         * @return {?}
         */
            function (totalUnreadMessages) {
                if (totalUnreadMessages > 0) {
                    if (totalUnreadMessages > 99)
                        return "99+";
                    else
                        return String(totalUnreadMessages);
                }
                // Empty fallback.
                return "";
            };
        // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future 
        // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future 
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.unreadMessagesTotal =
            // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future 
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                var _this = this;
                /** @type {?} */
                var totalUnreadMessages = 0;
                if (window) {
                    totalUnreadMessages = window.messages.filter(function (x) { return x.fromId != _this.userId && !x.dateSeen; }).length;
                }
                return this.formatUnreadMessagesTotal(totalUnreadMessages);
            };
        /**
         * @param {?} participant
         * @return {?}
         */
        NgChat.prototype.unreadMessagesTotalByParticipant = /**
         * @param {?} participant
         * @return {?}
         */
            function (participant) {
                var _this = this;
                /** @type {?} */
                var openedWindow = this.windows.find(function (x) { return x.participant.id == participant.id; });
                if (openedWindow) {
                    return this.unreadMessagesTotal(openedWindow);
                }
                else {
                    /** @type {?} */
                    var totalUnreadMessages = this.participantsResponse
                        .filter(function (x) { return x.participant.id == participant.id && !_this.participantsInteractedWith.find(function (u) { return u.id == participant.id; }) && x.metadata && x.metadata.totalUnreadMessages > 0; })
                        .map(function (participantResponse) {
                        return participantResponse.metadata.totalUnreadMessages;
                    })[0];
                    return this.formatUnreadMessagesTotal(totalUnreadMessages);
                }
            };
        /*  Monitors pressed keys on a chat window
            - Dispatches a message when the ENTER key is pressed
            - Tabs between windows on TAB or SHIFT + TAB
            - Closes the current focused window on ESC
        */
        /*  Monitors pressed keys on a chat window
                - Dispatches a message when the ENTER key is pressed
                - Tabs between windows on TAB or SHIFT + TAB
                - Closes the current focused window on ESC
            */
        /**
         * @param {?} event
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.onChatInputTyped = /*  Monitors pressed keys on a chat window
                - Dispatches a message when the ENTER key is pressed
                - Tabs between windows on TAB or SHIFT + TAB
                - Closes the current focused window on ESC
            */
            /**
             * @param {?} event
             * @param {?} window
             * @return {?}
             */
            function (event, window) {
                var _this = this;
                switch (event.keyCode) {
                    case 13:
                        if (window.newMessage && window.newMessage.trim() != "") {
                            /** @type {?} */
                            var message = new Message();
                            message.fromId = this.userId;
                            message.toId = window.participant.id;
                            message.message = window.newMessage;
                            message.dateSent = new Date();
                            window.messages.push(message);
                            this.adapter.sendMessage(message);
                            window.newMessage = ""; // Resets the new message input
                            this.scrollChatWindow(window, ScrollDirection.Bottom);
                        }
                        break;
                    case 9:
                        event.preventDefault();
                        /** @type {?} */
                        var currentWindowIndex = this.windows.indexOf(window);
                        /** @type {?} */
                        var messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex + (event.shiftKey ? 1 : -1)];
                        if (!messageInputToFocus) {
                            // Edge windows, go to start or end
                            messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex > 0 ? 0 : this.chatWindowInputs.length - 1];
                        }
                        messageInputToFocus.nativeElement.focus();
                        break;
                    case 27:
                        /** @type {?} */
                        var closestWindow = this.getClosestWindow(window);
                        if (closestWindow) {
                            this.focusOnWindow(closestWindow, function () { _this.onCloseChatWindow(window); });
                        }
                        else {
                            this.onCloseChatWindow(window);
                        }
                }
            };
        // Closes a chat window via the close 'X' button
        // Closes a chat window via the close 'X' button
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.onCloseChatWindow =
            // Closes a chat window via the close 'X' button
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                /** @type {?} */
                var index = this.windows.indexOf(window);
                this.windows.splice(index, 1);
                this.updateWindowsState(this.windows);
                this.onParticipantChatClosed.emit(window.participant);
            };
        // Toggle friends list visibility
        // Toggle friends list visibility
        /**
         * @param {?} event
         * @return {?}
         */
        NgChat.prototype.onChatTitleClicked =
            // Toggle friends list visibility
            /**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                this.isCollapsed = !this.isCollapsed;
            };
        // Toggles a chat window visibility between maximized/minimized
        // Toggles a chat window visibility between maximized/minimized
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.onChatWindowClicked =
            // Toggles a chat window visibility between maximized/minimized
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                window.isCollapsed = !window.isCollapsed;
                this.scrollChatWindow(window, ScrollDirection.Bottom);
            };
        // Asserts if a user avatar is visible in a chat cluster
        // Asserts if a user avatar is visible in a chat cluster
        /**
         * @param {?} window
         * @param {?} message
         * @param {?} index
         * @return {?}
         */
        NgChat.prototype.isAvatarVisible =
            // Asserts if a user avatar is visible in a chat cluster
            /**
             * @param {?} window
             * @param {?} message
             * @param {?} index
             * @return {?}
             */
            function (window, message, index) {
                if (message.fromId != this.userId) {
                    if (index == 0) {
                        return true; // First message, good to show the thumbnail
                    }
                    else {
                        // Check if the previous message belongs to the same user, if it belongs there is no need to show the avatar again to form the message cluster
                        if (window.messages[index - 1].fromId != message.fromId) {
                            return true;
                        }
                    }
                }
                return false;
            };
        /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
        NgChat.prototype.getChatWindowAvatar = /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
            function (participant, message) {
                if (participant.participantType == ChatParticipantType.User) {
                    return participant.avatar;
                }
                else if (participant.participantType == ChatParticipantType.Group) {
                    /** @type {?} */
                    var group = ( /** @type {?} */(participant));
                    /** @type {?} */
                    var userIndex = group.chattingTo.findIndex(function (x) { return x.id == message.fromId; });
                    return group.chattingTo[userIndex >= 0 ? userIndex : 0].avatar;
                }
                return null;
            };
        // Toggles a window focus on the focus/blur of a 'newMessage' input
        // Toggles a window focus on the focus/blur of a 'newMessage' input
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.toggleWindowFocus =
            // Toggles a window focus on the focus/blur of a 'newMessage' input
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                var _this = this;
                window.hasFocus = !window.hasFocus;
                if (window.hasFocus) {
                    /** @type {?} */
                    var unreadMessages = window.messages
                        .filter(function (message) {
                        return message.dateSeen == null
                            && (message.toId == _this.userId || window.participant.participantType === ChatParticipantType.Group);
                    });
                    if (unreadMessages && unreadMessages.length > 0) {
                        this.markMessagesAsRead(unreadMessages);
                        this.onMessagesSeen.emit(unreadMessages);
                    }
                }
            };
        // [Localized] Returns the status descriptive title
        // [Localized] Returns the status descriptive title
        /**
         * @param {?} status
         * @return {?}
         */
        NgChat.prototype.getStatusTitle =
            // [Localized] Returns the status descriptive title
            /**
             * @param {?} status
             * @return {?}
             */
            function (status) {
                /** @type {?} */
                var currentStatus = status.toString().toLowerCase();
                return this.localization.statusDescription[currentStatus];
            };
        /**
         * @param {?} user
         * @return {?}
         */
        NgChat.prototype.triggerOpenChatWindow = /**
         * @param {?} user
         * @return {?}
         */
            function (user) {
                if (user) {
                    this.openChatWindow(user);
                }
            };
        /**
         * @param {?} userId
         * @return {?}
         */
        NgChat.prototype.triggerCloseChatWindow = /**
         * @param {?} userId
         * @return {?}
         */
            function (userId) {
                /** @type {?} */
                var openedWindow = this.windows.find(function (x) { return x.participant.id == userId; });
                if (openedWindow) {
                    this.onCloseChatWindow(openedWindow);
                }
            };
        /**
         * @param {?} userId
         * @return {?}
         */
        NgChat.prototype.triggerToggleChatWindowVisibility = /**
         * @param {?} userId
         * @return {?}
         */
            function (userId) {
                /** @type {?} */
                var openedWindow = this.windows.find(function (x) { return x.participant.id == userId; });
                if (openedWindow) {
                    this.onChatWindowClicked(openedWindow);
                }
            };
        // Generates a unique file uploader id for each participant
        // Generates a unique file uploader id for each participant
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.getUniqueFileUploadInstanceId =
            // Generates a unique file uploader id for each participant
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                if (window && window.participant) {
                    return "ng-chat-file-upload-" + window.participant.id;
                }
                return 'ng-chat-file-upload';
            };
        // Triggers native file upload for file selection from the user
        // Triggers native file upload for file selection from the user
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.triggerNativeFileUpload =
            // Triggers native file upload for file selection from the user
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                if (window) {
                    /** @type {?} */
                    var fileUploadInstanceId_1 = this.getUniqueFileUploadInstanceId(window);
                    /** @type {?} */
                    var uploadElementRef = this.nativeFileInputs.filter(function (x) { return x.nativeElement.id === fileUploadInstanceId_1; })[0];
                    if (uploadElementRef)
                        uploadElementRef.nativeElement.click();
                }
            };
        /**
         * @param {?} fileUploadInstanceId
         * @return {?}
         */
        NgChat.prototype.clearInUseFileUploader = /**
         * @param {?} fileUploadInstanceId
         * @return {?}
         */
            function (fileUploadInstanceId) {
                /** @type {?} */
                var uploaderInstanceIdIndex = this.fileUploadersInUse.indexOf(fileUploadInstanceId);
                if (uploaderInstanceIdIndex > -1) {
                    this.fileUploadersInUse.splice(uploaderInstanceIdIndex, 1);
                }
            };
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.isUploadingFile = /**
         * @param {?} window
         * @return {?}
         */
            function (window) {
                /** @type {?} */
                var fileUploadInstanceId = this.getUniqueFileUploadInstanceId(window);
                return this.fileUploadersInUse.indexOf(fileUploadInstanceId) > -1;
            };
        // Handles file selection and uploads the selected file using the file upload adapter
        // Handles file selection and uploads the selected file using the file upload adapter
        /**
         * @param {?} window
         * @return {?}
         */
        NgChat.prototype.onFileChosen =
            // Handles file selection and uploads the selected file using the file upload adapter
            /**
             * @param {?} window
             * @return {?}
             */
            function (window) {
                var _this = this;
                /** @type {?} */
                var fileUploadInstanceId = this.getUniqueFileUploadInstanceId(window);
                /** @type {?} */
                var uploadElementRef = this.nativeFileInputs.filter(function (x) { return x.nativeElement.id === fileUploadInstanceId; })[0];
                if (uploadElementRef) {
                    /** @type {?} */
                    var file = uploadElementRef.nativeElement.files[0];
                    this.fileUploadersInUse.push(fileUploadInstanceId);
                    this.fileUploadAdapter.uploadFile(file, window.participant.id)
                        .subscribe(function (fileMessage) {
                        _this.clearInUseFileUploader(fileUploadInstanceId);
                        fileMessage.fromId = _this.userId;
                        // Push file message to current user window   
                        window.messages.push(fileMessage);
                        _this.adapter.sendMessage(fileMessage);
                        _this.scrollChatWindow(window, ScrollDirection.Bottom);
                        // Resets the file upload element
                        uploadElementRef.nativeElement.value = '';
                    }, function (error) {
                        _this.clearInUseFileUploader(fileUploadInstanceId);
                        // Resets the file upload element
                        uploadElementRef.nativeElement.value = '';
                        // TODO: Invoke a file upload adapter error here
                    });
                }
            };
        /**
         * @param {?} selectedUser
         * @param {?} isChecked
         * @return {?}
         */
        NgChat.prototype.onFriendsListCheckboxChange = /**
         * @param {?} selectedUser
         * @param {?} isChecked
         * @return {?}
         */
            function (selectedUser, isChecked) {
                if (isChecked) {
                    this.selectedUsersFromFriendsList.push(selectedUser);
                }
                else {
                    this.selectedUsersFromFriendsList.splice(this.selectedUsersFromFriendsList.indexOf(selectedUser), 1);
                }
            };
        /**
         * @return {?}
         */
        NgChat.prototype.onFriendsListActionCancelClicked = /**
         * @return {?}
         */
            function () {
                if (this.currentActiveOption) {
                    this.currentActiveOption.isActive = false;
                    this.currentActiveOption = null;
                    this.selectedUsersFromFriendsList = [];
                }
            };
        /**
         * @return {?}
         */
        NgChat.prototype.onFriendsListActionConfirmClicked = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var newGroup = new Group(this.selectedUsersFromFriendsList);
                this.openChatWindow(newGroup);
                if (this.groupAdapter) {
                    this.groupAdapter.groupCreated(newGroup);
                }
                // Canceling current state
                this.onFriendsListActionCancelClicked();
            };
        /**
         * @param {?} user
         * @return {?}
         */
        NgChat.prototype.isUserSelectedFromFriendsList = /**
         * @param {?} user
         * @return {?}
         */
            function (user) {
                return (this.selectedUsersFromFriendsList.filter(function (item) { return item.id == user.id; })).length > 0;
            };
        NgChat.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-chat',
                        template: "<link *ngIf=\"customTheme\" rel=\"stylesheet\" [href]='sanitizer.bypassSecurityTrustResourceUrl(customTheme)'>\n\n<div id=\"ng-chat\" *ngIf=\"isBootstrapped && !unsupportedViewport\" [ngClass]=\"theme\">\n    <div *ngIf=\"!hideFriendsList\" id=\"ng-chat-people\" [ngClass]=\"{'primary-outline-color': true, 'primary-background': true, 'ng-chat-people-collapsed': isCollapsed}\">\n        <a href=\"javascript:void(0);\" class=\"ng-chat-title secondary-background shadowed\" (click)=\"onChatTitleClicked($event)\">\n            <span>\n                {{localization.title}}\n            </span>\n        </a>\n        <div *ngIf=\"currentActiveOption\" class=\"ng-chat-people-actions\" (click)=\"onFriendsListActionCancelClicked()\">\n            <a href=\"javascript:void(0);\" class=\"ng-chat-people-action\">\n                <i class=\"remove-icon\"></i>\n            </a>\n            <a href=\"javascript:void(0);\" class=\"ng-chat-people-action\" (click)=\"onFriendsListActionConfirmClicked()\">\n                <i class=\"check-icon\"></i>\n            </a>\n        </div>\n        <input *ngIf=\"searchEnabled\" id=\"ng-chat-search_friend\" class=\"friends-search-bar\" type=\"search\" [placeholder]=\"localization.searchPlaceholder\" [(ngModel)]=\"searchInput\" />\n        <ul id=\"ng-chat-users\" *ngIf=\"!isCollapsed\" [ngClass]=\"{'offset-search': searchEnabled}\">\n            <li *ngFor=\"let user of filteredParticipants\">\n                <input \n                    *ngIf=\"currentActiveOption && currentActiveOption.validateContext(user)\" \n                    type=\"checkbox\" \n                    class=\"ng-chat-users-checkbox\" \n                    (change)=\"onFriendsListCheckboxChange(user, $event.target.checked)\" \n                    [checked]=\"isUserSelectedFromFriendsList(user)\"/>\n                <div [ngClass]=\"{'ng-chat-friends-list-selectable-offset': currentActiveOption, 'ng-chat-friends-list-container': true}\" (click)=\"openChatWindow(user, true, true)\">\n                    <div *ngIf=\"!user.avatar\" class=\"icon-wrapper\">\n                        <i class=\"user-icon\"></i>\n                    </div>\n                    <img *ngIf=\"user.avatar\" alt=\"\" class=\"avatar\" height=\"30\" width=\"30\"  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(user.avatar)\"/>\n                    <strong title=\"{{user.displayName}}\">{{user.displayName}}</strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': user.status == ChatParticipantStatus.Online, 'busy': user.status == ChatParticipantStatus.Busy, 'away': user.status == ChatParticipantStatus.Away, 'offline': user.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(user.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotalByParticipant(user).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotalByParticipant(user)}}</span>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <div *ngFor=\"let window of windows; let i = index\" [ngClass]=\"{'ng-chat-window': true, 'primary-outline-color': true, 'ng-chat-window-collapsed': window.isCollapsed}\" [ngStyle]=\"{'right': (!hideFriendsList ? friendsListWidth : 0) + 20 + windowSizeFactor * i + 'px'}\">\n        <ng-container *ngIf=\"window.isCollapsed\">\n            <div class=\"ng-chat-title secondary-background\">\n                <div class=\"ng-chat-title-visibility-toggle-area\" (click)=\"onChatWindowClicked(window)\">\n                    <strong title=\"{{window.participant.displayName}}\">\n                        {{window.participant.displayName}}\n                    </strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': window.participant.status == ChatParticipantStatus.Online, 'busy': window.participant.status == ChatParticipantStatus.Busy, 'away': window.participant.status == ChatParticipantStatus.Away, 'offline': window.participant.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(window.participant.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotal(window).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotal(window)}}</span>\n                </div>\n                <a href=\"javascript:void(0);\" class=\"ng-chat-close primary-text\" (click)=\"onCloseChatWindow(window)\">X</a>\n            </div>\n        </ng-container>\n        <ng-container *ngIf=\"!window.isCollapsed\">\n            <div class=\"ng-chat-title secondary-background\">\n                <div class=\"ng-chat-title-visibility-toggle-area\" (click)=\"onChatWindowClicked(window)\">\n                    <strong title=\"{{window.participant.displayName}}\">\n                        {{window.participant.displayName}}\n                    </strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': window.participant.status == ChatParticipantStatus.Online, 'busy': window.participant.status == ChatParticipantStatus.Busy, 'away': window.participant.status == ChatParticipantStatus.Away, 'offline': window.participant.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(window.participant.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotal(window).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotal(window)}}</span>    \n                </div>\n                <a href=\"javascript:void(0);\" class=\"ng-chat-close primary-text\" (click)=\"onCloseChatWindow(window)\">X</a>\n                <ng-chat-options [ngClass]=\"'ng-chat-options-container'\" [options]=\"defaultWindowOptions(window)\" [chattingTo]=\"window\" [(activeOptionTracker)]=\"currentActiveOption\"></ng-chat-options>\n            </div>\n            <div #chatMessages class=\"ng-chat-messages primary-background\">\n                <div *ngIf=\"window.isLoadingHistory\" class=\"ng-chat-loading-wrapper\">\n                    <div class=\"loader\">Loading history...</div>\n                </div>\n                <div *ngIf=\"hasPagedHistory && window.hasMoreMessages && !window.isLoadingHistory\" class=\"ng-chat-load-history\">\n                \t<a class=\"load-history-action\" (click)=\"fetchMessageHistory(window)\">{{localization.loadMessageHistoryPlaceholder}}</a>\n                </div>\n\n                <div *ngFor=\"let message of window.messages; let i = index\" [ngClass]=\"{'ng-chat-message': true, 'ng-chat-message-received': message.fromId != userId}\">\n                    <ng-container *ngIf=\"isAvatarVisible(window, message, i)\"> \n                        <div *ngIf=\"!getChatWindowAvatar(window.participant, message)\" class=\"icon-wrapper\">\n                            <i class=\"user-icon\"></i>\n                        </div>\n                        <img *ngIf=\"getChatWindowAvatar(window.participant, message)\" alt=\"\" class=\"avatar\" height=\"30\" width=\"30\" [src]=\"sanitizer.bypassSecurityTrustResourceUrl(getChatWindowAvatar(window.participant, message))\" />\n                        <span *ngIf=\"window.participant.participantType == ChatParticipantType.Group\" class=\"ng-chat-participant-name\">{{window.participant | groupMessageDisplayName:message}}</span>\n                    </ng-container>\n                    <ng-container [ngSwitch]=\"message.type\">\n                        <div *ngSwitchCase=\"MessageType.Text\" [ngClass]=\"{'sent-chat-message-container': message.fromId == userId, 'received-chat-message-container': message.fromId != userId}\">\n                            <span [innerHtml]=\"message.message | emojify:emojisEnabled | linkfy:linkfyEnabled\"></span>\n                            <span *ngIf=\"showMessageDate && message.dateSent\" class=\"message-sent-date\">{{message.dateSent | date:messageDatePipeFormat}}</span>\n                        </div>\n                        <div *ngSwitchCase=\"MessageType.File\" [ngClass]=\"{'file-message-container': true, 'received': message.fromId != userId}\">\n                            <div class=\"file-message-icon-container\">\n                                <i class=\"paperclip-icon\"></i>\n                            </div>\n                            <a class=\"file-details\" [attr.href]=\"message.downloadUrl\" target=\"_blank\" rel=\"noopener noreferrer\" (click)=\"this.markMessagesAsRead([message])\" download>\n                                <span class=\"file-message-title\" [attr.title]=\"message.message\">{{message.message}}</span>\n                                <span *ngIf=\"message.fileSizeInBytes\" class=\"file-message-size\">{{message.fileSizeInBytes}} Bytes</span>\n                            </a>\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n\n            <div class=\"ng-chat-footer primary-outline-color primary-background\">\n                <input #chatWindowInput \n                    type=\"text\" \n                    [ngModel]=\"window.newMessage | emojify:emojisEnabled\" \n                    (ngModelChange)=\"window.newMessage=$event\" \n                    [placeholder]=\"localization.messagePlaceholder\" \n                    [ngClass]=\"{'chat-window-input': true, 'has-side-action': fileUploadAdapter}\"\n                    (keydown)=\"onChatInputTyped($event, window)\" \n                    (blur)=\"toggleWindowFocus(window)\" \n                    (focus)=\"toggleWindowFocus(window)\"/>\n\n                <!-- File Upload -->\n                <ng-container *ngIf=\"fileUploadAdapter\">\n                    <a *ngIf=\"!isUploadingFile(window)\" class=\"btn-add-file\" (click)=\"triggerNativeFileUpload(window)\">\n                        <i class=\"upload-icon\"></i>\n                    </a>\n                    <input \n                        type=\"file\" \n                        #nativeFileInput \n                        style=\"display: none;\" \n                        [attr.id]=\"getUniqueFileUploadInstanceId(window)\" \n                        (change)=\"onFileChosen(window)\" />\n                    <div *ngIf=\"isUploadingFile(window)\" class=\"loader\"></div>\n                </ng-container>\n            </div>\n        </ng-container>\n    </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".user-icon{box-sizing:border-box;background-color:#fff;border:2px solid;width:32px;height:20px;border-radius:64px 64px 0 0/64px;margin-top:14px;margin-left:-1px;display:inline-block;vertical-align:middle;position:relative;font-style:normal;color:#ddd;text-align:left;text-indent:-9999px}.user-icon:before{border:2px solid;background-color:#fff;width:12px;height:12px;top:-19px;border-radius:50%;position:absolute;left:50%;transform:translateX(-50%)}.user-icon:after,.user-icon:before{content:'';pointer-events:none}.upload-icon{position:absolute;margin-left:3px;margin-top:12px;width:13px;height:4px;border:1px solid currentColor;border-top:none;border-radius:1px}.upload-icon:before{content:'';position:absolute;top:-8px;left:6px;width:1px;height:9px;background-color:currentColor}.upload-icon:after{content:'';position:absolute;top:-8px;left:4px;width:4px;height:4px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(-45deg)}.paperclip-icon{position:absolute;margin-left:9px;margin-top:2px;width:6px;height:12px;border-radius:4px 4px 0 0;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;transform:rotate(45deg)}.paperclip-icon:before{content:'';position:absolute;top:11px;left:-1px;width:4px;height:6px;border-radius:0 0 3px 3px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-bottom:1px solid currentColor}.paperclip-icon:after{content:'';position:absolute;left:1px;top:1px;width:2px;height:10px;border-radius:4px 4px 0 0;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor}.check-icon{color:#000;position:absolute;margin-left:3px;margin-top:4px;width:14px;height:8px;border-bottom:1px solid currentColor;border-left:1px solid currentColor;transform:rotate(-45deg)}.remove-icon{color:#000;position:absolute;margin-left:3px;margin-top:10px}.remove-icon:before{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;transform:rotate(45deg)}.remove-icon:after{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;transform:rotate(-45deg)}", ".loader,.loader:after,.loader:before{background:#e3e3e3;-webkit-animation:1s ease-in-out infinite load1;animation:1s ease-in-out infinite load1;width:1em;height:4em}.loader{color:#e3e3e3;text-indent:-9999em;margin:4px auto 0;position:relative;font-size:4px;transform:translateZ(0);-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader:after,.loader:before{position:absolute;top:0;content:''}.loader:before{left:-1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}.loader:after{left:1.5em}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}", "#ng-chat{position:fixed;z-index:999;right:0;bottom:0;box-sizing:initial;font-size:11pt;text-align:left}#ng-chat .shadowed{box-shadow:0 4px 8px rgba(0,0,0,.25)}.ng-chat-loading-wrapper{height:30px;text-align:center;font-size:.9em}#ng-chat-people{position:relative;width:240px;height:360px;border-width:1px;border-style:solid;margin-right:20px;box-shadow:0 4px 8px rgba(0,0,0,.25);border-bottom:0}#ng-chat-people.ng-chat-people-collapsed{height:30px}.ng-chat-close{text-decoration:none;float:right}.ng-chat-title,.ng-chat-title:hover{position:relative;z-index:2;height:30px;line-height:30px;font-size:.9em;padding:0 10px;display:block;text-decoration:none;color:inherit;font-weight:400;cursor:pointer}.ng-chat-title .ng-chat-title-visibility-toggle-area{display:inline-block;width:85%}.ng-chat-title .ng-chat-title-visibility-toggle-area>strong{font-weight:600;display:block;overflow:hidden;height:30px;text-overflow:ellipsis;white-space:nowrap;max-width:85%;float:left}.ng-chat-title .ng-chat-title-visibility-toggle-area .ng-chat-participant-status{float:left;margin-left:5px}.ng-chat-people-actions{position:absolute;top:4px;right:5px;margin:0;padding:0;z-index:2}.ng-chat-people-actions>a.ng-chat-people-action{display:inline-block;width:21px;height:21px;margin-right:8px;text-decoration:none;border:none;border-radius:25px;padding:1px}#ng-chat-search_friend{display:block;padding:7px 10px;margin:10px auto 0;width:calc(100% - 20px);font-size:.9em;-webkit-appearance:searchfield}#ng-chat-users{padding:0 10px;list-style:none;margin:0;overflow:auto;position:absolute;top:42px;bottom:0;width:100%;box-sizing:border-box}#ng-chat-users.offset-search{top:84px}#ng-chat-users .ng-chat-users-checkbox{float:left;margin-right:5px;margin-top:8px}#ng-chat-users li{clear:both;margin-bottom:10px;overflow:hidden;cursor:pointer;max-height:30px}#ng-chat-users li>.ng-chat-friends-list-selectable-offset{margin-left:22px}#ng-chat-users li .ng-chat-friends-list-container{display:inline-block;width:100%}#ng-chat-users li>.ng-chat-friends-list-selectable-offset.ng-chat-friends-list-container{display:block;width:auto}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper,#ng-chat-users li .ng-chat-friends-list-container>img.avatar{float:left;margin-right:5px;border-radius:25px}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper{background-color:#bababa;overflow:hidden;width:30px;height:30px}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper>i{color:#fff;transform:scale(.7)}#ng-chat-users li .ng-chat-friends-list-container>strong{float:left;line-height:30px;font-size:.8em;max-width:57%;max-height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#ng-chat-users li .ng-chat-friends-list-container>.ng-chat-participant-status{float:right}.ng-chat-participant-status{display:inline-block;border-radius:25px;width:8px;height:8px;margin-top:10px}.ng-chat-participant-status.online{background-color:#92a400}.ng-chat-participant-status.busy{background-color:#f91c1e}.ng-chat-participant-status.away{background-color:#f7d21b}.ng-chat-participant-status.offline{background-color:#bababa}.ng-chat-unread-messages-count{margin-left:5px;padding:0 5px;border-radius:25px;font-size:.9em;line-height:30px}.ng-chat-window{right:260px;height:360px;z-index:999;bottom:0;width:300px;position:fixed;border-width:1px;border-style:solid;border-bottom:0;box-shadow:0 4px 8px rgba(0,0,0,.25)}.ng-chat-window-collapsed{height:30px!important}.ng-chat-window .ng-chat-footer{box-sizing:border-box;padding:0;display:block;height:calc(10%);width:100%;border:none;border-top:1px solid transparent;border-color:inherit}.ng-chat-window .ng-chat-footer>input{font-size:.8em;box-sizing:border-box;padding:0 5px;display:block;height:100%;width:100%;border:none}.ng-chat-window .ng-chat-footer>input.has-side-action{width:calc(100% - 30px)}.ng-chat-window .ng-chat-footer .btn-add-file{position:absolute;right:5px;bottom:7px;height:20px;width:20px;cursor:pointer}.ng-chat-window .ng-chat-footer .loader{position:absolute;right:14px;bottom:8px}.ng-chat-window .ng-chat-load-history{height:30px;text-align:center;font-size:.8em}.ng-chat-window .ng-chat-load-history>a{border-radius:15px;cursor:pointer;padding:5px 10px}.ng-chat-window .ng-chat-messages{padding:10px;height:calc(90% - 30px);box-sizing:border-box;position:relative;overflow:auto}.ng-chat-window .ng-chat-messages .ng-chat-message{clear:both}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper,.ng-chat-window .ng-chat-messages .ng-chat-message>img.avatar{position:absolute;left:10px;border-radius:25px}.ng-chat-window .ng-chat-messages .ng-chat-message .ng-chat-participant-name{display:inline-block;margin-left:40px;padding-bottom:5px;font-weight:700;font-size:.8em;text-overflow:ellipsis;max-width:180px}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper{background-color:#bababa;overflow:hidden;width:30px;height:30px;padding:0}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper>i{color:#fff;transform:scale(.7)}.ng-chat-window .ng-chat-messages .ng-chat-message .message-sent-date{font-size:.8em;display:block;text-align:right;margin-top:5px}.ng-chat-window .ng-chat-messages .ng-chat-message>div{float:right;width:182px;padding:10px;border-radius:5px;margin-top:0;margin-bottom:5px;font-size:.9em;word-wrap:break-word}.ng-chat-window .ng-chat-messages .ng-chat-message.ng-chat-message-received>div.received-chat-message-container{float:left;margin-left:40px;padding-top:7px;padding-bottom:7px;border-style:solid;border-width:3px;margin-top:0;margin-bottom:5px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container{float:right;width:202px;border-style:solid;border-width:3px;border-radius:5px;overflow:hidden;margin-bottom:5px;display:block;text-decoration:none;font-size:.9em;padding:0;box-sizing:border-box}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container.received{float:left;margin-left:40px;width:208px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-message-icon-container{width:20px;height:35px;padding:10px 5px;float:left}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-message-icon-container i{margin-top:8px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details{float:left;padding:10px;width:calc(100% - 60px);color:currentColor;text-decoration:none}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details:hover{text-decoration:underline}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details span{display:block;width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details .file-message-title{font-weight:700}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details .file-message-size{font-size:.8em;margin-top:5px}.ng-chat-options-container{float:right;margin-right:5px}@media only screen and (max-width:768px){#ng-chat-people{width:270px;height:360px;margin-right:0}.ng-chat-window{position:initial}}", ".light-theme,.light-theme .primary-text{color:#5c5c5c;font-family:Arial,Helvetica,sans-serif}.light-theme .primary-background{background-color:#fff}.light-theme .secondary-background{background-color:#fafafa}.light-theme .primary-outline-color{border-color:#a3a3a3}.light-theme .friends-search-bar{background-color:#fff}.light-theme .ng-chat-people-action,.light-theme .ng-chat-people-action>i,.light-theme .unread-messages-counter-container{color:#5c5c5c;background-color:#e3e3e3}.light-theme .load-history-action{background-color:#e3e3e3}.light-theme .chat-window-input{background-color:#fff}.light-theme .file-message-container,.light-theme .sent-chat-message-container{background-color:#e3e3e3;border-color:#e3e3e3}.light-theme .file-message-container.received,.light-theme .received-chat-message-container{background-color:#fff;border-color:#e3e3e3}", ".dark-theme,.dark-theme .primary-text{color:#fff;font-family:Arial,Helvetica,sans-serif}.dark-theme .primary-background{background-color:#565656}.dark-theme .secondary-background{background-color:#444}.dark-theme .primary-outline-color{border-color:#353535}.dark-theme .friends-search-bar{background-color:#444;border:1px solid #444;color:#fff}.dark-theme .ng-chat-people-action,.dark-theme .ng-chat-people-action>i,.dark-theme .unread-messages-counter-container{background-color:#fff;color:#444}.dark-theme .load-history-action{background-color:#444}.dark-theme .chat-window-input{background-color:#444;color:#fff}.dark-theme .file-message-container,.dark-theme .sent-chat-message-container{border-color:#444;background-color:#444}.dark-theme .file-message-container.received,.dark-theme .received-chat-message-container{background-color:#565656;border-color:#444}.dark-theme .ng-chat-footer{background-color:#444}.dark-theme .ng-chat-message a{color:#fff}"]
                    }] }
        ];
        /** @nocollapse */
        NgChat.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer },
                { type: http.HttpClient }
            ];
        };
        NgChat.propDecorators = {
            adapter: [{ type: core.Input }],
            groupAdapter: [{ type: core.Input }],
            userId: [{ type: core.Input }],
            isCollapsed: [{ type: core.Input }],
            maximizeWindowOnNewMessage: [{ type: core.Input }],
            pollFriendsList: [{ type: core.Input }],
            pollingInterval: [{ type: core.Input }],
            historyEnabled: [{ type: core.Input }],
            emojisEnabled: [{ type: core.Input }],
            linkfyEnabled: [{ type: core.Input }],
            audioEnabled: [{ type: core.Input }],
            searchEnabled: [{ type: core.Input }],
            audioSource: [{ type: core.Input }],
            persistWindowsState: [{ type: core.Input }],
            title: [{ type: core.Input }],
            messagePlaceholder: [{ type: core.Input }],
            searchPlaceholder: [{ type: core.Input }],
            browserNotificationsEnabled: [{ type: core.Input }],
            browserNotificationIconSource: [{ type: core.Input }],
            browserNotificationTitle: [{ type: core.Input }],
            historyPageSize: [{ type: core.Input }],
            localization: [{ type: core.Input }],
            hideFriendsList: [{ type: core.Input }],
            hideFriendsListOnUnsupportedViewport: [{ type: core.Input }],
            fileUploadUrl: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            customTheme: [{ type: core.Input }],
            messageDatePipeFormat: [{ type: core.Input }],
            showMessageDate: [{ type: core.Input }],
            isViewportOnMobileEnabled: [{ type: core.Input }],
            onParticipantClicked: [{ type: core.Output }],
            onParticipantChatOpened: [{ type: core.Output }],
            onParticipantChatClosed: [{ type: core.Output }],
            onMessagesSeen: [{ type: core.Output }],
            chatMessageClusters: [{ type: core.ViewChildren, args: ['chatMessages',] }],
            chatWindowInputs: [{ type: core.ViewChildren, args: ['chatWindowInput',] }],
            nativeFileInputs: [{ type: core.ViewChildren, args: ['nativeFileInput',] }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return NgChat;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
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
            { type: core.Pipe, args: [{ name: 'emojify' },] }
        ];
        return EmojifyPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /*
     * Transforms text containing URLs or E-mails to valid links/mailtos
    */
    var LinkfyPipe = /** @class */ (function () {
        function LinkfyPipe() {
        }
        /**
         * @param {?} message
         * @param {?} pipeEnabled
         * @return {?}
         */
        LinkfyPipe.prototype.transform = /**
         * @param {?} message
         * @param {?} pipeEnabled
         * @return {?}
         */
            function (message, pipeEnabled) {
                if (pipeEnabled && message && message.length > 1) {
                    /** @type {?} */
                    var replacedText = void 0;
                    /** @type {?} */
                    var replacePatternProtocol = void 0;
                    /** @type {?} */
                    var replacePatternWWW = void 0;
                    /** @type {?} */
                    var replacePatternMailTo = void 0;
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
            };
        LinkfyPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'linkfy' },] }
        ];
        return LinkfyPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /*
     * Renders the display name of a participant in a group based on who's sent the message
    */
    var GroupMessageDisplayNamePipe = /** @class */ (function () {
        function GroupMessageDisplayNamePipe() {
        }
        /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
        GroupMessageDisplayNamePipe.prototype.transform = /**
         * @param {?} participant
         * @param {?} message
         * @return {?}
         */
            function (participant, message) {
                if (participant && participant.participantType == ChatParticipantType.Group) {
                    /** @type {?} */
                    var group = ( /** @type {?} */(participant));
                    /** @type {?} */
                    var userIndex = group.chattingTo.findIndex(function (x) { return x.id == message.fromId; });
                    return group.chattingTo[userIndex >= 0 ? userIndex : 0].displayName;
                }
                else
                    return "";
            };
        GroupMessageDisplayNamePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'groupMessageDisplayName' },] }
        ];
        return GroupMessageDisplayNamePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgChatOptionsComponent = /** @class */ (function () {
        function NgChatOptionsComponent() {
            this.activeOptionTrackerChange = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'ng-chat-options',
                        template: "<div *ngIf=\"options && options.length > 0\" class=\"ng-chat-options\">\n  <button class=\"ng-chat-options-activator\">\n    <span class=\"primary-text\">...</span>\n  </button>\n  <div class=\"ng-chat-options-content primary-background shadowed\">\n    <a *ngFor=\"let option of options; let i = index\" [ngClass]=\"'primary-text'\" (click)=\"onOptionClicked(option)\">\n      {{option.displayLabel}}\n    </a>\n  </div>      \n</div>\n",
                        styles: [".ng-chat-options-activator{background-color:unset;color:#fff;line-height:28px;border:none;position:relative}.ng-chat-options-activator>span{position:relative;top:-5px;left:0}.ng-chat-options{position:relative;display:inline-block}.ng-chat-options:hover .ng-chat-options-content{display:block}.ng-chat-options:hover .ng-chat-options-activator{background-color:#ddd}.ng-chat-options-content{display:none;position:absolute;min-width:160px;z-index:1}.ng-chat-options-content a:hover{background-color:#ddd}.ng-chat-options-content a{padding:6px 16px;text-decoration:none;display:block}"]
                    }] }
        ];
        /** @nocollapse */
        NgChatOptionsComponent.ctorParameters = function () { return []; };
        NgChatOptionsComponent.propDecorators = {
            options: [{ type: core.Input }],
            activeOptionTracker: [{ type: core.Input }],
            activeOptionTrackerChange: [{ type: core.Output }],
            chattingTo: [{ type: core.Input }]
        };
        return NgChatOptionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgChatModule = /** @class */ (function () {
        function NgChatModule() {
        }
        NgChatModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule, http.HttpClientModule],
                        declarations: [NgChat, EmojifyPipe, LinkfyPipe, GroupMessageDisplayNamePipe, NgChatOptionsComponent],
                        exports: [NgChat]
                    },] }
        ];
        return NgChatModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.NgChatModule = NgChatModule;
    exports.ChatAdapter = ChatAdapter;
    exports.Message = Message;
    exports.ChatParticipantStatus = ChatParticipantStatus;
    exports.User = User;
    exports.ParticipantResponse = ParticipantResponse;
    exports.ParticipantMetadata = ParticipantMetadata;
    exports.Window = Window;
    exports.PagedHistoryChatAdapter = PagedHistoryChatAdapter;
    exports.Theme = Theme;
    exports.Group = Group;
    exports.ChatParticipantType = ChatParticipantType;
    exports.ɵe = NgChatOptionsComponent;
    exports.ɵa = NgChat;
    exports.ɵb = EmojifyPipe;
    exports.ɵd = GroupMessageDisplayNamePipe;
    exports.ɵc = LinkfyPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-chat.umd.js.map