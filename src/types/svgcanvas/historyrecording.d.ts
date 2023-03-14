export default HistoryRecordingService;
/**
 * History recording service.
 *
 * A self-contained service interface for recording history. Once injected, no other dependencies
 * or globals are required (example: UndoManager, command types, etc.). Easy to mock for unit tests.
 * Built on top of history classes in history.js.
 *
 * There is a simple start/end interface for batch commands.
 *
 * HistoryRecordingService.NO_HISTORY is a singleton that can be passed in to functions
 * that record history. This helps when the caller requires that no history be recorded.
 *
 * The following will record history: insert, batch, insert.
 * @example
 * hrService = new HistoryRecordingService(this.undoMgr);
 * hrService.insertElement(elem, text); // add simple command to history.
 * hrService.startBatchCommand('create two elements');
 * hrService.changeElement(elem, attrs, text); // add to batchCommand
 * hrService.changeElement(elem, attrs2, text); // add to batchCommand
 * hrService.endBatchCommand(); // add batch command with two change commands to history.
 * hrService.insertElement(elem, text); // add simple command to history.
 *
 * @example
 * // Note that all functions return this, so commands can be chained, like so:
 * hrService
 *   .startBatchCommand('create two elements')
 *   .insertElement(elem, text)
 *   .changeElement(elem, attrs, text)
 *   .endBatchCommand();
 *
 * @memberof module:history
 */
declare class HistoryRecordingService {
    /**
    * @param {history.UndoManager|null} undoManager - The undo manager.
    *     A value of `null` is valid for cases where no history recording is required.
    *     See singleton: {@link module:history.HistoryRecordingService.HistoryRecordingService.NO_HISTORY}
    */
    constructor(undoManager: history.UndoManager | null);
    undoManager_: any;
    currentBatchCommand_: any;
    batchCommandStack_: any[];
    /**
     * Start a batch command so multiple commands can recorded as a single history command.
     * Requires a corresponding call to endBatchCommand. Start and end commands can be nested.
     *
     * @param {string} text - Optional string describing the batch command.
     * @returns {module:history.HistoryRecordingService}
     */
    startBatchCommand(text: string): any;
    /**
     * End a batch command and add it to the history or a parent batch command.
     * @returns {module:history.HistoryRecordingService}
     */
    endBatchCommand(): any;
    /**
     * Add a `MoveElementCommand` to the history or current batch command.
     * @param {Element} elem - The DOM element that was moved
     * @param {Element} oldNextSibling - The element's next sibling before it was moved
     * @param {Element} oldParent - The element's parent before it was moved
     * @param {string} [text] - An optional string visible to user related to this change
     * @returns {module:history.HistoryRecordingService}
     */
    moveElement(elem: Element, oldNextSibling: Element, oldParent: Element, text?: string): any;
    /**
     * Add an `InsertElementCommand` to the history or current batch command.
     * @param {Element} elem - The DOM element that was added
     * @param {string} [text] - An optional string visible to user related to this change
     * @returns {module:history.HistoryRecordingService}
     */
    insertElement(elem: Element, text?: string): any;
    /**
     * Add a `RemoveElementCommand` to the history or current batch command.
     * @param {Element} elem - The DOM element that was removed
     * @param {Element} oldNextSibling - The element's next sibling before it was removed
     * @param {Element} oldParent - The element's parent before it was removed
     * @param {string} [text] - An optional string visible to user related to this change
     * @returns {module:history.HistoryRecordingService}
     */
    removeElement(elem: Element, oldNextSibling: Element, oldParent: Element, text?: string): any;
    /**
     * Add a `ChangeElementCommand` to the history or current batch command.
     * @param {Element} elem - The DOM element that was changed
     * @param {module:history.CommandAttributes} attrs - An object with the attributes to be changed and the values they had *before* the change
     * @param {string} [text] - An optional string visible to user related to this change
     * @returns {module:history.HistoryRecordingService}
     */
    changeElement(elem: Element, attrs: any, text?: string): any;
    /**
     * Private function to add a command to the history or current batch command.
     * @private
     * @param {Command} cmd
     * @returns {module:history.HistoryRecordingService|void}
     */
    private addCommand_;
}
declare namespace HistoryRecordingService {
    const NO_HISTORY: HistoryRecordingService;
}
