export namespace HistoryEventTypes {
    const BEFORE_APPLY: string;
    const AFTER_APPLY: string;
    const BEFORE_UNAPPLY: string;
    const AFTER_UNAPPLY: string;
}
/**
* Base class for commands.
*/
export class Command {
    /**
    * @returns {string}
    */
    getText(): string;
    /**
     * @param {module:history.HistoryEventHandler} handler
     * @param {callback} applyFunction
     * @returns {void}
    */
    apply(handler: any, applyFunction: callback): void;
    /**
     * @param {module:history.HistoryEventHandler} handler
     * @param {callback} unapplyFunction
     * @returns {void}
    */
    unapply(handler: any, unapplyFunction: callback): void;
    /**
     * @returns {Element[]} Array with element associated with this command
     * This function needs to be surcharged if multiple elements are returned.
    */
    elements(): Element[];
    /**
      * @returns {string} String with element associated with this command
    */
    type(): string;
}
/**
 * An interface that all command objects must implement.
 * @interface module:history.HistoryCommand
*/
/**
 * Applies.
 *
 * @function module:history.HistoryCommand#apply
 * @param {module:history.HistoryEventHandler} handler
 * @fires module:history~Command#event:history
 * @returns {void|true}
 */
/**
 *
 * Unapplies.
 * @function module:history.HistoryCommand#unapply
 * @param {module:history.HistoryEventHandler} handler
 * @fires module:history~Command#event:history
 * @returns {void|true}
 */
/**
 * Returns the elements.
 * @function module:history.HistoryCommand#elements
 * @returns {Element[]}
 */
/**
 * Gets the text.
 * @function module:history.HistoryCommand#getText
 * @returns {string}
 */
/**
 * Gives the type.
 * @function module:history.HistoryCommand.type
 * @returns {string}
 */
/**
 * @event module:history~Command#event:history
 * @type {module:history.HistoryCommand}
 */
/**
 * An interface for objects that will handle history events.
 * @interface module:history.HistoryEventHandler
 */
/**
 *
 * @function module:history.HistoryEventHandler#handleHistoryEvent
 * @param {string} eventType One of the HistoryEvent types
 * @param {module:history~Command#event:history} command
 * @listens module:history~Command#event:history
 * @returns {void}
 *
 */
