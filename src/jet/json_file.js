export class JsonFile {
    /**
     * @param {Document} htmlDocument
     * @param {JSON} jsonParser
     * @param {string} relPath
     * @param {(file: JsonFile) => void} onLoaded
     */
    constructor(htmlDocument, jsonParser, relPath, onLoaded) {
        this._relPath = relPath;
        this._onLoaded = onLoaded;
        this._jsonParser = jsonParser;

        this._httpRequest = new XMLHttpRequest();
        this._httpRequest.onreadystatechange = this._onReadyStateChange;

        this._url = new URL(relPath, htmlDocument.baseURI);

        this._httpRequest.open('GET', this._url.href);
        this._httpRequest.send();
    }

    /**
     * @type {() => void}
     * @private
     */
    _onReadyStateChange = () => {
        if (this._httpRequest.readyState === 4) {
            if (this._httpRequest.status === 200) {
                this._data = this._jsonParser.parse(
                    this._httpRequest.responseText
                );

                this._onLoaded(this);
            }
        }
    };

    get data() {
        return this._data;
    }
}
