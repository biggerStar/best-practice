class tokenLRU {

    /**
     * @param capacity: the maximum number of tokens, not userId
     */
    constructor(capacity) {
        this.head = {};
        this.tail = {};
        this.capacity = capacity;
        this.currentCap = 0;
        this.cache = new Map();
    }

    get(userId) {
        var user = this.cache.get(userId);
        if (user) {
            this._changeContextPos(user);
            this._addToTail(user);
            return user.tokens;
        }
        return null;
    }

    set(userId, token) {
        var user = this.cache.get(userId);
        // add to cache
        if (!user) {
            var tokens = new Set();
            var user = {};
            if (this.cache.size < 2) {
                this._init(user);
            }
            tokens.add(token);
            user.tokens = tokens;
            user.userId = userId;
            this.currentCap++;
            this._addToTail(user);
            this.cache.set(userId, user);
        } else { // update cache
            if (!user.tokens.has(token)) {
                user.tokens.add(token);
                this.currentCap++;
            }
            this._changeContextPos(user);
            this._addToTail(user);
        }
        // delete all tokens of the user
        if (this.capacity < this.currentCap) {
            this.cache.delete(this.head.userId);
            this.currentCap = this.currentCap - this.head.tokens.size;
            this.head = this.head.pre;
        }
    }

    /**
     * head/tail user initialization
     * @param user
     * @private
     */
    _init(user) {
        // head init
        if (this.cache.size == 0) {
            this.head = user;
            user.pre = this.tail;
            return;
        }
        // tail init
        if (!this.tail.userId) {
            this.tail = user;
            user.next = this.head;
            this.head.pre = user;
            return;
        }
        return;
    }

    /**
     * put the user to tail
     * @param user
     * @private
     */
    _addToTail(user) {
            user.next = this.tail;
            this.tail.pre = user;
            this.tail = user;
    }

    /**
     * change the reference for the previous/next user
     * @param user
     * @private
     */
    _changeContextPos(user) {
        if (user == this.tail ) {
            return;
        }
        if (user == this.head) {
            this.head = user.pre;
            if (user.pre){
                user.pre.next = "";
            }
        } else {
            user.pre.next = user.next;
            user.next.pre = user.pre;
        }
    }

    /**
     * remove user's token
     * @param userId
     * @param token
     */
    removeToken(userId, token) {
        var user = this.cache.get(userId);
        if (user) {
            var tokens = user.tokens;
            if (tokens.has(token)) {
                tokens.delete(token);
                this.currentCap -- ;
            }
            // delete userId in tokenCache
            if (tokens.size == 0) {
                this._deleteNode(user);
            }
        }
    }

    /**
     * delete user
     * @param user
     * @private
     */
    _deleteNode(user){
        if (user == this.head) {
            this.head = user.pre;
            if (user.pre) {
                user.pre.next = "";
            }
        }
        if (user == this.tail) {
            this.tail = user.next;
            if (user.next) {
                 user.next.pre = "";
             }
        } else {
            user.pre.next = user.next;
            user.next.pre = user.pre;
        }
        this.cache.delete(user.userId);
    }

    getAllTokens() {
        var userTokens = new Map();
        for (let userId of this.cache.keys()) {
            let tokens = this.cache.get(userId).tokens;
            userTokens.set(userId, tokens);
        }
        return userTokens;
    }
}

module.exports = tokenLRU;