/**
 * History command for an element that had its DOM position changed.
 * @implements {module:history.HistoryCommand}
*/
export class MoveElementCommand extends Command implements module {
    /**
    * @param {Element} elem - The DOM element that was moved
    * @param {Element} oldNextSibling - The element's next sibling before it was moved
    * @param {Element} oldParent - The element's parent before it was moved
    * @param {string} [text] - An optional string visible to user related to this change
    */
    constructor(elem: Element, oldNextSibling: Element, oldParent: Element, text?: string);
    elem: Element;
    text: string;
    oldNextSibling: Element;
    oldParent: Element;
    newNextSibling: ChildNode;
    newParent: ParentNode;
    /**
     * Re-positions the element.
     * @param {module:history.HistoryEventHandler} handler
     * @fires module:history~Command#event:history
     * @returns {void}
    */
    apply(handler: any): void;
    /**
     * Positions the element back to its original location.
     * @param {module:history.HistoryEventHandler} handler
     * @fires module:history~Command#event:history
     * @returns {void}
    */
    unapply(handler: any): void;
}
/**
* History command for an element that was added to the DOM.
* @implements {module:history.HistoryCommand}
*/
export class InsertElementCommand extends Command implements module {
    /**
     * @param {Element} elem - The newly added DOM element
     * @param {string} text - An optional string visible to user related to this change
    */
    constructor(elem: Element, text: string);
    elem: Element;
    text: string;
    parent: ParentNode;
    nextSibling: ChildNode;
    /**
    * Re-inserts the new element.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    apply(handler: any): void;
    /**
    * Removes the element.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    unapply(handler: any): void;
}
/**
* History command for an element removed from the DOM.
* @implements {module:history.HistoryCommand}
*/
export class RemoveElementCommand extends Command implements module {
    /**
    * @param {Element} elem - The removed DOM element
    * @param {Node} oldNextSibling - The DOM element's nextSibling when it was in the DOM
    * @param {Element} oldParent - The DOM element's parent
    * @param {string} [text] - An optional string visible to user related to this change
    */
    constructor(elem: Element, oldNextSibling: Node, oldParent: Element, text?: string);
    elem: Element;
    text: string;
    nextSibling: Node;
    parent: Element;
    /**
    * Re-removes the new element.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    apply(handler: any): void;
    /**
    * Re-adds the new element.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    unapply(handler: any): void;
}
/**
* @typedef {"#text"|"#href"|string} module:history.CommandAttributeName
*/
/**
* @typedef {PlainObject<module:history.CommandAttributeName, string>} module:history.CommandAttributes
*/
/**
* History command to make a change to an element.
* Usually an attribute change, but can also be textcontent.
* @implements {module:history.HistoryCommand}
*/
export class ChangeElementCommand extends Command implements module {
    /**
    * @param {Element} elem - The DOM element that was changed
    * @param {module:history.CommandAttributes} attrs - Attributes to be changed with the values they had *before* the change
    * @param {string} text - An optional string visible to user related to this change
     */
    constructor(elem: Element, attrs: any, text: string);
    elem: Element;
    text: string;
    newValues: {};
    oldValues: any;
    /**
    * Performs the stored change action.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    apply(handler: any): void;
    /**
    * Reverses the stored change action.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    unapply(handler: any): void;
}
/**
* History command that can contain/execute multiple other commands.
* @implements {module:history.HistoryCommand}
*/
export class BatchCommand extends Command implements module {
    /**
    * @param {string} [text] - An optional string visible to user related to this change
    */
    constructor(text?: string);
    text: string;
    stack: any[];
    /**
    * Runs "apply" on all subcommands.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    apply(handler: any): void;
    /**
    * Runs "unapply" on all subcommands.
    * @param {module:history.HistoryEventHandler} handler
    * @fires module:history~Command#event:history
    * @returns {void}
    */
    unapply(handler: any): void;
    /**
    * Adds a given command to the history stack.
    * @param {Command} cmd - The undo command object to add
    * @returns {void}
    */
    addSubCommand(cmd: Command): void;
    /**
    * @returns {boolean} Indicates whether or not the batch command is empty
    */
    isEmpty(): boolean;
}
/**
*
*/
export class UndoManager {
    /**
    * @param {module:history.HistoryEventHandler} historyEventHandler
    */
    constructor(historyEventHandler: any);
    handler_: any;
    undoStackPointer: number;
    undoStack: any[];
    undoChangeStackPointer: number;
    undoableChangeStack: any[];
    /**
    * Resets the undo stack, effectively clearing the undo/redo history.
    * @returns {void}
    */
    resetUndoStack(): void;
    /**
    * @returns {Integer} Current size of the undo history stack
    */
    getUndoStackSize(): Integer;
    /**
    * @returns {Integer} Current size of the redo history stack
    */
    getRedoStackSize(): Integer;
    /**
    * @returns {string} String associated with the next undo command
    */
    getNextUndoCommandText(): string;
    /**
    * @returns {string} String associated with the next redo command
    */
    getNextRedoCommandText(): string;
    /**
    * Performs an undo step.
    * @returns {void}
    */
    undo(): void;
    /**
    * Performs a redo step.
    * @returns {void}
    */
    redo(): void;
    /**
    * Adds a command object to the undo history stack.
    * @param {Command} cmd - The command object to add
    * @returns {void}
    */
    addCommandToHistory(cmd: Command): void;
    /**
    * This function tells the canvas to remember the old values of the
    * `attrName` attribute for each element sent in.  The elements and values
    * are stored on a stack, so the next call to `finishUndoableChange()` will
    * pop the elements and old values off the stack, gets the current values
    * from the DOM and uses all of these to construct the undo-able command.
    * @param {string} attrName - The name of the attribute being changed
    * @param {Element[]} elems - Array of DOM elements being changed
    * @returns {void}
    */
    beginUndoableChange(attrName: string, elems: Element[]): void;
    /**
    * This function returns a `BatchCommand` object which summarizes the
    * change since `beginUndoableChange` was called.  The command can then
    * be added to the command history.
    * @returns {BatchCommand} Batch command object with resulting changes
    */
    finishUndoableChange(): BatchCommand;
}
/**
 * :history.CommandAttributeName
 */
export type module = "#text" | "#href" | string;
