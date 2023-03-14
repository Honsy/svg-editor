export default dataStorage;
declare namespace dataStorage {
    const _storage: WeakMap<object, any>;
    function put(element: any, key: any, obj: any): void;
    function get(element: any, key: any): any;
    function has(element: any, key: any): any;
    function remove(element: any, key: any): any;
}
