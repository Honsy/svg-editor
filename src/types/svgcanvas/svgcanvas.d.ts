declare module '@svgedit/svgcanvas' {
    export default SvgCanvas;
    /**
     * The main SvgCanvas class that manages all SVG-related functions.
     * @memberof module:svgcanvas
     *
     */
    declare class SvgCanvas {
        /**
         * @param {HTMLElement} container - The container HTML element that should hold the SVG root element
         * @param {module:SVGeditor.configObj.curConfig} config - An object that contains configuration data
         */
        constructor(container: HTMLElement, config: any);
        saveOptions: {
            round_digits: number;
        };
        importIds: {};
        extensions: {};
        removedElements: {};
        started: boolean;
        startTransform: any;
        currentMode: string;
        currentResizeMode: string;
        justSelected: any;
        rubberBox: any;
        curBBoxes: any[];
        lastClickPoint: any;
        events: {};
        rootSctm: any;
        drawnPath: any;
        freehand: {
            minx: any;
            miny: any;
            maxx: any;
            maxy: any;
        };
        dAttr: any;
        startX: any;
        startY: any;
        rStartX: any;
        rStartY: any;
        initBbox: {};
        sumDistance: number;
        controllPoint2: {
            x: number;
            y: number;
        };
        controllPoint1: {
            x: number;
            y: number;
        };
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        bSpline: {
            x: number;
            y: number;
        };
        nextPos: {
            x: number;
            y: number;
        };
        idprefix: string;
        encodableImages: {};
        curConfig: any;
        lastGoodImgUrl: string;
        svgdoc: Document;
        container: HTMLElement;
        svgroot: any;
        svgContent: HTMLElement;
        current_drawing_: any;
        zoom: number;
        currentGroup: any;
        curText: any;
        curShape: {
            fill: string;
            fill_paint: any;
            fill_opacity: any;
            stroke: string;
            stroke_paint: any;
            stroke_opacity: any;
            stroke_width: any;
            stroke_dasharray: string;
            stroke_linejoin: string;
            stroke_linecap: string;
            opacity: any;
        };
        curProperties: {
            fill: string;
            fill_paint: any;
            fill_opacity: any;
            stroke: string;
            stroke_paint: any;
            stroke_opacity: any;
            stroke_width: any;
            stroke_dasharray: string;
            stroke_linejoin: string;
            stroke_linecap: string;
            opacity: any;
        };
        selectedElements: any[];
        nsMap: any;
        selectorManager: any;
        pathActions: any;
        uiStrings: {};
        opacAni: HTMLElement;
        linkControlPoints: any;
        curCommand: any;
        filter: any;
        filterHidden: boolean;
        contentW: any;
        contentH: any;
        getSvgOption(): {
            round_digits: number;
        };
        setSvgOption(key: any, value: any): void;
        getSelectedElements(): any[];
        setSelectedElements(key: any, value: any): void;
        setEmptySelectedElements(): void;
        getSvgRoot(): any;
        getDOMDocument(): Document;
        getDOMContainer(): HTMLElement;
        getCurConfig(): any;
        setIdPrefix(p: any): void;
        getCurrentDrawing(): any;
        getCurShape(): {
            fill: string;
            fill_paint: any;
            fill_opacity: any;
            stroke: string;
            stroke_paint: any;
            stroke_opacity: any;
            stroke_width: any;
            stroke_dasharray: string;
            stroke_linejoin: string;
            stroke_linecap: string;
            opacity: any;
        };
        getCurrentGroup(): any;
        getBaseUnit(): any;
        getHeight(): number;
        getWidth(): number;
        getRoundDigits(): number;
        getSnappingStep(): any;
        getGridSnapping(): any;
        getStartTransform(): any;
        setStartTransform(transform: any): void;
        getZoom(): number;
        round(val: any): number;
        createSVGElement(jsonMap: any): any;
        getContainer(): HTMLElement;
        setStarted(s: any): void;
        getRubberBox(): any;
        setRubberBox(rb: any): any;
        addPtsToSelection({ closedSubpath, grips }: {
            closedSubpath: any;
            grips: any;
        }): void;
        /**
         * @param {PlainObject} changes
         * @param {ChangeElementCommand} changes.cmd
         * @param {SVGPathElement} changes.elem
         * @fires module:svgcanvas.SvgCanvas#event:changed
         * @returns {void}
         */
        endChanges({ cmd, elem }: PlainObject): void;
        getCurrentMode(): string;
        setCurrentMode(cm: any): string;
        getDrawnPath(): any;
        setDrawnPath(dp: any): any;
        setCurrentGroup(cg: any): void;
        changeSvgContent(): void;
        getStarted(): boolean;
        getCanvas(): SvgCanvas;
        getrootSctm(): any;
        getStartX(): any;
        setStartX(value: any): void;
        getStartY(): any;
        setStartY(value: any): void;
        getRStartX(): any;
        getRStartY(): any;
        getInitBbox(): {};
        getCurrentResizeMode(): string;
        getJustSelected(): any;
        getOpacAni(): HTMLElement;
        getParameter(): any;
        getNextParameter(): any;
        getStepCount(): number;
        getThreSholdDist(): number;
        getSumDistance(): number;
        getStart(key: any): any;
        getEnd(key: any): any;
        getbSpline(key: any): any;
        getNextPos(key: any): any;
        getControllPoint1(key: any): any;
        getControllPoint2(key: any): any;
        getFreehand(key: any): any;
        getDrawing(): any;
        getDAttr(): any;
        getLastGoodImgUrl(): string;
        getCurText(key: any): any;
        setDAttr(value: any): void;
        setEnd(key: any, value: any): void;
        setControllPoint1(key: any, value: any): void;
        setControllPoint2(key: any, value: any): void;
        setJustSelected(value: any): void;
        setParameter(value: any): void;
        parameter: any;
        setStart(value: any): void;
        setRStartX(value: any): void;
        setRStartY(value: any): void;
        setSumDistance(value: any): void;
        setbSpline(value: any): void;
        setNextPos(value: any): void;
        setNextParameter(value: any): void;
        nextParameter: any;
        setCurText(key: any, value: any): void;
        setFreehand(key: any, value: any): void;
        setCurBBoxes(value: any): void;
        getCurBBoxes(): any[];
        setInitBbox(value: any): void;
        setRootSctm(value: any): void;
        setCurrentResizeMode(value: any): void;
        getLastClickPoint(key: any): any;
        setLastClickPoint(value: any): void;
        getId(): any;
        getUIStrings(): {};
        getNsMap(): any;
        getSvgOptionApply(): any;
        getSvgOptionImages(): any;
        getEncodableImages(key: any): any;
        setEncodableImages(key: any, value: any): void;
        getVisElems(): string;
        getIdPrefix(): string;
        getDataStorage(): any;
        setZoom(value: any): void;
        getImportIds(key: any): any;
        setImportIds(key: any, value: any): void;
        setRemovedElements(key: any, value: any): void;
        setSvgContent(value: any): void;
        getrefAttrs(): string[];
        setCanvas(key: any, value: any): void;
        setCurProperties(key: any, value: any): void;
        getCurProperties(key: any): any;
        setCurShape(key: any, value: any): void;
        gettingSelectorManager(): any;
        getContentW(): any;
        getContentH(): any;
        getClipboardID(): string;
        getSvgContent(): HTMLElement;
        getExtensions(): {};
        getSelector(): any;
        getMode(): string;
        getNextId(): any;
        getCurCommand(): any;
        setCurCommand(value: any): void;
        getFilter(): any;
        setFilter(value: any): void;
        getFilterHidden(): boolean;
        setFilterHidden(value: any): void;
        /**
         * Sets the editor's mode to the given string.
         * @function module:svgcanvas.SvgCanvas#setMode
         * @param {string} name - String with the new mode to change to
         * @returns {void}
         */
        setMode(name: string): void;
        /**
         * Clears the current document. This is not an undoable action.
         * @function module:svgcanvas.SvgCanvas#clear
         * @fires module:svgcanvas.SvgCanvas#event:beforeClear|afterClear
         * @returns {void}
         */
        clear(): void;
        addExtension(name: any, extInitFunc: any, { importLocale }: {
            importLocale: any;
        }): Promise<any>;
        addCommandToHistory(cmd: any): void;
        restoreRefElements(elem: any): void;
        call(ev: any, arg: any): any;
        /**
         * Attaches a callback function to an event.
         * @function module:svgcanvas.SvgCanvas#bind
         * @param  {string} ev - String indicating the name of the event
         * @param {module:svgcanvas.EventHandler} f - The callback function to bind to the event
         * @returns {module:svgcanvas.EventHandler} The previous event
         */
        bind(ev: string, f: any): any;
        /**
         * Flash the clipboard data momentarily on localStorage so all tabs can see.
         * @returns {void}
         */
        flashStorage(): void;
        /**
         * Selects only the given elements, shortcut for `clearSelection(); addToSelection()`.
         * @function module:svgcanvas.SvgCanvas#selectOnly
         * @param {Element[]} elems - an array of DOM elements to be selected
         * @param {boolean} showGrips - Indicates whether the resize grips should be shown
         * @returns {void}
         */
        selectOnly(elems: Element[], showGrips: boolean): void;
        /**
         * Removes elements from the selection.
         * @function module:svgcanvas.SvgCanvas#removeFromSelection
         * @param {Element[]} elemsToRemove - An array of elements to remove from selection
         * @returns {void}
         */
        removeFromSelection(elemsToRemove: Element[]): void;
        /**
         * Clears the selection, then adds all elements in the current layer to the selection.
         * @function module:svgcanvas.SvgCanvas#selectAllInCurrentLayer
         * @returns {void}
         */
        selectAllInCurrentLayer(): void;
        getOpacity(): any;
        /**
         * @function module:svgcanvas.SvgCanvas#getSnapToGrid
         * @returns {boolean} The current snap to grid setting
         */
        getSnapToGrid(): boolean;
        /**
         * @function module:svgcanvas.SvgCanvas#getVersion
         * @returns {string} A string which describes the revision number of SvgCanvas.
         */
        getVersion(): string;
        /**
         * Update interface strings with given values.
         * @function module:svgcanvas.SvgCanvas#setUiStrings
         * @param {module:path.uiStrings} strs - Object with strings (see the [locales API]{@link module:locale.LocaleStrings} and the [tutorial]{@tutorial LocaleDocs})
         * @returns {void}
         */
        setUiStrings(strs: any): void;
        /**
         * Update configuration options with given values.
         * @function module:svgcanvas.SvgCanvas#setConfig
         * @param {module:SVGEditor.Config} opts - Object with options
         * @returns {void}
         */
        setConfig(opts: any): void;
        /**
         * @function module:svgcanvas.SvgCanvas#getDocumentTitle
         * @returns {string|void} The current document title or an empty string if not found
         */
        getDocumentTitle(): string | void;
        getOffset(): {
            x: number;
            y: number;
        };
        getColor(type: any): any;
        setStrokePaint(paint: any): void;
        /**
         * @function module:svgcanvas.SvgCanvas#setFillPaint
         * @param {module:jGraduate~Paint} paint
         * @returns {void}
         */
        setFillPaint(paint: any): void;
        /**
         * @function module:svgcanvas.SvgCanvas#getStrokeWidth
         * @returns {Float|string} The current stroke-width value
         */
        getStrokeWidth(): Float | string;
        /**
         * @function module:svgcanvas.SvgCanvas#getStyle
         * @returns {module:svgcanvas.StyleOptions} current style options
         */
        getStyle(): any;
        /**
         * Sets the given opacity on the current selected elements.
         * @function module:svgcanvas.SvgCanvas#setOpacity
         * @param {string} val
         * @returns {void}
         */
        setOpacity(val: string): void;
        /**
         * @function module:svgcanvas.SvgCanvas#getFillOpacity
         * @returns {Float} the current fill opacity
         */
        getFillOpacity(): Float;
        /**
         * @function module:svgcanvas.SvgCanvas#getStrokeOpacity
         * @returns {string} the current stroke opacity
         */
        getStrokeOpacity(): string;
        /**
         * Sets the current fill/stroke opacity.
         * @function module:svgcanvas.SvgCanvas#setPaintOpacity
         * @param {string} type - String with "fill" or "stroke"
         * @param {Float} val - Float with the new opacity value
         * @param {boolean} preventUndo - Indicates whether or not this should be an undoable action
         * @returns {void}
         */
        setPaintOpacity(type: string, val: Float, preventUndo: boolean): void;
        /**
         * Gets the current fill/stroke opacity.
         * @function module:svgcanvas.SvgCanvas#getPaintOpacity
         * @param {"fill"|"stroke"} type - String with "fill" or "stroke"
         * @returns {Float} Fill/stroke opacity
         */
        getPaintOpacity(type: "fill" | "stroke"): Float;
        /**
         * Gets the `stdDeviation` blur value of the given element.
         * @function module:svgcanvas.SvgCanvas#getBlur
         * @param {Element} elem - The element to check the blur value for
         * @returns {string} stdDeviation blur attribute value
         */
        getBlur(elem: Element): string;
        /**
         * Sets a given URL to be a "last good image" URL.
         * @function module:svgcanvas.SvgCanvas#setGoodImage
         * @param {string} val
         * @returns {void}
         */
        setGoodImage(val: string): void;
        /**
         * Returns the current drawing as raw SVG XML text.
         * @function module:svgcanvas.SvgCanvas#getSvgString
         * @returns {string} The current drawing as raw SVG XML text.
         */
        getSvgString(): string;
        /**
         * This function determines whether to use a nonce in the prefix, when
         * generating IDs for future documents in SVG-Edit.
         * If you're controlling SVG-Edit externally, and want randomized IDs, call
         * this BEFORE calling `svgCanvas.setSvgString`.
         * @function module:svgcanvas.SvgCanvas#randomizeIds
         * @param {boolean} [enableRandomization] If true, adds a nonce to the prefix. Thus
         * `svgCanvas.randomizeIds() <==> svgCanvas.randomizeIds(true)`
         * @returns {void}
         */
        randomizeIds(enableRandomization?: boolean, ...args: any[]): void;
        /**
         * Convert selected element to a path, or get the BBox of an element-as-path.
         * @function module:svgcanvas.SvgCanvas#convertToPath
         * @todo (codedread): Remove the getBBox argument and split this function into two.
         * @param {Element} elem - The DOM element to be converted
         * @param {boolean} getBBox - Boolean on whether or not to only return the path's BBox
         * @returns {void|DOMRect|false|SVGPathElement|null} If the getBBox flag is true, the resulting path's bounding box object.
         * Otherwise the resulting path element is returned.
         */
        convertToPath(elem: Element, getBBox: boolean): void | DOMRect | false | SVGPathElement | null;
        /**
         * Removes all selected elements from the DOM and adds the change to the
         * history stack. Remembers removed elements on the clipboard.
         * @function module:svgcanvas.SvgCanvas#cutSelectedElements
         * @returns {void}
         */
        cutSelectedElements(): void;
        initializeSvgCanvasMethods(): void;
        cycleElement(next?: boolean): void;
        cloneSelectedElements(x, y): void;
        deleteSelectedElements(): void;
        setSvgString(xmlString, preventUndo?): any
        getResolution(): any;
        setResolution(x, y): any;
        setCurrentZoom(zoomLevel): void;
        setBackground(color, url?): void;
        updateCanvas(w, h): any;
        getJsonFromSvgElements: any;
        addSVGElementsFromJson: any;
        clearSvgContentElement: any;
        textActions: any;
        getStrokedBBox: any;
        getVisibleElements: any;
        stringToHTML: any;
        insertChildAtIndex: any;
        getClosest: any;
        getParents: any;
        isLayer: any;
        matrixMultiply: any;
        hasMatrixTransform: any;
        transformListToTransform: any;
        convertToNum: any;
        findDefs: any;
        getUrlFromAttr: any;
        getHref: any;
        setHref: any;
        getBBox: any;
        getRotationAngle: any;
        getElement: any;
        getRefElem: any;
        assignAttributes: any;
        cleanupElement: any;
        remapElement: any;
        recalculateDimensions: any;
        sanitizeSvg: any;
        pasteElements: any;
        identifyLayers: any;
        createLayer: any;
        cloneLayer: any;
        deleteCurrentLayer: any;
        setCurrentLayer: any;
        renameCurrentLayer: any;
        setCurrentLayerPosition: any;
        indexCurrentLayer: any;
        setLayerVisibility: any;
        moveSelectedToLayer: any;
        mergeLayer: any;
        mergeAllLayers: any;
        leaveContext: any;
        setContext: any;
        changeSelectedAttributeNoUndo: any;
        changeSelectedAttribute: any;
        setBlurNoUndo: any;
        setBlurOffsets: any;
        setBlur: any;
        smoothControlPoints: any;
        getTypeMap: any;
        history: any;
        NS: any;
        $id: any;
        $qq: any;
        $qa: any;
        $click: any;
        encode64: any;
        decode64: any;
        mergeDeep: any;
    }
    declare namespace SvgCanvas {
        export { $id };
        export { $qq };
        export { $qa };
        export { $click };
        export { encode64 };
        export { decode64 };
        export { mergeDeep };
        export { getClosest };
        export { getParents };
        export { blankPageObjectURL };
        export { Paint };
        export { getTypeMap };
        export { convertToNum };
        export { isValidUnit };
        export { convertUnit };
    }
    
}