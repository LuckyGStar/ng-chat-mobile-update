/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChildren, HostListener, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatAdapter } from './core/chat-adapter';
import { Message } from "./core/message";
import { MessageType } from "./core/message-type.enum";
import { Window } from "./core/window";
import { ChatParticipantStatus } from "./core/chat-participant-status.enum";
import { ScrollDirection } from "./core/scroll-direction.enum";
import { PagedHistoryChatAdapter } from './core/paged-history-chat-adapter';
import { DefaultFileUploadAdapter } from './core/default-file-upload-adapter';
import { Theme } from './core/theme.enum';
import { Group } from "./core/group";
import { ChatParticipantType } from "./core/chat-participant-type.enum";
import { map } from 'rxjs/operators';
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
        this.onParticipantClicked = new EventEmitter();
        this.onParticipantChatOpened = new EventEmitter();
        this.onParticipantChatClosed = new EventEmitter();
        this.onMessagesSeen = new EventEmitter();
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
                        _this.selectedUsersFromFriendsList = _this.selectedUsersFromFriendsList.concat((/** @type {?} */ (chattingWindow.participant)));
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
         */
        function () {
            return "ng-chat-users-" + this.userId; // Appending the user id so the state is unique per user in a computer.   
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgChat.prototype, "filteredParticipants", {
        get: /**
         * @return {?}
         */
        function () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.browserNotificationsEnabled && ("Notification" in window))) return [3 /*break*/, 2];
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
            .pipe(map(function (participantsResponse) {
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
                .pipe(map(function (result) {
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
                .pipe(map(function (result) {
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
        if (forceMarkMessagesAsSeen === void 0) { forceMarkMessagesAsSeen = false; }
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
        if (focusOnNewWindow === void 0) { focusOnNewWindow = false; }
        if (invokedByUserClick === void 0) { invokedByUserClick = false; }
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
        if (callback === void 0) { callback = function () { }; }
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
                    var participantIds_1 = (/** @type {?} */ (JSON.parse(stringfiedParticipantIds)));
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
            var group = (/** @type {?} */ (participant));
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
                .filter(function (message) { return message.dateSeen == null
                && (message.toId == _this.userId || window.participant.participantType === ChatParticipantType.Group); });
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
        { type: Component, args: [{
                    selector: 'ng-chat',
                    template: "<link *ngIf=\"customTheme\" rel=\"stylesheet\" [href]='sanitizer.bypassSecurityTrustResourceUrl(customTheme)'>\n\n<div id=\"ng-chat\" *ngIf=\"isBootstrapped && !unsupportedViewport\" [ngClass]=\"theme\">\n    <div *ngIf=\"!hideFriendsList\" id=\"ng-chat-people\" [ngClass]=\"{'primary-outline-color': true, 'primary-background': true, 'ng-chat-people-collapsed': isCollapsed}\">\n        <a href=\"javascript:void(0);\" class=\"ng-chat-title secondary-background shadowed\" (click)=\"onChatTitleClicked($event)\">\n            <span>\n                {{localization.title}}\n            </span>\n        </a>\n        <div *ngIf=\"currentActiveOption\" class=\"ng-chat-people-actions\" (click)=\"onFriendsListActionCancelClicked()\">\n            <a href=\"javascript:void(0);\" class=\"ng-chat-people-action\">\n                <i class=\"remove-icon\"></i>\n            </a>\n            <a href=\"javascript:void(0);\" class=\"ng-chat-people-action\" (click)=\"onFriendsListActionConfirmClicked()\">\n                <i class=\"check-icon\"></i>\n            </a>\n        </div>\n        <input *ngIf=\"searchEnabled\" id=\"ng-chat-search_friend\" class=\"friends-search-bar\" type=\"search\" [placeholder]=\"localization.searchPlaceholder\" [(ngModel)]=\"searchInput\" />\n        <ul id=\"ng-chat-users\" *ngIf=\"!isCollapsed\" [ngClass]=\"{'offset-search': searchEnabled}\">\n            <li *ngFor=\"let user of filteredParticipants\">\n                <input \n                    *ngIf=\"currentActiveOption && currentActiveOption.validateContext(user)\" \n                    type=\"checkbox\" \n                    class=\"ng-chat-users-checkbox\" \n                    (change)=\"onFriendsListCheckboxChange(user, $event.target.checked)\" \n                    [checked]=\"isUserSelectedFromFriendsList(user)\"/>\n                <div [ngClass]=\"{'ng-chat-friends-list-selectable-offset': currentActiveOption, 'ng-chat-friends-list-container': true}\" (click)=\"openChatWindow(user, true, true)\">\n                    <div *ngIf=\"!user.avatar\" class=\"icon-wrapper\">\n                        <i class=\"user-icon\"></i>\n                    </div>\n                    <img *ngIf=\"user.avatar\" alt=\"\" class=\"avatar\" height=\"30\" width=\"30\"  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(user.avatar)\"/>\n                    <strong title=\"{{user.displayName}}\">{{user.displayName}}</strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': user.status == ChatParticipantStatus.Online, 'busy': user.status == ChatParticipantStatus.Busy, 'away': user.status == ChatParticipantStatus.Away, 'offline': user.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(user.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotalByParticipant(user).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotalByParticipant(user)}}</span>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <div *ngFor=\"let window of windows; let i = index\" [ngClass]=\"{'ng-chat-window': true, 'primary-outline-color': true, 'ng-chat-window-collapsed': window.isCollapsed}\" [ngStyle]=\"{'right': (!hideFriendsList ? friendsListWidth : 0) + 20 + windowSizeFactor * i + 'px'}\">\n        <ng-container *ngIf=\"window.isCollapsed\">\n            <div class=\"ng-chat-title secondary-background\">\n                <div class=\"ng-chat-title-visibility-toggle-area\" (click)=\"onChatWindowClicked(window)\">\n                    <strong title=\"{{window.participant.displayName}}\">\n                        {{window.participant.displayName}}\n                    </strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': window.participant.status == ChatParticipantStatus.Online, 'busy': window.participant.status == ChatParticipantStatus.Busy, 'away': window.participant.status == ChatParticipantStatus.Away, 'offline': window.participant.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(window.participant.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotal(window).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotal(window)}}</span>\n                </div>\n                <a href=\"javascript:void(0);\" class=\"ng-chat-close primary-text\" (click)=\"onCloseChatWindow(window)\">X</a>\n            </div>\n        </ng-container>\n        <ng-container *ngIf=\"!window.isCollapsed\">\n            <div class=\"ng-chat-title secondary-background\">\n                <div class=\"ng-chat-title-visibility-toggle-area\" (click)=\"onChatWindowClicked(window)\">\n                    <strong title=\"{{window.participant.displayName}}\">\n                        {{window.participant.displayName}}\n                    </strong>\n                    <span [ngClass]=\"{'ng-chat-participant-status': true, 'online': window.participant.status == ChatParticipantStatus.Online, 'busy': window.participant.status == ChatParticipantStatus.Busy, 'away': window.participant.status == ChatParticipantStatus.Away, 'offline': window.participant.status == ChatParticipantStatus.Offline}\" title=\"{{getStatusTitle(window.participant.status)}}\"></span>\n                    <span *ngIf=\"unreadMessagesTotal(window).length > 0\" class=\"ng-chat-unread-messages-count unread-messages-counter-container primary-text\">{{unreadMessagesTotal(window)}}</span>    \n                </div>\n                <a href=\"javascript:void(0);\" class=\"ng-chat-close primary-text\" (click)=\"onCloseChatWindow(window)\">X</a>\n                <ng-chat-options [ngClass]=\"'ng-chat-options-container'\" [options]=\"defaultWindowOptions(window)\" [chattingTo]=\"window\" [(activeOptionTracker)]=\"currentActiveOption\"></ng-chat-options>\n            </div>\n            <div #chatMessages class=\"ng-chat-messages primary-background\">\n                <div *ngIf=\"window.isLoadingHistory\" class=\"ng-chat-loading-wrapper\">\n                    <div class=\"loader\">Loading history...</div>\n                </div>\n                <div *ngIf=\"hasPagedHistory && window.hasMoreMessages && !window.isLoadingHistory\" class=\"ng-chat-load-history\">\n                \t<a class=\"load-history-action\" (click)=\"fetchMessageHistory(window)\">{{localization.loadMessageHistoryPlaceholder}}</a>\n                </div>\n\n                <div *ngFor=\"let message of window.messages; let i = index\" [ngClass]=\"{'ng-chat-message': true, 'ng-chat-message-received': message.fromId != userId}\">\n                    <ng-container *ngIf=\"isAvatarVisible(window, message, i)\"> \n                        <div *ngIf=\"!getChatWindowAvatar(window.participant, message)\" class=\"icon-wrapper\">\n                            <i class=\"user-icon\"></i>\n                        </div>\n                        <img *ngIf=\"getChatWindowAvatar(window.participant, message)\" alt=\"\" class=\"avatar\" height=\"30\" width=\"30\" [src]=\"sanitizer.bypassSecurityTrustResourceUrl(getChatWindowAvatar(window.participant, message))\" />\n                        <span *ngIf=\"window.participant.participantType == ChatParticipantType.Group\" class=\"ng-chat-participant-name\">{{window.participant | groupMessageDisplayName:message}}</span>\n                    </ng-container>\n                    <ng-container [ngSwitch]=\"message.type\">\n                        <div *ngSwitchCase=\"MessageType.Text\" [ngClass]=\"{'sent-chat-message-container': message.fromId == userId, 'received-chat-message-container': message.fromId != userId}\">\n                            <span [innerHtml]=\"message.message | emojify:emojisEnabled | linkfy:linkfyEnabled\"></span>\n                            <span *ngIf=\"showMessageDate && message.dateSent\" class=\"message-sent-date\">{{message.dateSent | date:messageDatePipeFormat}}</span>\n                        </div>\n                        <div *ngSwitchCase=\"MessageType.File\" [ngClass]=\"{'file-message-container': true, 'received': message.fromId != userId}\">\n                            <div class=\"file-message-icon-container\">\n                                <i class=\"paperclip-icon\"></i>\n                            </div>\n                            <a class=\"file-details\" [attr.href]=\"message.downloadUrl\" target=\"_blank\" rel=\"noopener noreferrer\" (click)=\"this.markMessagesAsRead([message])\" download>\n                                <span class=\"file-message-title\" [attr.title]=\"message.message\">{{message.message}}</span>\n                                <span *ngIf=\"message.fileSizeInBytes\" class=\"file-message-size\">{{message.fileSizeInBytes}} Bytes</span>\n                            </a>\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n\n            <div class=\"ng-chat-footer primary-outline-color primary-background\">\n                <input #chatWindowInput \n                    type=\"text\" \n                    [ngModel]=\"window.newMessage | emojify:emojisEnabled\" \n                    (ngModelChange)=\"window.newMessage=$event\" \n                    [placeholder]=\"localization.messagePlaceholder\" \n                    [ngClass]=\"{'chat-window-input': true, 'has-side-action': fileUploadAdapter}\"\n                    (keydown)=\"onChatInputTyped($event, window)\" \n                    (blur)=\"toggleWindowFocus(window)\" \n                    (focus)=\"toggleWindowFocus(window)\"/>\n\n                <!-- File Upload -->\n                <ng-container *ngIf=\"fileUploadAdapter\">\n                    <a *ngIf=\"!isUploadingFile(window)\" class=\"btn-add-file\" (click)=\"triggerNativeFileUpload(window)\">\n                        <i class=\"upload-icon\"></i>\n                    </a>\n                    <input \n                        type=\"file\" \n                        #nativeFileInput \n                        style=\"display: none;\" \n                        [attr.id]=\"getUniqueFileUploadInstanceId(window)\" \n                        (change)=\"onFileChosen(window)\" />\n                    <div *ngIf=\"isUploadingFile(window)\" class=\"loader\"></div>\n                </ng-container>\n            </div>\n        </ng-container>\n    </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".user-icon{box-sizing:border-box;background-color:#fff;border:2px solid;width:32px;height:20px;border-radius:64px 64px 0 0/64px;margin-top:14px;margin-left:-1px;display:inline-block;vertical-align:middle;position:relative;font-style:normal;color:#ddd;text-align:left;text-indent:-9999px}.user-icon:before{border:2px solid;background-color:#fff;width:12px;height:12px;top:-19px;border-radius:50%;position:absolute;left:50%;transform:translateX(-50%)}.user-icon:after,.user-icon:before{content:'';pointer-events:none}.upload-icon{position:absolute;margin-left:3px;margin-top:12px;width:13px;height:4px;border:1px solid currentColor;border-top:none;border-radius:1px}.upload-icon:before{content:'';position:absolute;top:-8px;left:6px;width:1px;height:9px;background-color:currentColor}.upload-icon:after{content:'';position:absolute;top:-8px;left:4px;width:4px;height:4px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(-45deg)}.paperclip-icon{position:absolute;margin-left:9px;margin-top:2px;width:6px;height:12px;border-radius:4px 4px 0 0;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;transform:rotate(45deg)}.paperclip-icon:before{content:'';position:absolute;top:11px;left:-1px;width:4px;height:6px;border-radius:0 0 3px 3px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-bottom:1px solid currentColor}.paperclip-icon:after{content:'';position:absolute;left:1px;top:1px;width:2px;height:10px;border-radius:4px 4px 0 0;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor}.check-icon{color:#000;position:absolute;margin-left:3px;margin-top:4px;width:14px;height:8px;border-bottom:1px solid currentColor;border-left:1px solid currentColor;transform:rotate(-45deg)}.remove-icon{color:#000;position:absolute;margin-left:3px;margin-top:10px}.remove-icon:before{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;transform:rotate(45deg)}.remove-icon:after{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;transform:rotate(-45deg)}", ".loader,.loader:after,.loader:before{background:#e3e3e3;-webkit-animation:1s ease-in-out infinite load1;animation:1s ease-in-out infinite load1;width:1em;height:4em}.loader{color:#e3e3e3;text-indent:-9999em;margin:4px auto 0;position:relative;font-size:4px;transform:translateZ(0);-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader:after,.loader:before{position:absolute;top:0;content:''}.loader:before{left:-1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}.loader:after{left:1.5em}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}", "#ng-chat{position:fixed;z-index:999;right:0;bottom:0;box-sizing:initial;font-size:11pt;text-align:left}#ng-chat .shadowed{box-shadow:0 4px 8px rgba(0,0,0,.25)}.ng-chat-loading-wrapper{height:30px;text-align:center;font-size:.9em}#ng-chat-people{position:relative;width:240px;height:360px;border-width:1px;border-style:solid;margin-right:20px;box-shadow:0 4px 8px rgba(0,0,0,.25);border-bottom:0}#ng-chat-people.ng-chat-people-collapsed{height:30px}.ng-chat-close{text-decoration:none;float:right}.ng-chat-title,.ng-chat-title:hover{position:relative;z-index:2;height:30px;line-height:30px;font-size:.9em;padding:0 10px;display:block;text-decoration:none;color:inherit;font-weight:400;cursor:pointer}.ng-chat-title .ng-chat-title-visibility-toggle-area{display:inline-block;width:85%}.ng-chat-title .ng-chat-title-visibility-toggle-area>strong{font-weight:600;display:block;overflow:hidden;height:30px;text-overflow:ellipsis;white-space:nowrap;max-width:85%;float:left}.ng-chat-title .ng-chat-title-visibility-toggle-area .ng-chat-participant-status{float:left;margin-left:5px}.ng-chat-people-actions{position:absolute;top:4px;right:5px;margin:0;padding:0;z-index:2}.ng-chat-people-actions>a.ng-chat-people-action{display:inline-block;width:21px;height:21px;margin-right:8px;text-decoration:none;border:none;border-radius:25px;padding:1px}#ng-chat-search_friend{display:block;padding:7px 10px;margin:10px auto 0;width:calc(100% - 20px);font-size:.9em;-webkit-appearance:searchfield}#ng-chat-users{padding:0 10px;list-style:none;margin:0;overflow:auto;position:absolute;top:42px;bottom:0;width:100%;box-sizing:border-box}#ng-chat-users.offset-search{top:84px}#ng-chat-users .ng-chat-users-checkbox{float:left;margin-right:5px;margin-top:8px}#ng-chat-users li{clear:both;margin-bottom:10px;overflow:hidden;cursor:pointer;max-height:30px}#ng-chat-users li>.ng-chat-friends-list-selectable-offset{margin-left:22px}#ng-chat-users li .ng-chat-friends-list-container{display:inline-block;width:100%}#ng-chat-users li>.ng-chat-friends-list-selectable-offset.ng-chat-friends-list-container{display:block;width:auto}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper,#ng-chat-users li .ng-chat-friends-list-container>img.avatar{float:left;margin-right:5px;border-radius:25px}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper{background-color:#bababa;overflow:hidden;width:30px;height:30px}#ng-chat-users li .ng-chat-friends-list-container>.icon-wrapper>i{color:#fff;transform:scale(.7)}#ng-chat-users li .ng-chat-friends-list-container>strong{float:left;line-height:30px;font-size:.8em;max-width:57%;max-height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#ng-chat-users li .ng-chat-friends-list-container>.ng-chat-participant-status{float:right}.ng-chat-participant-status{display:inline-block;border-radius:25px;width:8px;height:8px;margin-top:10px}.ng-chat-participant-status.online{background-color:#92a400}.ng-chat-participant-status.busy{background-color:#f91c1e}.ng-chat-participant-status.away{background-color:#f7d21b}.ng-chat-participant-status.offline{background-color:#bababa}.ng-chat-unread-messages-count{margin-left:5px;padding:0 5px;border-radius:25px;font-size:.9em;line-height:30px}.ng-chat-window{right:260px;height:360px;z-index:999;bottom:0;width:300px;position:fixed;border-width:1px;border-style:solid;border-bottom:0;box-shadow:0 4px 8px rgba(0,0,0,.25)}.ng-chat-window-collapsed{height:30px!important}.ng-chat-window .ng-chat-footer{box-sizing:border-box;padding:0;display:block;height:calc(10%);width:100%;border:none;border-top:1px solid transparent;border-color:inherit}.ng-chat-window .ng-chat-footer>input{font-size:.8em;box-sizing:border-box;padding:0 5px;display:block;height:100%;width:100%;border:none}.ng-chat-window .ng-chat-footer>input.has-side-action{width:calc(100% - 30px)}.ng-chat-window .ng-chat-footer .btn-add-file{position:absolute;right:5px;bottom:7px;height:20px;width:20px;cursor:pointer}.ng-chat-window .ng-chat-footer .loader{position:absolute;right:14px;bottom:8px}.ng-chat-window .ng-chat-load-history{height:30px;text-align:center;font-size:.8em}.ng-chat-window .ng-chat-load-history>a{border-radius:15px;cursor:pointer;padding:5px 10px}.ng-chat-window .ng-chat-messages{padding:10px;height:calc(90% - 30px);box-sizing:border-box;position:relative;overflow:auto}.ng-chat-window .ng-chat-messages .ng-chat-message{clear:both}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper,.ng-chat-window .ng-chat-messages .ng-chat-message>img.avatar{position:absolute;left:10px;border-radius:25px}.ng-chat-window .ng-chat-messages .ng-chat-message .ng-chat-participant-name{display:inline-block;margin-left:40px;padding-bottom:5px;font-weight:700;font-size:.8em;text-overflow:ellipsis;max-width:180px}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper{background-color:#bababa;overflow:hidden;width:30px;height:30px;padding:0}.ng-chat-window .ng-chat-messages .ng-chat-message>.icon-wrapper>i{color:#fff;transform:scale(.7)}.ng-chat-window .ng-chat-messages .ng-chat-message .message-sent-date{font-size:.8em;display:block;text-align:right;margin-top:5px}.ng-chat-window .ng-chat-messages .ng-chat-message>div{float:right;width:182px;padding:10px;border-radius:5px;margin-top:0;margin-bottom:5px;font-size:.9em;word-wrap:break-word}.ng-chat-window .ng-chat-messages .ng-chat-message.ng-chat-message-received>div.received-chat-message-container{float:left;margin-left:40px;padding-top:7px;padding-bottom:7px;border-style:solid;border-width:3px;margin-top:0;margin-bottom:5px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container{float:right;width:202px;border-style:solid;border-width:3px;border-radius:5px;overflow:hidden;margin-bottom:5px;display:block;text-decoration:none;font-size:.9em;padding:0;box-sizing:border-box}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container.received{float:left;margin-left:40px;width:208px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-message-icon-container{width:20px;height:35px;padding:10px 5px;float:left}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-message-icon-container i{margin-top:8px}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details{float:left;padding:10px;width:calc(100% - 60px);color:currentColor;text-decoration:none}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details:hover{text-decoration:underline}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details span{display:block;width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details .file-message-title{font-weight:700}.ng-chat-window .ng-chat-messages .ng-chat-message .file-message-container>.file-details .file-message-size{font-size:.8em;margin-top:5px}.ng-chat-options-container{float:right;margin-right:5px}@media only screen and (max-width:768px){#ng-chat-people{width:270px;height:360px;margin-right:0}.ng-chat-window{position:initial}}", ".light-theme,.light-theme .primary-text{color:#5c5c5c;font-family:Arial,Helvetica,sans-serif}.light-theme .primary-background{background-color:#fff}.light-theme .secondary-background{background-color:#fafafa}.light-theme .primary-outline-color{border-color:#a3a3a3}.light-theme .friends-search-bar{background-color:#fff}.light-theme .ng-chat-people-action,.light-theme .ng-chat-people-action>i,.light-theme .unread-messages-counter-container{color:#5c5c5c;background-color:#e3e3e3}.light-theme .load-history-action{background-color:#e3e3e3}.light-theme .chat-window-input{background-color:#fff}.light-theme .file-message-container,.light-theme .sent-chat-message-container{background-color:#e3e3e3;border-color:#e3e3e3}.light-theme .file-message-container.received,.light-theme .received-chat-message-container{background-color:#fff;border-color:#e3e3e3}", ".dark-theme,.dark-theme .primary-text{color:#fff;font-family:Arial,Helvetica,sans-serif}.dark-theme .primary-background{background-color:#565656}.dark-theme .secondary-background{background-color:#444}.dark-theme .primary-outline-color{border-color:#353535}.dark-theme .friends-search-bar{background-color:#444;border:1px solid #444;color:#fff}.dark-theme .ng-chat-people-action,.dark-theme .ng-chat-people-action>i,.dark-theme .unread-messages-counter-container{background-color:#fff;color:#444}.dark-theme .load-history-action{background-color:#444}.dark-theme .chat-window-input{background-color:#444;color:#fff}.dark-theme .file-message-container,.dark-theme .sent-chat-message-container{border-color:#444;background-color:#444}.dark-theme .file-message-container.received,.dark-theme .received-chat-message-container{background-color:#565656;border-color:#444}.dark-theme .ng-chat-footer{background-color:#444}.dark-theme .ng-chat-message a{color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    NgChat.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: HttpClient }
    ]; };
    NgChat.propDecorators = {
        adapter: [{ type: Input }],
        groupAdapter: [{ type: Input }],
        userId: [{ type: Input }],
        isCollapsed: [{ type: Input }],
        maximizeWindowOnNewMessage: [{ type: Input }],
        pollFriendsList: [{ type: Input }],
        pollingInterval: [{ type: Input }],
        historyEnabled: [{ type: Input }],
        emojisEnabled: [{ type: Input }],
        linkfyEnabled: [{ type: Input }],
        audioEnabled: [{ type: Input }],
        searchEnabled: [{ type: Input }],
        audioSource: [{ type: Input }],
        persistWindowsState: [{ type: Input }],
        title: [{ type: Input }],
        messagePlaceholder: [{ type: Input }],
        searchPlaceholder: [{ type: Input }],
        browserNotificationsEnabled: [{ type: Input }],
        browserNotificationIconSource: [{ type: Input }],
        browserNotificationTitle: [{ type: Input }],
        historyPageSize: [{ type: Input }],
        localization: [{ type: Input }],
        hideFriendsList: [{ type: Input }],
        hideFriendsListOnUnsupportedViewport: [{ type: Input }],
        fileUploadUrl: [{ type: Input }],
        theme: [{ type: Input }],
        customTheme: [{ type: Input }],
        messageDatePipeFormat: [{ type: Input }],
        showMessageDate: [{ type: Input }],
        isViewportOnMobileEnabled: [{ type: Input }],
        onParticipantClicked: [{ type: Output }],
        onParticipantChatOpened: [{ type: Output }],
        onParticipantChatClosed: [{ type: Output }],
        onMessagesSeen: [{ type: Output }],
        chatMessageClusters: [{ type: ViewChildren, args: ['chatMessages',] }],
        chatWindowInputs: [{ type: ViewChildren, args: ['chatWindowInput',] }],
        nativeFileInputs: [{ type: ViewChildren, args: ['nativeFileInput',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return NgChat;
}());
export { NgChat };
if (false) {
    /** @type {?} */
    NgChat.prototype.ChatParticipantType;
    /** @type {?} */
    NgChat.prototype.ChatParticipantStatus;
    /** @type {?} */
    NgChat.prototype.MessageType;
    /** @type {?} */
    NgChat.prototype.adapter;
    /** @type {?} */
    NgChat.prototype.groupAdapter;
    /** @type {?} */
    NgChat.prototype.userId;
    /** @type {?} */
    NgChat.prototype.isCollapsed;
    /** @type {?} */
    NgChat.prototype.maximizeWindowOnNewMessage;
    /** @type {?} */
    NgChat.prototype.pollFriendsList;
    /** @type {?} */
    NgChat.prototype.pollingInterval;
    /** @type {?} */
    NgChat.prototype.historyEnabled;
    /** @type {?} */
    NgChat.prototype.emojisEnabled;
    /** @type {?} */
    NgChat.prototype.linkfyEnabled;
    /** @type {?} */
    NgChat.prototype.audioEnabled;
    /** @type {?} */
    NgChat.prototype.searchEnabled;
    /** @type {?} */
    NgChat.prototype.audioSource;
    /** @type {?} */
    NgChat.prototype.persistWindowsState;
    /** @type {?} */
    NgChat.prototype.title;
    /** @type {?} */
    NgChat.prototype.messagePlaceholder;
    /** @type {?} */
    NgChat.prototype.searchPlaceholder;
    /** @type {?} */
    NgChat.prototype.browserNotificationsEnabled;
    /** @type {?} */
    NgChat.prototype.browserNotificationIconSource;
    /** @type {?} */
    NgChat.prototype.browserNotificationTitle;
    /** @type {?} */
    NgChat.prototype.historyPageSize;
    /** @type {?} */
    NgChat.prototype.localization;
    /** @type {?} */
    NgChat.prototype.hideFriendsList;
    /** @type {?} */
    NgChat.prototype.hideFriendsListOnUnsupportedViewport;
    /** @type {?} */
    NgChat.prototype.fileUploadUrl;
    /** @type {?} */
    NgChat.prototype.theme;
    /** @type {?} */
    NgChat.prototype.customTheme;
    /** @type {?} */
    NgChat.prototype.messageDatePipeFormat;
    /** @type {?} */
    NgChat.prototype.showMessageDate;
    /** @type {?} */
    NgChat.prototype.isViewportOnMobileEnabled;
    /** @type {?} */
    NgChat.prototype.onParticipantClicked;
    /** @type {?} */
    NgChat.prototype.onParticipantChatOpened;
    /** @type {?} */
    NgChat.prototype.onParticipantChatClosed;
    /** @type {?} */
    NgChat.prototype.onMessagesSeen;
    /** @type {?} */
    NgChat.prototype.browserNotificationsBootstrapped;
    /** @type {?} */
    NgChat.prototype.hasPagedHistory;
    /** @type {?} */
    NgChat.prototype.statusDescription;
    /** @type {?} */
    NgChat.prototype.audioFile;
    /** @type {?} */
    NgChat.prototype.searchInput;
    /** @type {?} */
    NgChat.prototype.participants;
    /** @type {?} */
    NgChat.prototype.participantsResponse;
    /** @type {?} */
    NgChat.prototype.participantsInteractedWith;
    /** @type {?} */
    NgChat.prototype.currentActiveOption;
    /** @type {?} */
    NgChat.prototype.selectedUsersFromFriendsList;
    /** @type {?} */
    NgChat.prototype.windowSizeFactor;
    /** @type {?} */
    NgChat.prototype.friendsListWidth;
    /** @type {?} */
    NgChat.prototype.viewPortTotalArea;
    /** @type {?} */
    NgChat.prototype.unsupportedViewport;
    /** @type {?} */
    NgChat.prototype.fileUploadersInUse;
    /** @type {?} */
    NgChat.prototype.fileUploadAdapter;
    /** @type {?} */
    NgChat.prototype.windows;
    /** @type {?} */
    NgChat.prototype.isBootstrapped;
    /** @type {?} */
    NgChat.prototype.chatMessageClusters;
    /** @type {?} */
    NgChat.prototype.chatWindowInputs;
    /** @type {?} */
    NgChat.prototype.nativeFileInputs;
    /** @type {?} */
    NgChat.prototype.sanitizer;
    /** @type {?} */
    NgChat.prototype._httpClient;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1jaGF0LyIsInNvdXJjZXMiOlsibmctY2hhdC9uZy1jaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFlBQVksRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUlsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR3hFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQztJQWNJLGdCQUFtQixTQUF1QixFQUFVLFdBQXVCO1FBQXhELGNBQVMsR0FB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O0lBRWhDLHFDQUF1RDs7SUFFdkQsa0NBQXVEOztJQUV2RCxrQ0FBZ0U7O0lBbE1wRCwyQkFBOEI7O0lBQUUsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGRyZW4sIFZpZXdDaGlsZCwgSG9zdExpc3RlbmVyLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgQ2hhdEFkYXB0ZXIgfSBmcm9tICcuL2NvcmUvY2hhdC1hZGFwdGVyJztcbmltcG9ydCB7IElDaGF0R3JvdXBBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2NoYXQtZ3JvdXAtYWRhcHRlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vY29yZS91c2VyXCI7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudFJlc3BvbnNlIH0gZnJvbSBcIi4vY29yZS9wYXJ0aWNpcGFudC1yZXNwb25zZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL2NvcmUvbWVzc2FnZVwiO1xuaW1wb3J0IHsgRmlsZU1lc3NhZ2UgfSBmcm9tIFwiLi9jb3JlL2ZpbGUtbWVzc2FnZVwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jb3JlL21lc3NhZ2UtdHlwZS5lbnVtXCI7XG5pbXBvcnQgeyBXaW5kb3cgfSBmcm9tIFwiLi9jb3JlL3dpbmRvd1wiO1xuaW1wb3J0IHsgQ2hhdFBhcnRpY2lwYW50U3RhdHVzIH0gZnJvbSBcIi4vY29yZS9jaGF0LXBhcnRpY2lwYW50LXN0YXR1cy5lbnVtXCI7XG5pbXBvcnQgeyBTY3JvbGxEaXJlY3Rpb24gfSBmcm9tIFwiLi9jb3JlL3Njcm9sbC1kaXJlY3Rpb24uZW51bVwiO1xuaW1wb3J0IHsgTG9jYWxpemF0aW9uLCBTdGF0dXNEZXNjcmlwdGlvbiB9IGZyb20gJy4vY29yZS9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgSUNoYXRDb250cm9sbGVyIH0gZnJvbSAnLi9jb3JlL2NoYXQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBQYWdlZEhpc3RvcnlDaGF0QWRhcHRlciB9IGZyb20gJy4vY29yZS9wYWdlZC1oaXN0b3J5LWNoYXQtYWRhcHRlcic7XG5pbXBvcnQgeyBJRmlsZVVwbG9hZEFkYXB0ZXIgfSBmcm9tICcuL2NvcmUvZmlsZS11cGxvYWQtYWRhcHRlcic7XG5pbXBvcnQgeyBEZWZhdWx0RmlsZVVwbG9hZEFkYXB0ZXIgfSBmcm9tICcuL2NvcmUvZGVmYXVsdC1maWxlLXVwbG9hZC1hZGFwdGVyJztcbmltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi9jb3JlL3RoZW1lLmVudW0nO1xuaW1wb3J0IHsgSUNoYXRPcHRpb24gfSBmcm9tICcuL2NvcmUvY2hhdC1vcHRpb24nO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiLi9jb3JlL2dyb3VwXCI7XG5pbXBvcnQgeyBDaGF0UGFydGljaXBhbnRUeXBlIH0gZnJvbSBcIi4vY29yZS9jaGF0LXBhcnRpY2lwYW50LXR5cGUuZW51bVwiO1xuaW1wb3J0IHsgSUNoYXRQYXJ0aWNpcGFudCB9IGZyb20gXCIuL2NvcmUvY2hhdC1wYXJ0aWNpcGFudFwiO1xuXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmctY2hhdCcsXG4gICAgdGVtcGxhdGVVcmw6ICduZy1jaGF0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Fzc2V0cy9pY29ucy5jc3MnLFxuICAgICAgICAnYXNzZXRzL2xvYWRpbmctc3Bpbm5lci5jc3MnLFxuICAgICAgICAnYXNzZXRzL25nLWNoYXQuY29tcG9uZW50LmRlZmF1bHQuY3NzJyxcbiAgICAgICAgJ2Fzc2V0cy90aGVtZXMvbmctY2hhdC50aGVtZS5kZWZhdWx0LnNjc3MnLFxuICAgICAgICAnYXNzZXRzL3RoZW1lcy9uZy1jaGF0LnRoZW1lLmRhcmsuc2NzcydcbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ0NoYXQgaW1wbGVtZW50cyBPbkluaXQsIElDaGF0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIF9odHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7IH1cblxuICAgIC8vIEV4cG9zZXMgZW51bXMgZm9yIHRoZSBuZy10ZW1wbGF0ZVxuICAgIHB1YmxpYyBDaGF0UGFydGljaXBhbnRUeXBlID0gQ2hhdFBhcnRpY2lwYW50VHlwZTtcbiAgICBwdWJsaWMgQ2hhdFBhcnRpY2lwYW50U3RhdHVzID0gQ2hhdFBhcnRpY2lwYW50U3RhdHVzO1xuICAgIHB1YmxpYyBNZXNzYWdlVHlwZSA9IE1lc3NhZ2VUeXBlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYWRhcHRlcjogQ2hhdEFkYXB0ZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBncm91cEFkYXB0ZXI6IElDaGF0R3JvdXBBZGFwdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdXNlcklkOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWF4aW1pemVXaW5kb3dPbk5ld01lc3NhZ2U6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgICAgXG4gICAgcHVibGljIHBvbGxGcmllbmRzTGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcG9sbGluZ0ludGVydmFsOiBudW1iZXIgPSA1MDAwO1xuXG4gICAgQElucHV0KCkgICAgXG4gICAgcHVibGljIGhpc3RvcnlFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpICAgIFxuICAgIHB1YmxpYyBlbW9qaXNFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpICAgIFxuICAgIHB1YmxpYyBsaW5rZnlFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF1ZGlvRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWFyY2hFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIC8vIFRPRE86IFRoaXMgbWlnaHQgbmVlZCBhIGJldHRlciBjb250ZW50IHN0cmF0ZWd5XG4gICAgcHVibGljIGF1ZGlvU291cmNlOiBzdHJpbmcgPSAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3JwYXNjaG9hbC9uZy1jaGF0L21hc3Rlci9zcmMvbmctY2hhdC9hc3NldHMvbm90aWZpY2F0aW9uLndhdic7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwZXJzaXN0V2luZG93c1N0YXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSBcIkZyaWVuZHNcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lc3NhZ2VQbGFjZWhvbGRlcjogc3RyaW5nID0gXCJUeXBlIGEgbWVzc2FnZVwiO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VhcmNoUGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiU2VhcmNoXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBicm93c2VyTm90aWZpY2F0aW9uc0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgLy8gVE9ETzogVGhpcyBtaWdodCBuZWVkIGEgYmV0dGVyIGNvbnRlbnQgc3RyYXRlZ3lcbiAgICBwdWJsaWMgYnJvd3Nlck5vdGlmaWNhdGlvbkljb25Tb3VyY2U6IHN0cmluZyA9ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcnBhc2Nob2FsL25nLWNoYXQvbWFzdGVyL3NyYy9uZy1jaGF0L2Fzc2V0cy9ub3RpZmljYXRpb24ucG5nJztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGJyb3dzZXJOb3RpZmljYXRpb25UaXRsZTogc3RyaW5nID0gXCJOZXcgbWVzc2FnZSBmcm9tXCI7XG4gICAgXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGlzdG9yeVBhZ2VTaXplOiBudW1iZXIgPSAxMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGxvY2FsaXphdGlvbjogTG9jYWxpemF0aW9uO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGlkZUZyaWVuZHNMaXN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoaWRlRnJpZW5kc0xpc3RPblVuc3VwcG9ydGVkVmlld3BvcnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsZVVwbG9hZFVybDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGhlbWU6IFRoZW1lID0gVGhlbWUuTGlnaHQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjdXN0b21UaGVtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWVzc2FnZURhdGVQaXBlRm9ybWF0OiBzdHJpbmcgPSBcInNob3J0XCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzaG93TWVzc2FnZURhdGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzVmlld3BvcnRPbk1vYmlsZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uUGFydGljaXBhbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8SUNoYXRQYXJ0aWNpcGFudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElDaGF0UGFydGljaXBhbnQ+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25QYXJ0aWNpcGFudENoYXRPcGVuZWQ6IEV2ZW50RW1pdHRlcjxJQ2hhdFBhcnRpY2lwYW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SUNoYXRQYXJ0aWNpcGFudD4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblBhcnRpY2lwYW50Q2hhdENsb3NlZDogRXZlbnRFbWl0dGVyPElDaGF0UGFydGljaXBhbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJQ2hhdFBhcnRpY2lwYW50PigpO1xuICAgIFxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbk1lc3NhZ2VzU2VlbjogRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4oKTtcblxuICAgIHByaXZhdGUgYnJvd3Nlck5vdGlmaWNhdGlvbnNCb290c3RyYXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBoYXNQYWdlZEhpc3Rvcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIERvbid0IHdhbnQgdG8gYWRkIHRoaXMgYXMgYSBzZXR0aW5nIHRvIHNpbXBsaWZ5IHVzYWdlLiBQcmV2aW91cyBwbGFjZWhvbGRlciBhbmQgdGl0bGUgc2V0dGluZ3MgYXZhaWxhYmxlIHRvIGJlIHVzZWQsIG9yIHVzZSBmdWxsIExvY2FsaXphdGlvbiBvYmplY3QuXG4gICAgcHJpdmF0ZSBzdGF0dXNEZXNjcmlwdGlvbjogU3RhdHVzRGVzY3JpcHRpb24gPSB7XG4gICAgICAgIG9ubGluZTogJ09ubGluZScsXG4gICAgICAgIGJ1c3k6ICdCdXN5JyxcbiAgICAgICAgYXdheTogJ0F3YXknLFxuICAgICAgICBvZmZsaW5lOiAnT2ZmbGluZSdcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBhdWRpb0ZpbGU6IEhUTUxBdWRpb0VsZW1lbnQ7XG5cbiAgICBwdWJsaWMgc2VhcmNoSW5wdXQ6IHN0cmluZyA9ICcnO1xuXG4gICAgcHJvdGVjdGVkIHBhcnRpY2lwYW50czogSUNoYXRQYXJ0aWNpcGFudFtdO1xuXG4gICAgcHJvdGVjdGVkIHBhcnRpY2lwYW50c1Jlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlW107XG5cbiAgICBwcml2YXRlIHBhcnRpY2lwYW50c0ludGVyYWN0ZWRXaXRoOiBJQ2hhdFBhcnRpY2lwYW50W10gPSBbXTtcblxuICAgIHB1YmxpYyBjdXJyZW50QWN0aXZlT3B0aW9uOiBJQ2hhdE9wdGlvbiB8IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgc2VsZWN0ZWRVc2Vyc0Zyb21GcmllbmRzTGlzdDogVXNlcltdID0gW107XG5cbiAgICBwdWJsaWMgZGVmYXVsdFdpbmRvd09wdGlvbnMoY3VycmVudFdpbmRvdzogV2luZG93KTogSUNoYXRPcHRpb25bXVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBBZGFwdGVyICYmIGN1cnJlbnRXaW5kb3cucGFydGljaXBhbnQucGFydGljaXBhbnRUeXBlID09IENoYXRQYXJ0aWNpcGFudFR5cGUuVXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGNoYXR0aW5nV2luZG93OiBXaW5kb3cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2Vyc0Zyb21GcmllbmRzTGlzdCA9IHRoaXMuc2VsZWN0ZWRVc2Vyc0Zyb21GcmllbmRzTGlzdC5jb25jYXQoY2hhdHRpbmdXaW5kb3cucGFydGljaXBhbnQgYXMgVXNlcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUNvbnRleHQ6IChwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFydGljaXBhbnQucGFydGljaXBhbnRUeXBlID09IENoYXRQYXJ0aWNpcGFudFR5cGUuVXNlcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3BsYXlMYWJlbDogJ0FkZCBQZW9wbGUnIC8vIFRPRE86IExvY2FsaXplIHRoaXNcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGxvY2FsU3RvcmFnZUtleSgpOiBzdHJpbmcgXG4gICAge1xuICAgICAgICByZXR1cm4gYG5nLWNoYXQtdXNlcnMtJHt0aGlzLnVzZXJJZH1gOyAvLyBBcHBlbmRpbmcgdGhlIHVzZXIgaWQgc28gdGhlIHN0YXRlIGlzIHVuaXF1ZSBwZXIgdXNlciBpbiBhIGNvbXB1dGVyLiAgIFxuICAgIH07IFxuXG4gICAgZ2V0IGZpbHRlcmVkUGFydGljaXBhbnRzKCk6IElDaGF0UGFydGljaXBhbnRbXVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAvLyBTZWFyY2hlcyBpbiB0aGUgZnJpZW5kIGxpc3QgYnkgdGhlIGlucHV0dGVkIHNlYXJjaCBzdHJpbmdcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnRpY2lwYW50cy5maWx0ZXIoeCA9PiB4LmRpc3BsYXlOYW1lLnRvVXBwZXJDYXNlKCkuaW5jbHVkZXModGhpcy5zZWFyY2hJbnB1dC50b1VwcGVyQ2FzZSgpKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWNpcGFudHM7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lcyB0aGUgc2l6ZSBvZiBlYWNoIG9wZW5lZCB3aW5kb3cgdG8gY2FsY3VsYXRlIGhvdyBtYW55IHdpbmRvd3MgY2FuIGJlIG9wZW5lZCBvbiB0aGUgdmlld3BvcnQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICBwdWJsaWMgd2luZG93U2l6ZUZhY3RvcjogbnVtYmVyID0gMzIwO1xuXG4gICAgLy8gVG90YWwgd2lkdGggc2l6ZSBvZiB0aGUgZnJpZW5kcyBsaXN0IHNlY3Rpb25cbiAgICBwdWJsaWMgZnJpZW5kc0xpc3RXaWR0aDogbnVtYmVyID0gMjYyO1xuXG4gICAgLy8gQXZhaWxhYmxlIGFyZWEgdG8gcmVuZGVyIHRoZSBwbHVnaW5cbiAgICBwcml2YXRlIHZpZXdQb3J0VG90YWxBcmVhOiBudW1iZXI7XG4gICAgXG4gICAgLy8gU2V0IHRvIHRydWUgaWYgdGhlcmUgaXMgbm8gc3BhY2UgdG8gZGlzcGxheSBhdCBsZWFzdCBvbmUgY2hhdCB3aW5kb3cgYW5kICdoaWRlRnJpZW5kc0xpc3RPblVuc3VwcG9ydGVkVmlld3BvcnQnIGlzIHRydWVcbiAgICBwdWJsaWMgdW5zdXBwb3J0ZWRWaWV3cG9ydDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRmlsZSB1cGxvYWQgc3RhdGVcbiAgICBwdWJsaWMgZmlsZVVwbG9hZGVyc0luVXNlOiBzdHJpbmdbXSA9IFtdOyAvLyBJZCBidWNrZXQgb2YgdXBsb2FkZXJzIGluIHVzZVxuICAgIHB1YmxpYyBmaWxlVXBsb2FkQWRhcHRlcjogSUZpbGVVcGxvYWRBZGFwdGVyO1xuXG4gICAgd2luZG93czogV2luZG93W10gPSBbXTtcblxuICAgIGlzQm9vdHN0cmFwcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkcmVuKCdjaGF0TWVzc2FnZXMnKSBjaGF0TWVzc2FnZUNsdXN0ZXJzOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkcmVuKCdjaGF0V2luZG93SW5wdXQnKSBjaGF0V2luZG93SW5wdXRzOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkcmVuKCduYXRpdmVGaWxlSW5wdXQnKSBuYXRpdmVGaWxlSW5wdXRzOiBFbGVtZW50UmVmW107XG5cbiAgICBuZ09uSW5pdCgpIHsgXG4gICAgICAgIHRoaXMuYm9vdHN0cmFwQ2hhdCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpe1xuICAgICAgIHRoaXMudmlld1BvcnRUb3RhbEFyZWEgPSBldmVudC50YXJnZXQuaW5uZXJXaWR0aDtcblxuICAgICAgIHRoaXMuTm9ybWFsaXplV2luZG93cygpO1xuICAgIH1cblxuICAgIC8vIENoZWNrcyBpZiB0aGVyZSBhcmUgbW9yZSBvcGVuZWQgd2luZG93cyB0aGFuIHRoZSB2aWV3IHBvcnQgY2FuIGRpc3BsYXlcbiAgICBwcml2YXRlIE5vcm1hbGl6ZVdpbmRvd3MoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IG1heFN1cHBvcnRlZE9wZW5lZFdpbmRvd3MgPSBNYXRoLmZsb29yKCh0aGlzLnZpZXdQb3J0VG90YWxBcmVhIC0gKCF0aGlzLmhpZGVGcmllbmRzTGlzdCA/IHRoaXMuZnJpZW5kc0xpc3RXaWR0aCA6IDApKSAvIHRoaXMud2luZG93U2l6ZUZhY3Rvcik7XG4gICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy53aW5kb3dzLmxlbmd0aCAtIG1heFN1cHBvcnRlZE9wZW5lZFdpbmRvd3M7XG5cbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPj0gMCl7XG4gICAgICAgICAgICB0aGlzLndpbmRvd3Muc3BsaWNlKHRoaXMud2luZG93cy5sZW5ndGggLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlV2luZG93c1N0YXRlKHRoaXMud2luZG93cyk7XG5cbiAgICAgICAgLy8gVmlld3BvcnQgc2hvdWxkIGhhdmUgc3BhY2UgZm9yIGF0IGxlYXN0IG9uZSBjaGF0IHdpbmRvdyBidXQgc2hvdWxkIHNob3cgaW4gbW9iaWxlIGlmIG9wdGlvbiBpcyBlbmFibGVkLlxuICAgICAgICB0aGlzLnVuc3VwcG9ydGVkVmlld3BvcnQgPSB0aGlzLmlzVmlld3BvcnRPbk1vYmlsZUVuYWJsZWQ/IGZhbHNlIDogdGhpcy5oaWRlRnJpZW5kc0xpc3RPblVuc3VwcG9ydGVkVmlld3BvcnQgJiYgbWF4U3VwcG9ydGVkT3BlbmVkV2luZG93cyA8IDE7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIGNoYXQgcGx1Z2luIGFuZCB0aGUgbWVzc2FnaW5nIGFkYXB0ZXJcbiAgICBwcml2YXRlIGJvb3RzdHJhcENoYXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGluaXRpYWxpemF0aW9uRXhjZXB0aW9uID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5hZGFwdGVyICE9IG51bGwgJiYgdGhpcy51c2VySWQgIT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3UG9ydFRvdGFsQXJlYSA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVGhlbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVEZWZhdWx0VGV4dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUJyb3dzZXJOb3RpZmljYXRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBCaW5kaW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlci5tZXNzYWdlUmVjZWl2ZWRIYW5kbGVyID0gKHBhcnRpY2lwYW50LCBtc2cpID0+IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQocGFydGljaXBhbnQsIG1zZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmZyaWVuZHNMaXN0Q2hhbmdlZEhhbmRsZXIgPSAocGFydGljaXBhbnRzUmVzcG9uc2UpID0+IHRoaXMub25GcmllbmRzTGlzdENoYW5nZWQocGFydGljaXBhbnRzUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gTG9hZGluZyBjdXJyZW50IHVzZXJzIGxpc3RcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2xsRnJpZW5kc0xpc3Qpe1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXR0aW5nIGEgbG9uZyBwb2xsIGludGVydmFsIHRvIHVwZGF0ZSB0aGUgZnJpZW5kcyBsaXN0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hGcmllbmRzTGlzdCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5mZXRjaEZyaWVuZHNMaXN0KGZhbHNlKSwgdGhpcy5wb2xsaW5nSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSBwb2xsaW5nIHdhcyBkaXNhYmxlZCwgYSBmcmllbmRzIGxpc3QgdXBkYXRlIG1lY2hhbmlzbSB3aWxsIGhhdmUgdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIENoYXRBZGFwdGVyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoRnJpZW5kc0xpc3QodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyQXVkaW9GaWxlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhc1BhZ2VkSGlzdG9yeSA9IHRoaXMuYWRhcHRlciBpbnN0YW5jZW9mIFBhZ2VkSGlzdG9yeUNoYXRBZGFwdGVyO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWRVcmwgJiYgdGhpcy5maWxlVXBsb2FkVXJsICE9PSBcIlwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkQWRhcHRlciA9IG5ldyBEZWZhdWx0RmlsZVVwbG9hZEFkYXB0ZXIodGhpcy5maWxlVXBsb2FkVXJsLCB0aGlzLl9odHRwQ2xpZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vdHN0cmFwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGV4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemF0aW9uRXhjZXB0aW9uID0gZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNCb290c3RyYXBwZWQpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm5nLWNoYXQgY29tcG9uZW50IGNvdWxkbid0IGJlIGJvb3RzdHJhcHBlZC5cIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJZCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmctY2hhdCBjYW4ndCBiZSBpbml0aWFsaXplZCB3aXRob3V0IGFuIHVzZXIgaWQuIFBsZWFzZSBtYWtlIHN1cmUgeW91J3ZlIHByb3ZpZGVkIGFuIHVzZXJJZCBhcyBhIHBhcmFtZXRlciBvZiB0aGUgbmctY2hhdCBjb21wb25lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYWRhcHRlciA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmctY2hhdCBjYW4ndCBiZSBib290c3RyYXBwZWQgd2l0aG91dCBhIENoYXRBZGFwdGVyLiBQbGVhc2UgbWFrZSBzdXJlIHlvdSd2ZSBwcm92aWRlZCBhIENoYXRBZGFwdGVyIGltcGxlbWVudGF0aW9uIGFzIGEgcGFyYW1ldGVyIG9mIHRoZSBuZy1jaGF0IGNvbXBvbmVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5pdGlhbGl6YXRpb25FeGNlcHRpb24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQW4gZXhjZXB0aW9uIGhhcyBvY2N1cnJlZCB3aGlsZSBpbml0aWFsaXppbmcgbmctY2hhdC4gRGV0YWlsczogJHtpbml0aWFsaXphdGlvbkV4Y2VwdGlvbi5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoaW5pdGlhbGl6YXRpb25FeGNlcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZXMgYnJvd3NlciBub3RpZmljYXRpb25zXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0aWFsaXplQnJvd3Nlck5vdGlmaWNhdGlvbnMoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuYnJvd3Nlck5vdGlmaWNhdGlvbnNFbmFibGVkICYmIChcIk5vdGlmaWNhdGlvblwiIGluIHdpbmRvdykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChhd2FpdCBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJOb3RpZmljYXRpb25zQm9vdHN0cmFwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemVzIGRlZmF1bHQgdGV4dFxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZURlZmF1bHRUZXh0KCkgOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlUGxhY2Vob2xkZXI6IHRoaXMubWVzc2FnZVBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiB0aGlzLnNlYXJjaFBsYWNlaG9sZGVyLCBcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgICAgICAgICAgICBzdGF0dXNEZXNjcmlwdGlvbjogdGhpcy5zdGF0dXNEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBicm93c2VyTm90aWZpY2F0aW9uVGl0bGU6IHRoaXMuYnJvd3Nlck5vdGlmaWNhdGlvblRpdGxlLFxuICAgICAgICAgICAgICAgIGxvYWRNZXNzYWdlSGlzdG9yeVBsYWNlaG9sZGVyOiBcIkxvYWQgb2xkZXIgbWVzc2FnZXNcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVRoZW1lKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbVRoZW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRoZW1lID0gVGhlbWUuQ3VzdG9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGhlbWUgIT0gVGhlbWUuTGlnaHQgJiYgdGhpcy50aGVtZSAhPSBUaGVtZS5EYXJrKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUT0RPOiBVc2UgZXMyMDE3IGluIGZ1dHVyZSB3aXRoIE9iamVjdC52YWx1ZXMoVGhlbWUpLmluY2x1ZGVzKHRoaXMudGhlbWUpIHRvIGRvIHRoaXMgY2hlY2tcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0aGVtZSBjb25maWd1cmF0aW9uIGZvciBuZy1jaGF0LiBcIiR7dGhpcy50aGVtZX1cIiBpcyBub3QgYSB2YWxpZCB0aGVtZSB2YWx1ZS5gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNlbmRzIGEgcmVxdWVzdCB0byBsb2FkIHRoZSBmcmllbmRzIGxpc3RcbiAgICBwcml2YXRlIGZldGNoRnJpZW5kc0xpc3QoaXNCb290c3RyYXBwaW5nOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmxpc3RGcmllbmRzKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHBhcnRpY2lwYW50c1Jlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlW10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2lwYW50c1Jlc3BvbnNlID0gcGFydGljaXBhbnRzUmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2lwYW50cyA9IHBhcnRpY2lwYW50c1Jlc3BvbnNlLm1hcCgocmVzcG9uc2U6IFBhcnRpY2lwYW50UmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnBhcnRpY2lwYW50O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQm9vdHN0cmFwcGluZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVXaW5kb3dzU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmV0Y2hNZXNzYWdlSGlzdG9yeSh3aW5kb3c6IFdpbmRvdykge1xuICAgICAgICAvLyBOb3QgaWRlYWwgYnV0IHdpbGwga2VlcCB0aGlzIHVudGlsIHdlIGRlY2lkZSBpZiB3ZSBhcmUgc2hpcHBpbmcgcGFnaW5hdGlvbiB3aXRoIHRoZSBkZWZhdWx0IGFkYXB0ZXJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlciBpbnN0YW5jZW9mIFBhZ2VkSGlzdG9yeUNoYXRBZGFwdGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICB3aW5kb3cuaXNMb2FkaW5nSGlzdG9yeSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5nZXRNZXNzYWdlSGlzdG9yeUJ5UGFnZSh3aW5kb3cucGFydGljaXBhbnQuaWQsIHRoaXMuaGlzdG9yeVBhZ2VTaXplLCArK3dpbmRvdy5oaXN0b3J5UGFnZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzdWx0OiBNZXNzYWdlW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKG1lc3NhZ2UpID0+IHRoaXMuYXNzZXJ0TWVzc2FnZVR5cGUobWVzc2FnZSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1lc3NhZ2VzID0gcmVzdWx0LmNvbmNhdCh3aW5kb3cubWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaXNMb2FkaW5nSGlzdG9yeSA9IGZhbHNlO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbiA9ICh3aW5kb3cuaGlzdG9yeVBhZ2UgPT0gMSkgPyBTY3JvbGxEaXJlY3Rpb24uQm90dG9tIDogU2Nyb2xsRGlyZWN0aW9uLlRvcDtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhhc01vcmVNZXNzYWdlcyA9IHJlc3VsdC5sZW5ndGggPT0gdGhpcy5oaXN0b3J5UGFnZVNpemU7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25GZXRjaE1lc3NhZ2VIaXN0b3J5TG9hZGVkKHJlc3VsdCwgd2luZG93LCBkaXJlY3Rpb24sIHRydWUpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5nZXRNZXNzYWdlSGlzdG9yeSh3aW5kb3cucGFydGljaXBhbnQuaWQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKHJlc3VsdDogTWVzc2FnZVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChtZXNzYWdlKSA9PiB0aGlzLmFzc2VydE1lc3NhZ2VUeXBlKG1lc3NhZ2UpKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1lc3NhZ2VzID0gcmVzdWx0LmNvbmNhdCh3aW5kb3cubWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaXNMb2FkaW5nSGlzdG9yeSA9IGZhbHNlO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25GZXRjaE1lc3NhZ2VIaXN0b3J5TG9hZGVkKHJlc3VsdCwgd2luZG93LCBTY3JvbGxEaXJlY3Rpb24uQm90dG9tKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmV0Y2hNZXNzYWdlSGlzdG9yeUxvYWRlZChtZXNzYWdlczogTWVzc2FnZVtdLCB3aW5kb3c6IFdpbmRvdywgZGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24sIGZvcmNlTWFya01lc3NhZ2VzQXNTZWVuOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIFxuICAgIHtcbiAgICAgICAgdGhpcy5zY3JvbGxDaGF0V2luZG93KHdpbmRvdywgZGlyZWN0aW9uKVxuXG4gICAgICAgIGlmICh3aW5kb3cuaGFzRm9jdXMgfHwgZm9yY2VNYXJrTWVzc2FnZXNBc1NlZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHVuc2Vlbk1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKG0gPT4gIW0uZGF0ZVNlZW4pO1xuXG4gICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlc0FzUmVhZCh1bnNlZW5NZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLm9uTWVzc2FnZXNTZWVuLmVtaXQodW5zZWVuTWVzc2FnZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgZnJpZW5kcyBsaXN0IHZpYSB0aGUgZXZlbnQgaGFuZGxlclxuICAgIHByaXZhdGUgb25GcmllbmRzTGlzdENoYW5nZWQocGFydGljaXBhbnRzUmVzcG9uc2U6IFBhcnRpY2lwYW50UmVzcG9uc2VbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChwYXJ0aWNpcGFudHNSZXNwb25zZSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljaXBhbnRzUmVzcG9uc2UgPSBwYXJ0aWNpcGFudHNSZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMgPSBwYXJ0aWNpcGFudHNSZXNwb25zZS5tYXAoKHJlc3BvbnNlOiBQYXJ0aWNpcGFudFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnBhcnRpY2lwYW50O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGFydGljaXBhbnRzSW50ZXJhY3RlZFdpdGggPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgcmVjZWl2ZWQgbWVzc2FnZXMgYnkgdGhlIGFkYXB0ZXJcbiAgICBwcml2YXRlIG9uTWVzc2FnZVJlY2VpdmVkKHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50LCBtZXNzYWdlOiBNZXNzYWdlKVxuICAgIHtcbiAgICAgICAgaWYgKHBhcnRpY2lwYW50ICYmIG1lc3NhZ2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBjaGF0V2luZG93ID0gdGhpcy5vcGVuQ2hhdFdpbmRvdyhwYXJ0aWNpcGFudCk7XG5cbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0TWVzc2FnZVR5cGUobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGlmICghY2hhdFdpbmRvd1sxXSB8fCAhdGhpcy5oaXN0b3J5RW5hYmxlZCl7XG4gICAgICAgICAgICAgICAgY2hhdFdpbmRvd1swXS5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxDaGF0V2luZG93KGNoYXRXaW5kb3dbMF0sIFNjcm9sbERpcmVjdGlvbi5Cb3R0b20pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoYXRXaW5kb3dbMF0uaGFzRm9jdXMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlc0FzUmVhZChbbWVzc2FnZV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZXNTZWVuLmVtaXQoW21lc3NhZ2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdE1lc3NhZ2VTb3VuZChjaGF0V2luZG93WzBdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR2l0aHViIGlzc3VlICM1OCBcbiAgICAgICAgICAgIC8vIERvIG5vdCBwdXNoIGJyb3dzZXIgbm90aWZpY2F0aW9ucyB3aXRoIG1lc3NhZ2UgY29udGVudCBmb3IgcHJpdmFjeSBwdXJwb3NlcyBpZiB0aGUgJ21heGltaXplV2luZG93T25OZXdNZXNzYWdlJyBzZXR0aW5nIGlzIG9mZiBhbmQgdGhpcyBpcyBhIG5ldyBjaGF0IHdpbmRvdy5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heGltaXplV2luZG93T25OZXdNZXNzYWdlIHx8ICghY2hhdFdpbmRvd1sxXSAmJiAhY2hhdFdpbmRvd1swXS5pc0NvbGxhcHNlZCkpXG4gICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIC8vIFNvbWUgbWVzc2FnZXMgYXJlIG5vdCBwdXNoZWQgYmVjYXVzZSB0aGV5IGFyZSBsb2FkZWQgYnkgZmV0Y2hpbmcgdGhlIGhpc3RvcnkgaGVuY2Ugd2h5IHdlIHN1cHBseSB0aGUgbWVzc2FnZSBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0QnJvd3Nlck5vdGlmaWNhdGlvbihjaGF0V2luZG93WzBdLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9wZW5zIGEgbmV3IGNoYXQgd2hpbmRvdy4gVGFrZXMgY2FyZSBvZiBhdmFpbGFibGUgdmlld3BvcnRcbiAgICAvLyBXb3JrcyBmb3Igb3BlbmluZyBhIGNoYXQgd2luZG93IGZvciBhbiB1c2VyIG9yIGZvciBhIGdyb3VwXG4gICAgLy8gUmV0dXJucyA9PiBbV2luZG93OiBXaW5kb3cgb2JqZWN0IHJlZmVyZW5jZSwgYm9vbGVhbjogSW5kaWNhdGVzIGlmIHRoaXMgd2luZG93IGlzIGEgbmV3IGNoYXQgd2luZG93XVxuICAgIHB1YmxpYyBvcGVuQ2hhdFdpbmRvdyhwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCwgZm9jdXNPbk5ld1dpbmRvdzogYm9vbGVhbiA9IGZhbHNlLCBpbnZva2VkQnlVc2VyQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZSk6IFtXaW5kb3csIGJvb2xlYW5dXG4gICAge1xuICAgICAgICAvLyBJcyB0aGlzIHdpbmRvdyBvcGVuZWQ/XG4gICAgICAgIGxldCBvcGVuZWRXaW5kb3cgPSB0aGlzLndpbmRvd3MuZmluZCh4ID0+IHgucGFydGljaXBhbnQuaWQgPT0gcGFydGljaXBhbnQuaWQpO1xuXG4gICAgICAgIGlmICghb3BlbmVkV2luZG93KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaW52b2tlZEJ5VXNlckNsaWNrKSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFydGljaXBhbnRDbGlja2VkLmVtaXQocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZWZlciB0byBpc3N1ZSAjNTggb24gR2l0aHViIFxuICAgICAgICAgICAgbGV0IGNvbGxhcHNlV2luZG93ID0gaW52b2tlZEJ5VXNlckNsaWNrID8gZmFsc2UgOiAhdGhpcy5tYXhpbWl6ZVdpbmRvd09uTmV3TWVzc2FnZTtcblxuICAgICAgICAgICAgbGV0IG5ld0NoYXRXaW5kb3c6IFdpbmRvdyA9IG5ldyBXaW5kb3cocGFydGljaXBhbnQsIHRoaXMuaGlzdG9yeUVuYWJsZWQsIGNvbGxhcHNlV2luZG93KTtcblxuICAgICAgICAgICAgLy8gTG9hZHMgdGhlIGNoYXQgaGlzdG9yeSB2aWEgYW4gUnhKcyBPYnNlcnZhYmxlXG4gICAgICAgICAgICBpZiAodGhpcy5oaXN0b3J5RW5hYmxlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoTWVzc2FnZUhpc3RvcnkobmV3Q2hhdFdpbmRvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMud2luZG93cy51bnNoaWZ0KG5ld0NoYXRXaW5kb3cpO1xuXG4gICAgICAgICAgICAvLyBJcyB0aGVyZSBlbm91Z2ggc3BhY2UgbGVmdCBpbiB0aGUgdmlldyBwb3J0ID8gYnV0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gbW9iaWxlIGlmIG9wdGlvbiBpcyBlbmFibGVkXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaWV3cG9ydE9uTW9iaWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndpbmRvd3MubGVuZ3RoICogdGhpcy53aW5kb3dTaXplRmFjdG9yID49IHRoaXMudmlld1BvcnRUb3RhbEFyZWEgLSAoIXRoaXMuaGlkZUZyaWVuZHNMaXN0ID8gdGhpcy5mcmllbmRzTGlzdFdpZHRoIDogMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dzU3RhdGUodGhpcy53aW5kb3dzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGZvY3VzT25OZXdXaW5kb3cgJiYgIWNvbGxhcHNlV2luZG93KSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25XaW5kb3cobmV3Q2hhdFdpbmRvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGFydGljaXBhbnRzSW50ZXJhY3RlZFdpdGgucHVzaChwYXJ0aWNpcGFudCk7XG4gICAgICAgICAgICB0aGlzLm9uUGFydGljaXBhbnRDaGF0T3BlbmVkLmVtaXQocGFydGljaXBhbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gW25ld0NoYXRXaW5kb3csIHRydWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmV0dXJucyB0aGUgZXhpc3RpbmcgY2hhdCB3aW5kb3cgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFtvcGVuZWRXaW5kb3csIGZhbHNlXTsgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGb2N1cyBvbiB0aGUgaW5wdXQgZWxlbWVudCBvZiB0aGUgc3VwcGxpZWQgd2luZG93XG4gICAgcHJpdmF0ZSBmb2N1c09uV2luZG93KHdpbmRvdzogV2luZG93LCBjYWxsYmFjazogRnVuY3Rpb24gPSAoKSA9PiB7fSkgOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgd2luZG93SW5kZXggPSB0aGlzLndpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xuICAgICAgICBpZiAod2luZG93SW5kZXggPj0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhdFdpbmRvd0lucHV0cylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlSW5wdXRUb0ZvY3VzID0gdGhpcy5jaGF0V2luZG93SW5wdXRzLnRvQXJyYXkoKVt3aW5kb3dJbmRleF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VJbnB1dFRvRm9jdXMubmF0aXZlRWxlbWVudC5mb2N1cygpOyBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpOyBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIC8vIFNjcm9sbHMgYSBjaGF0IHdpbmRvdyBtZXNzYWdlIGZsb3cgdG8gdGhlIGJvdHRvbVxuICAgIHByaXZhdGUgc2Nyb2xsQ2hhdFdpbmRvdyh3aW5kb3c6IFdpbmRvdywgZGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIXdpbmRvdy5pc0NvbGxhcHNlZCl7XG4gICAgICAgICAgICBsZXQgd2luZG93SW5kZXggPSB0aGlzLndpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhdE1lc3NhZ2VDbHVzdGVycyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRXaW5kb3cgPSB0aGlzLmNoYXRNZXNzYWdlQ2x1c3RlcnMudG9BcnJheSgpW3dpbmRvd0luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0V2luZG93KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuY2hhdE1lc3NhZ2VDbHVzdGVycy50b0FycmF5KClbd2luZG93SW5kZXhdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSAoIGRpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlRvcCApID8gMCA6IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1hcmtzIGFsbCBtZXNzYWdlcyBwcm92aWRlZCBhcyByZWFkIHdpdGggdGhlIGN1cnJlbnQgdGltZS5cbiAgICBwdWJsaWMgbWFya01lc3NhZ2VzQXNSZWFkKG1lc3NhZ2VzOiBNZXNzYWdlW10pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1zZyk9PntcbiAgICAgICAgICAgIG1zZy5kYXRlU2VlbiA9IGN1cnJlbnREYXRlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBCdWZmZXJzIGF1ZGlvIGZpbGUgKEZvciBjb21wb25lbnQncyBib290c3RyYXBwaW5nKVxuICAgIHByaXZhdGUgYnVmZmVyQXVkaW9GaWxlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hdWRpb1NvdXJjZSAmJiB0aGlzLmF1ZGlvU291cmNlLmxlbmd0aCA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9GaWxlID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvRmlsZS5zcmMgPSB0aGlzLmF1ZGlvU291cmNlO1xuICAgICAgICAgICAgdGhpcy5hdWRpb0ZpbGUubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW1pdHMgYSBtZXNzYWdlIG5vdGlmaWNhdGlvbiBhdWRpbyBpZiBlbmFibGVkIGFmdGVyIGV2ZXJ5IG1lc3NhZ2UgcmVjZWl2ZWRcbiAgICBwcml2YXRlIGVtaXRNZXNzYWdlU291bmQod2luZG93OiBXaW5kb3cpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5hdWRpb0VuYWJsZWQgJiYgIXdpbmRvdy5oYXNGb2N1cyAmJiB0aGlzLmF1ZGlvRmlsZSkge1xuICAgICAgICAgICAgdGhpcy5hdWRpb0ZpbGUucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW1pdHMgYSBicm93c2VyIG5vdGlmaWNhdGlvblxuICAgIHByaXZhdGUgZW1pdEJyb3dzZXJOb3RpZmljYXRpb24od2luZG93OiBXaW5kb3csIG1lc3NhZ2U6IE1lc3NhZ2UpOiB2b2lkXG4gICAgeyAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYnJvd3Nlck5vdGlmaWNhdGlvbnNCb290c3RyYXBwZWQgJiYgIXdpbmRvdy5oYXNGb2N1cyAmJiBtZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihgJHt0aGlzLmxvY2FsaXphdGlvbi5icm93c2VyTm90aWZpY2F0aW9uVGl0bGV9ICR7d2luZG93LnBhcnRpY2lwYW50LmRpc3BsYXlOYW1lfWAsIHtcbiAgICAgICAgICAgICAgICAnYm9keSc6IG1lc3NhZ2UubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAnaWNvbic6IHRoaXMuYnJvd3Nlck5vdGlmaWNhdGlvbkljb25Tb3VyY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICAgICAgICAgIH0sIG1lc3NhZ2UubWVzc2FnZS5sZW5ndGggPD0gNTAgPyA1MDAwIDogNzAwMCk7IC8vIE1vcmUgdGltZSB0byByZWFkIGxvbmdlciBtZXNzYWdlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2F2ZXMgY3VycmVudCB3aW5kb3dzIHN0YXRlIGludG8gbG9jYWwgc3RvcmFnZSBpZiBwZXJzaXN0ZW5jZSBpcyBlbmFibGVkXG4gICAgcHJpdmF0ZSB1cGRhdGVXaW5kb3dzU3RhdGUod2luZG93czogV2luZG93W10pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5wZXJzaXN0V2luZG93c1N0YXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcGFydGljaXBhbnRJZHMgPSB3aW5kb3dzLm1hcCgodykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB3LnBhcnRpY2lwYW50LmlkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShwYXJ0aWNpcGFudElkcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlV2luZG93c1N0YXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRyeVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5wZXJzaXN0V2luZG93c1N0YXRlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdmaWVkUGFydGljaXBhbnRJZHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nZmllZFBhcnRpY2lwYW50SWRzICYmIHN0cmluZ2ZpZWRQYXJ0aWNpcGFudElkcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRpY2lwYW50SWRzID0gPG51bWJlcltdPkpTT04ucGFyc2Uoc3RyaW5nZmllZFBhcnRpY2lwYW50SWRzKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFydGljaXBhbnRzVG9SZXN0b3JlID0gdGhpcy5wYXJ0aWNpcGFudHMuZmlsdGVyKHUgPT4gcGFydGljaXBhbnRJZHMuaW5kZXhPZih1LmlkKSA+PSAwKTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudHNUb1Jlc3RvcmUuZm9yRWFjaCgocGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkNoYXRXaW5kb3cocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZXN0b3JpbmcgbmctY2hhdCB3aW5kb3dzIHN0YXRlLiBEZXRhaWxzOiAke2V4fWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0cyBjbG9zZXN0IG9wZW4gd2luZG93IGlmIGFueS4gTW9zdCByZWNlbnQgb3BlbmVkIGhhcyBwcmlvcml0eSAoUmlnaHQpXG4gICAgcHJpdmF0ZSBnZXRDbG9zZXN0V2luZG93KHdpbmRvdzogV2luZG93KTogV2luZG93IHwgdW5kZWZpbmVkXG4gICAgeyAgIFxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndpbmRvd3NbaW5kZXggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PSAwICYmIHRoaXMud2luZG93cy5sZW5ndGggPiAxKVxuICAgICAgICB7ICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53aW5kb3dzW2luZGV4ICsgMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydE1lc3NhZ2VUeXBlKG1lc3NhZ2U6IE1lc3NhZ2UpOiB2b2lkIHtcbiAgICAgICAgLy8gQWx3YXlzIGZhbGxiYWNrIHRvIFwiVGV4dFwiIG1lc3NhZ2VzIHRvIGF2b2lkIHJlbmRlbnJpbmcgaXNzdWVzXG4gICAgICAgIGlmICghbWVzc2FnZS50eXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlLnR5cGUgPSBNZXNzYWdlVHlwZS5UZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRVbnJlYWRNZXNzYWdlc1RvdGFsKHRvdGFsVW5yZWFkTWVzc2FnZXM6IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHRvdGFsVW5yZWFkTWVzc2FnZXMgPiAwKXtcblxuICAgICAgICAgICAgaWYgKHRvdGFsVW5yZWFkTWVzc2FnZXMgPiA5OSkgXG4gICAgICAgICAgICAgICAgcmV0dXJuICBcIjk5K1wiO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcodG90YWxVbnJlYWRNZXNzYWdlcyk7IFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW1wdHkgZmFsbGJhY2suXG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIHRvdGFsIHVucmVhZCBtZXNzYWdlcyBmcm9tIGEgY2hhdCB3aW5kb3cuIFRPRE86IENvdWxkIHVzZSBzb21lIEFuZ3VsYXIgcGlwZXMgaW4gdGhlIGZ1dHVyZSBcbiAgICB1bnJlYWRNZXNzYWdlc1RvdGFsKHdpbmRvdzogV2luZG93KTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgdG90YWxVbnJlYWRNZXNzYWdlcyA9IDA7XG5cbiAgICAgICAgaWYgKHdpbmRvdyl7XG4gICAgICAgICAgICB0b3RhbFVucmVhZE1lc3NhZ2VzID0gd2luZG93Lm1lc3NhZ2VzLmZpbHRlcih4ID0+IHguZnJvbUlkICE9IHRoaXMudXNlcklkICYmICF4LmRhdGVTZWVuKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRVbnJlYWRNZXNzYWdlc1RvdGFsKHRvdGFsVW5yZWFkTWVzc2FnZXMpO1xuICAgIH1cblxuICAgIHVucmVhZE1lc3NhZ2VzVG90YWxCeVBhcnRpY2lwYW50KHBhcnRpY2lwYW50OiBJQ2hhdFBhcnRpY2lwYW50KTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgb3BlbmVkV2luZG93ID0gdGhpcy53aW5kb3dzLmZpbmQoeCA9PiB4LnBhcnRpY2lwYW50LmlkID09IHBhcnRpY2lwYW50LmlkKTtcblxuICAgICAgICBpZiAob3BlbmVkV2luZG93KXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVucmVhZE1lc3NhZ2VzVG90YWwob3BlbmVkV2luZG93KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB0b3RhbFVucmVhZE1lc3NhZ2VzID0gdGhpcy5wYXJ0aWNpcGFudHNSZXNwb25zZVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LnBhcnRpY2lwYW50LmlkID09IHBhcnRpY2lwYW50LmlkICYmICF0aGlzLnBhcnRpY2lwYW50c0ludGVyYWN0ZWRXaXRoLmZpbmQodSA9PiB1LmlkID09IHBhcnRpY2lwYW50LmlkKSAmJiB4Lm1ldGFkYXRhICYmIHgubWV0YWRhdGEudG90YWxVbnJlYWRNZXNzYWdlcyA+IDApXG4gICAgICAgICAgICAgICAgLm1hcCgocGFydGljaXBhbnRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFydGljaXBhbnRSZXNwb25zZS5tZXRhZGF0YS50b3RhbFVucmVhZE1lc3NhZ2VzXG4gICAgICAgICAgICAgICAgfSlbMF07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFVucmVhZE1lc3NhZ2VzVG90YWwodG90YWxVbnJlYWRNZXNzYWdlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiAgTW9uaXRvcnMgcHJlc3NlZCBrZXlzIG9uIGEgY2hhdCB3aW5kb3dcbiAgICAgICAgLSBEaXNwYXRjaGVzIGEgbWVzc2FnZSB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZFxuICAgICAgICAtIFRhYnMgYmV0d2VlbiB3aW5kb3dzIG9uIFRBQiBvciBTSElGVCArIFRBQlxuICAgICAgICAtIENsb3NlcyB0aGUgY3VycmVudCBmb2N1c2VkIHdpbmRvdyBvbiBFU0NcbiAgICAqL1xuICAgIG9uQ2hhdElucHV0VHlwZWQoZXZlbnQ6IGFueSwgd2luZG93OiBXaW5kb3cpOiB2b2lkXG4gICAge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5uZXdNZXNzYWdlICYmIHdpbmRvdy5uZXdNZXNzYWdlLnRyaW0oKSAhPSBcIlwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmZyb21JZCA9IHRoaXMudXNlcklkO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRvSWQgPSB3aW5kb3cucGFydGljaXBhbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9IHdpbmRvdy5uZXdNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmRhdGVTZW50ID0gbmV3IERhdGUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm5ld01lc3NhZ2UgPSBcIlwiOyAvLyBSZXNldHMgdGhlIG5ldyBtZXNzYWdlIGlucHV0XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbENoYXRXaW5kb3cod2luZG93LCBTY3JvbGxEaXJlY3Rpb24uQm90dG9tKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFdpbmRvd0luZGV4ID0gdGhpcy53aW5kb3dzLmluZGV4T2Yod2luZG93KTtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUlucHV0VG9Gb2N1cyA9IHRoaXMuY2hhdFdpbmRvd0lucHV0cy50b0FycmF5KClbY3VycmVudFdpbmRvd0luZGV4ICsgKGV2ZW50LnNoaWZ0S2V5ID8gMSA6IC0xKV07IC8vIEdvZXMgYmFjayBvbiBzaGlmdCArIHRhYlxuXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlSW5wdXRUb0ZvY3VzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRWRnZSB3aW5kb3dzLCBnbyB0byBzdGFydCBvciBlbmRcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUlucHV0VG9Gb2N1cyA9IHRoaXMuY2hhdFdpbmRvd0lucHV0cy50b0FycmF5KClbY3VycmVudFdpbmRvd0luZGV4ID4gMCA/IDAgOiB0aGlzLmNoYXRXaW5kb3dJbnB1dHMubGVuZ3RoIC0gMV07IFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lc3NhZ2VJbnB1dFRvRm9jdXMubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0V2luZG93ID0gdGhpcy5nZXRDbG9zZXN0V2luZG93KHdpbmRvdyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFdpbmRvdylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPbldpbmRvdyhjbG9zZXN0V2luZG93LCAoKSA9PiB7IHRoaXMub25DbG9zZUNoYXRXaW5kb3cod2luZG93KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZUNoYXRXaW5kb3cod2luZG93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDbG9zZXMgYSBjaGF0IHdpbmRvdyB2aWEgdGhlIGNsb3NlICdYJyBidXR0b25cbiAgICBvbkNsb3NlQ2hhdFdpbmRvdyh3aW5kb3c6IFdpbmRvdyk6IHZvaWQgXG4gICAge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xuXG4gICAgICAgIHRoaXMud2luZG93cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2luZG93c1N0YXRlKHRoaXMud2luZG93cyk7XG5cbiAgICAgICAgdGhpcy5vblBhcnRpY2lwYW50Q2hhdENsb3NlZC5lbWl0KHdpbmRvdy5wYXJ0aWNpcGFudCk7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIGZyaWVuZHMgbGlzdCB2aXNpYmlsaXR5XG4gICAgb25DaGF0VGl0bGVDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gIXRoaXMuaXNDb2xsYXBzZWQ7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlcyBhIGNoYXQgd2luZG93IHZpc2liaWxpdHkgYmV0d2VlbiBtYXhpbWl6ZWQvbWluaW1pemVkXG4gICAgb25DaGF0V2luZG93Q2xpY2tlZCh3aW5kb3c6IFdpbmRvdyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHdpbmRvdy5pc0NvbGxhcHNlZCA9ICF3aW5kb3cuaXNDb2xsYXBzZWQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsQ2hhdFdpbmRvdyh3aW5kb3csIFNjcm9sbERpcmVjdGlvbi5Cb3R0b20pO1xuICAgIH1cblxuICAgIC8vIEFzc2VydHMgaWYgYSB1c2VyIGF2YXRhciBpcyB2aXNpYmxlIGluIGEgY2hhdCBjbHVzdGVyXG4gICAgaXNBdmF0YXJWaXNpYmxlKHdpbmRvdzogV2luZG93LCBtZXNzYWdlOiBNZXNzYWdlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZnJvbUlkICE9IHRoaXMudXNlcklkKXtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gRmlyc3QgbWVzc2FnZSwgZ29vZCB0byBzaG93IHRoZSB0aHVtYm5haWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByZXZpb3VzIG1lc3NhZ2UgYmVsb25ncyB0byB0aGUgc2FtZSB1c2VyLCBpZiBpdCBiZWxvbmdzIHRoZXJlIGlzIG5vIG5lZWQgdG8gc2hvdyB0aGUgYXZhdGFyIGFnYWluIHRvIGZvcm0gdGhlIG1lc3NhZ2UgY2x1c3RlclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWVzc2FnZXNbaW5kZXggLSAxXS5mcm9tSWQgIT0gbWVzc2FnZS5mcm9tSWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q2hhdFdpbmRvd0F2YXRhcihwYXJ0aWNpcGFudDogSUNoYXRQYXJ0aWNpcGFudCwgbWVzc2FnZTogTWVzc2FnZSk6IHN0cmluZyB8IG51bGxcbiAgICB7XG4gICAgICAgIGlmIChwYXJ0aWNpcGFudC5wYXJ0aWNpcGFudFR5cGUgPT0gQ2hhdFBhcnRpY2lwYW50VHlwZS5Vc2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcGFydGljaXBhbnQuYXZhdGFyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcnRpY2lwYW50LnBhcnRpY2lwYW50VHlwZSA9PSBDaGF0UGFydGljaXBhbnRUeXBlLkdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSBwYXJ0aWNpcGFudCBhcyBHcm91cDtcbiAgICAgICAgICAgIGxldCB1c2VySW5kZXggPSBncm91cC5jaGF0dGluZ1RvLmZpbmRJbmRleCh4ID0+IHguaWQgPT0gbWVzc2FnZS5mcm9tSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuY2hhdHRpbmdUb1t1c2VySW5kZXggPj0gMCA/IHVzZXJJbmRleCA6IDBdLmF2YXRhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFRvZ2dsZXMgYSB3aW5kb3cgZm9jdXMgb24gdGhlIGZvY3VzL2JsdXIgb2YgYSAnbmV3TWVzc2FnZScgaW5wdXRcbiAgICB0b2dnbGVXaW5kb3dGb2N1cyh3aW5kb3c6IFdpbmRvdyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHdpbmRvdy5oYXNGb2N1cyA9ICF3aW5kb3cuaGFzRm9jdXM7XG4gICAgICAgIGlmKHdpbmRvdy5oYXNGb2N1cykge1xuICAgICAgICAgICAgY29uc3QgdW5yZWFkTWVzc2FnZXMgPSB3aW5kb3cubWVzc2FnZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKG1lc3NhZ2UgPT4gbWVzc2FnZS5kYXRlU2VlbiA9PSBudWxsIFxuICAgICAgICAgICAgICAgICAgICAmJiAobWVzc2FnZS50b0lkID09IHRoaXMudXNlcklkIHx8IHdpbmRvdy5wYXJ0aWNpcGFudC5wYXJ0aWNpcGFudFR5cGUgPT09IENoYXRQYXJ0aWNpcGFudFR5cGUuR3JvdXApKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVucmVhZE1lc3NhZ2VzICYmIHVucmVhZE1lc3NhZ2VzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrTWVzc2FnZXNBc1JlYWQodW5yZWFkTWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlc1NlZW4uZW1pdCh1bnJlYWRNZXNzYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBbTG9jYWxpemVkXSBSZXR1cm5zIHRoZSBzdGF0dXMgZGVzY3JpcHRpdmUgdGl0bGVcbiAgICBnZXRTdGF0dXNUaXRsZShzdGF0dXM6IENoYXRQYXJ0aWNpcGFudFN0YXR1cykgOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBjdXJyZW50U3RhdHVzID0gc3RhdHVzLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGl6YXRpb24uc3RhdHVzRGVzY3JpcHRpb25bY3VycmVudFN0YXR1c107XG4gICAgfVxuXG4gICAgdHJpZ2dlck9wZW5DaGF0V2luZG93KHVzZXI6IFVzZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkNoYXRXaW5kb3codXNlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2xvc2VDaGF0V2luZG93KHVzZXJJZDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBvcGVuZWRXaW5kb3cgPSB0aGlzLndpbmRvd3MuZmluZCh4ID0+IHgucGFydGljaXBhbnQuaWQgPT0gdXNlcklkKTtcblxuICAgICAgICBpZiAob3BlbmVkV2luZG93KXtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZUNoYXRXaW5kb3cob3BlbmVkV2luZG93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyaWdnZXJUb2dnbGVDaGF0V2luZG93VmlzaWJpbGl0eSh1c2VySWQ6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgb3BlbmVkV2luZG93ID0gdGhpcy53aW5kb3dzLmZpbmQoeCA9PiB4LnBhcnRpY2lwYW50LmlkID09IHVzZXJJZCk7XG5cbiAgICAgICAgaWYgKG9wZW5lZFdpbmRvdyl7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhdFdpbmRvd0NsaWNrZWQob3BlbmVkV2luZG93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlcyBhIHVuaXF1ZSBmaWxlIHVwbG9hZGVyIGlkIGZvciBlYWNoIHBhcnRpY2lwYW50XG4gICAgZ2V0VW5pcXVlRmlsZVVwbG9hZEluc3RhbmNlSWQod2luZG93OiBXaW5kb3cpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnBhcnRpY2lwYW50KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gYG5nLWNoYXQtZmlsZS11cGxvYWQtJHt3aW5kb3cucGFydGljaXBhbnQuaWR9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuICduZy1jaGF0LWZpbGUtdXBsb2FkJztcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VycyBuYXRpdmUgZmlsZSB1cGxvYWQgZm9yIGZpbGUgc2VsZWN0aW9uIGZyb20gdGhlIHVzZXJcbiAgICB0cmlnZ2VyTmF0aXZlRmlsZVVwbG9hZCh3aW5kb3c6IFdpbmRvdyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh3aW5kb3cpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVVcGxvYWRJbnN0YW5jZUlkID0gdGhpcy5nZXRVbmlxdWVGaWxlVXBsb2FkSW5zdGFuY2VJZCh3aW5kb3cpO1xuICAgICAgICAgICAgY29uc3QgdXBsb2FkRWxlbWVudFJlZiA9IHRoaXMubmF0aXZlRmlsZUlucHV0cy5maWx0ZXIoeCA9PiB4Lm5hdGl2ZUVsZW1lbnQuaWQgPT09IGZpbGVVcGxvYWRJbnN0YW5jZUlkKVswXTtcblxuICAgICAgICAgICAgaWYgKHVwbG9hZEVsZW1lbnRSZWYpXG4gICAgICAgICAgICB1cGxvYWRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJJblVzZUZpbGVVcGxvYWRlcihmaWxlVXBsb2FkSW5zdGFuY2VJZDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZXJJbnN0YW5jZUlkSW5kZXggPSB0aGlzLmZpbGVVcGxvYWRlcnNJblVzZS5pbmRleE9mKGZpbGVVcGxvYWRJbnN0YW5jZUlkKTtcblxuICAgICAgICBpZiAodXBsb2FkZXJJbnN0YW5jZUlkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkZXJzSW5Vc2Uuc3BsaWNlKHVwbG9hZGVySW5zdGFuY2VJZEluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVXBsb2FkaW5nRmlsZSh3aW5kb3c6IFdpbmRvdyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGNvbnN0IGZpbGVVcGxvYWRJbnN0YW5jZUlkID0gdGhpcy5nZXRVbmlxdWVGaWxlVXBsb2FkSW5zdGFuY2VJZCh3aW5kb3cpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVVcGxvYWRlcnNJblVzZS5pbmRleE9mKGZpbGVVcGxvYWRJbnN0YW5jZUlkKSA+IC0xO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgZmlsZSBzZWxlY3Rpb24gYW5kIHVwbG9hZHMgdGhlIHNlbGVjdGVkIGZpbGUgdXNpbmcgdGhlIGZpbGUgdXBsb2FkIGFkYXB0ZXJcbiAgICBvbkZpbGVDaG9zZW4od2luZG93OiBXaW5kb3cpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlsZVVwbG9hZEluc3RhbmNlSWQgPSB0aGlzLmdldFVuaXF1ZUZpbGVVcGxvYWRJbnN0YW5jZUlkKHdpbmRvdyk7XG4gICAgICAgIGNvbnN0IHVwbG9hZEVsZW1lbnRSZWYgPSB0aGlzLm5hdGl2ZUZpbGVJbnB1dHMuZmlsdGVyKHggPT4geC5uYXRpdmVFbGVtZW50LmlkID09PSBmaWxlVXBsb2FkSW5zdGFuY2VJZClbMF07XG5cbiAgICAgICAgaWYgKHVwbG9hZEVsZW1lbnRSZWYpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGU6IEZpbGUgPSB1cGxvYWRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZmlsZXNbMF07XG5cbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZGVyc0luVXNlLnB1c2goZmlsZVVwbG9hZEluc3RhbmNlSWQpO1xuXG4gICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWRBZGFwdGVyLnVwbG9hZEZpbGUoZmlsZSwgd2luZG93LnBhcnRpY2lwYW50LmlkKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZmlsZU1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySW5Vc2VGaWxlVXBsb2FkZXIoZmlsZVVwbG9hZEluc3RhbmNlSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGVNZXNzYWdlLmZyb21JZCA9IHRoaXMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFB1c2ggZmlsZSBtZXNzYWdlIHRvIGN1cnJlbnQgdXNlciB3aW5kb3cgICBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1lc3NhZ2VzLnB1c2goZmlsZU1lc3NhZ2UpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNlbmRNZXNzYWdlKGZpbGVNZXNzYWdlKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQ2hhdFdpbmRvdyh3aW5kb3csIFNjcm9sbERpcmVjdGlvbi5Cb3R0b20pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0cyB0aGUgZmlsZSB1cGxvYWQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB1cGxvYWRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckluVXNlRmlsZVVwbG9hZGVyKGZpbGVVcGxvYWRJbnN0YW5jZUlkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldHMgdGhlIGZpbGUgdXBsb2FkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogSW52b2tlIGEgZmlsZSB1cGxvYWQgYWRhcHRlciBlcnJvciBoZXJlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25GcmllbmRzTGlzdENoZWNrYm94Q2hhbmdlKHNlbGVjdGVkVXNlcjogVXNlciwgaXNDaGVja2VkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYoaXNDaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlcnNGcm9tRnJpZW5kc0xpc3QucHVzaChzZWxlY3RlZFVzZXIpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlcnNGcm9tRnJpZW5kc0xpc3Quc3BsaWNlKHRoaXMuc2VsZWN0ZWRVc2Vyc0Zyb21GcmllbmRzTGlzdC5pbmRleE9mKHNlbGVjdGVkVXNlciksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25GcmllbmRzTGlzdEFjdGlvbkNhbmNlbENsaWNrZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFjdGl2ZU9wdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QWN0aXZlT3B0aW9uLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmVPcHRpb24gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXJzRnJvbUZyaWVuZHNMaXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZyaWVuZHNMaXN0QWN0aW9uQ29uZmlybUNsaWNrZWQoKSA6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBuZXdHcm91cCA9IG5ldyBHcm91cCh0aGlzLnNlbGVjdGVkVXNlcnNGcm9tRnJpZW5kc0xpc3QpO1xuXG4gICAgICAgIHRoaXMub3BlbkNoYXRXaW5kb3cobmV3R3JvdXApO1xuXG4gICAgICAgIGlmICh0aGlzLmdyb3VwQWRhcHRlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ncm91cEFkYXB0ZXIuZ3JvdXBDcmVhdGVkKG5ld0dyb3VwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbmNlbGluZyBjdXJyZW50IHN0YXRlXG4gICAgICAgIHRoaXMub25GcmllbmRzTGlzdEFjdGlvbkNhbmNlbENsaWNrZWQoKTtcbiAgICB9XG5cbiAgICBpc1VzZXJTZWxlY3RlZEZyb21GcmllbmRzTGlzdCh1c2VyOiBVc2VyKSA6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZFVzZXJzRnJvbUZyaWVuZHNMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgPT0gdXNlci5pZCkpLmxlbmd0aCA+IDBcbiAgICB9XG59XG4iXX0=