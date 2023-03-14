/**
 * This class encapsulates the concept of a SVG-edit drawing.
 */
export class Drawing {
    /**
    * @param {SVGSVGElement} svgElem - The SVG DOM Element that this JS object
    *     encapsulates.  If the svgElem has a se:nonce attribute on it, then
    *     IDs will use the nonce as they are generated.
    * @param {string} [optIdPrefix=svg_] - The ID prefix to use.
    * @throws {Error} If not initialized with an SVG element
    */
    constructor(svgElem: SVGSVGElement, optIdPrefix?: string);
    /**
    * The SVG DOM Element that represents this drawing.
    * @type {SVGSVGElement}
    */
    svgElem_: SVGSVGElement;
    /**
    * The latest object number used in this drawing.
    * @type {Integer}
    */
    obj_num: Integer;
    /**
    * The prefix to prepend to each element id in the drawing.
    * @type {string}
    */
    idPrefix: string;
    /**
    * An array of released element ids to immediately reuse.
    * @type {Integer[]}
    */
    releasedNums: Integer[];
    /**
    * The z-ordered array of Layer objects. Each layer has a name
    * and group element.
    * The first layer is the one at the bottom of the rendering.
    * @type {Layer[]}
    */
    all_layers: Layer[];
    /**
    * Map of all_layers by name.
    *
    * Note: Layers are ordered, but referenced externally by name; so, we need both container
    * types depending on which function is called (i.e. all_layers and layer_map).
    *
    * @type {PlainObject<string, Layer>}
    */
    layer_map: PlainObject<string, Layer>;
    /**
    * The current layer being used.
    * @type {Layer}
    */
    current_layer: Layer;
    /**
    * The nonce to use to uniquely identify elements across drawings.
    * @type {!string}
    */
    nonce_: string;
    /**
     * @param {string} id Element ID to retrieve
     * @returns {Element} SVG element within the root SVGSVGElement
    */
    getElem_(id: string): Element;
    /**
     * @returns {SVGSVGElement}
     */
    getSvgElem(): SVGSVGElement;
    /**
     * @returns {!(string|Integer)} The previously set nonce
     */
    getNonce(): (string | Integer);
    /**
     * @param {!(string|Integer)} n The nonce to set
     * @returns {void}
     */
    setNonce(n: (string | Integer)): void;
    /**
     * Clears any previously set nonce.
     * @returns {void}
     */
    clearNonce(): void;
    /**
     * Returns the latest object id as a string.
     * @returns {string} The latest object Id.
     */
    getId(): string;
    /**
     * Returns the next object Id as a string.
     * @returns {string} The next object Id to use.
     */
    getNextId(): string;
    /**
     * Releases the object Id, letting it be used as the next id in getNextId().
     * This method DOES NOT remove any elements from the DOM, it is expected
     * that client code will do this.
     * @param {string} id - The id to release.
     * @returns {boolean} True if the id was valid to be released, false otherwise.
    */
    releaseId(id: string): boolean;
    /**
     * Returns the number of layers in the current drawing.
     * @returns {Integer} The number of layers in the current drawing.
    */
    getNumLayers(): Integer;
    /**
     * Check if layer with given name already exists.
     * @param {string} name - The layer name to check
     * @returns {boolean}
    */
    hasLayer(name: string): boolean;
    /**
     * Returns the name of the ith layer. If the index is out of range, an empty string is returned.
     * @param {Integer} i - The zero-based index of the layer you are querying.
     * @returns {string} The name of the ith layer (or the empty string if none found)
    */
    getLayerName(i: Integer): string;
    /**
     * @returns {SVGGElement|null} The SVGGElement representing the current layer.
     */
    getCurrentLayer(): SVGGElement | null;
    /**
     * Get a layer by name.
     * @param {string} name
     * @returns {SVGGElement} The SVGGElement representing the named layer or null.
     */
    getLayerByName(name: string): SVGGElement;
    /**
     * Returns the name of the currently selected layer. If an error occurs, an empty string
     * is returned.
     * @returns {string} The name of the currently active layer (or the empty string if none found).
    */
    getCurrentLayerName(): string;
    /**
     * Set the current layer's name.
     * @param {string} name - The new name.
     * @param {module:history.HistoryRecordingService} hrService - History recording service
     * @returns {string|null} The new name if changed; otherwise, null.
     */
    setCurrentLayerName(name: string, hrService: any): string | null;
    /**
     * Set the current layer's position.
     * @param {Integer} newpos - The zero-based index of the new position of the layer. Range should be 0 to layers-1
     * @returns {{title: SVGGElement, previousName: string}|null} If the name was changed, returns {title:SVGGElement, previousName:string}; otherwise null.
     */
    setCurrentLayerPosition(newpos: Integer): {
        title: SVGGElement;
        previousName: string;
    } | null;
    /**
    * @param {module:history.HistoryRecordingService} hrService
    * @returns {void}
    */
    mergeLayer(hrService: any): void;
    /**
    * @param {module:history.HistoryRecordingService} hrService
    * @returns {void}
    */
    mergeAllLayers(hrService: any): void;
    /**
     * Sets the current layer. If the name is not a valid layer name, then this
     * function returns `false`. Otherwise it returns `true`. This is not an
     * undo-able action.
     * @param {string} name - The name of the layer you want to switch to.
     * @returns {boolean} `true` if the current layer was switched, otherwise `false`
     */
    setCurrentLayer(name: string): boolean;
    /**
     * Sets the current layer. If the name is not a valid layer name, then this
     * function returns `false`. Otherwise it returns `true`. This is not an
     * undo-able action.
     * @param {string} name - The name of the layer you want to switch to.
     * @returns {boolean} `true` if the current layer was switched, otherwise `false`
     */
    indexCurrentLayer(): boolean;
    /**
     * Deletes the current layer from the drawing and then clears the selection.
     * This function then calls the 'changed' handler.  This is an undoable action.
     * @todo Does this actually call the 'changed' handler?
     * @returns {SVGGElement} The SVGGElement of the layer removed or null.
     */
    deleteCurrentLayer(): SVGGElement;
    /**
     * Updates layer system and sets the current layer to the
     * top-most layer (last `<g>` child of this drawing).
     * @returns {void}
    */
    identifyLayers(): void;
    /**
     * Creates a new top-level layer in the drawing with the given name and
     * makes it the current layer.
     * @param {string} name - The given name. If the layer name exists, a new name will be generated.
     * @param {module:history.HistoryRecordingService} hrService - History recording service
     * @returns {SVGGElement} The SVGGElement of the new layer, which is
     *     also the current layer of this drawing.
    */
    createLayer(name: string, hrService: any): SVGGElement;
    /**
     * Creates a copy of the current layer with the given name and makes it the current layer.
     * @param {string} name - The given name. If the layer name exists, a new name will be generated.
     * @param {module:history.HistoryRecordingService} hrService - History recording service
     * @returns {SVGGElement} The SVGGElement of the new layer, which is
     *     also the current layer of this drawing.
    */
    cloneLayer(name: string, hrService: any): SVGGElement;
    /**
     * Returns whether the layer is visible.  If the layer name is not valid,
     * then this function returns `false`.
     * @param {string} layerName - The name of the layer which you want to query.
     * @returns {boolean} The visibility state of the layer, or `false` if the layer name was invalid.
    */
    getLayerVisibility(layerName: string): boolean;
    /**
     * Sets the visibility of the layer. If the layer name is not valid, this
     * function returns `null`, otherwise it returns the `SVGElement` representing
     * the layer. This is an undo-able action.
     * @param {string} layerName - The name of the layer to change the visibility
     * @param {boolean} bVisible - Whether the layer should be visible
     * @returns {?SVGGElement} The SVGGElement representing the layer if the
     *   `layerName` was valid, otherwise `null`.
    */
    setLayerVisibility(layerName: string, bVisible: boolean): SVGGElement | null;
    /**
     * Returns the opacity of the given layer.  If the input name is not a layer, `null` is returned.
     * @param {string} layerName - name of the layer on which to get the opacity
     * @returns {?Float} The opacity value of the given layer.  This will be a value between 0.0 and 1.0, or `null`
     * if `layerName` is not a valid layer
    */
    getLayerOpacity(layerName: string): Float;
    /**
     * Sets the opacity of the given layer.  If the input name is not a layer,
     * nothing happens. If opacity is not a value between 0.0 and 1.0, then
     * nothing happens.
     * NOTE: this function exists solely to apply a highlighting/de-emphasis
     * effect to a layer. When it is possible for a user to affect the opacity
     * of a layer, we will need to allow this function to produce an undo-able
     * action.
     * @param {string} layerName - Name of the layer on which to set the opacity
     * @param {Float} opacity - A float value in the range 0.0-1.0
     * @returns {void}
    */
    setLayerOpacity(layerName: string, opacity: Float): void;
    /**
     * Create a clone of an element, updating its ID and its children's IDs when needed.
     * @param {Element} el - DOM element to clone
     * @returns {Element}
     */
    copyElem(el: Element): Element;
}
export function randomizeIds(enableRandomization: boolean, currentDrawing: draw.Drawing): void;
export function init(canvas: any): void;
export function identifyLayers(): void;
export function indexCurrentLayer(): void;
export function createLayer(name: string, hrService: any): void;
export function cloneLayer(name: string, hrService: any): void;
export function deleteCurrentLayer(): boolean;
export function setCurrentLayer(name: string): boolean;
export function renameCurrentLayer(newName: string): boolean;
export function setCurrentLayerPosition(newPos: Integer): boolean;
export function setLayerVisibility(layerName: string, bVisible: boolean): boolean;
export function moveSelectedToLayer(layerName: string): boolean;
export function mergeLayer(hrService: any): void;
export function mergeAllLayers(hrService: any): void;
export function leaveContext(): void;
export function setContext(elem: Element): void;
export { Layer };
