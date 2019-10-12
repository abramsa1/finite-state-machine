class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined)
            throw Error();
        this.state = config['initial'];
        this.firstState = this.state;
        this.previousState;
        this.nextState;
        this.allState = config['states'];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.allState[state] === undefined) throw Error();
        this.previousState = this.state;
        this.state = state;
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.allState[this.state]['transitions'][event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.firstState;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) return Object.keys(this.allState);
        let states = [];
        for(let keyOne in this.allState) {
            for(let keyTwo in this.allState[keyOne]['transitions']) {
                if(keyTwo == event) 
                    states.push(keyOne);
            }
        }
        return states;
    }
    /** 
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState === undefined || this.previousState == this.state) return false;
        this.nextState = this.state;
        this.state = this.previousState;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState === undefined || this.nextState == this.state) return false;
        this.state = this.nextState;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.nextState = undefined;
        this.previousState = undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
