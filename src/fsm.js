class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    
    constructor(config) {
        if(!config) {
            throw new Error('Error');
        }

        this.config = config;
        this.history = [];
        this.reset();
        this.changed = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.position];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config['states'][state] != null) {
            this.history.push(state);
            this.position = this.history.length - 1;
            this.changed = true;
        } else {
            throw new Error('Error');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config['states'][this.getState()]['transitions'][event]) {
            this.changeState(this.config['states'][this.getState()]['transitions'][event]);
        } else {
            throw new Error('Error');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history = [this.config['initial']];
        this.position = 0;
        this.changed = false;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event) {
            let res = [];
            for(let key in this.config['states']) {
                res.push(key);
            }
            return res;
        } else {
            let res = [];
            for(let [key, value] of this.config['states'][this.getState()]['transitions']) {
                if(key == event) {
                    res.push(value);
                }
            }
            return res;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(changed) {
            if(position > 0) {
                position--;
            }

            return true;
        }
        
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(changed) {
            if(position < this.history.length - 1) {
                position++;
            }

            return true;
        }
        
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.history[this.history.length - 1]];
        this.position = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
