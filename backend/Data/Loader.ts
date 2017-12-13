export abstract class Loader {
    /**
     * hasFiredLoaders
     *
     * True if the loader callbacks have been called
     */
    private hasFiredLoaders: boolean;

    /**
     * onLoadCallbacks
     *
     * A list of callbacks for when the graph loads
     */
    private onLoadCallbacks: Array<Function>;

    constructor() {
        this.onLoadCallbacks = [];
        this.hasFiredLoaders = false;
    }

    /**
     * onLoad()
     *
     * Adds a function to a list of functions to be called back on once the graph loads
     *
     * @param {Function} callback no parameters; just a notification
     */
    public onLoad(callback: Function) {
        this.onLoadCallbacks.push(callback);
    }

    /**
     * fireOnLoad()
     *
     * fires all onload callbacks asynchronously
     */
    protected fireOnLoad() {
        if (this.hasFiredLoaders) {
            throw new Error('Cannot fire loaders twice')
        }
        this.onLoadCallbacks.forEach(callback => {
            return setTimeout(() => {
                return callback();
            },0);
        });
        this.hasFiredLoaders = true;
    }
}