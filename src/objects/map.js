import MapConfig from './map-configuration';

class Map {
    constructor(mapName, game) {
        const mapConfig = MapConfig[mapName];

        this.map = game.add.tilemap(mapName);
        this.map.playerStartPositions = mapConfig.playerStartPositions;
        /**
         * Необходимо хранить ссылки на слои
         * для дальнейшего установления коллизии
         * со спрайтом игрока
         * this.map.layers хранит экземпляры класса Object
         * мы же в this.map.layersFull храним
         * экземпляры TileMapLayer
         */
        this.map.layersFull = [];

        mapConfig.tilesetImages.forEach((tilesetImage) => {
            this.map.addTilesetImage(tilesetImage);
        });

        mapConfig.collisionsBetween.forEach((collision) => {
            this.map.setCollisionBetween(collision.start, collision.end);
        });

        mapConfig.layers.forEach((layerName) => {
            const layer = this.map.createLayer(layerName);

            layer.resizeWorld();
            this.map.layersFull.push(layer);
        });
        
        return this.map;
    }
}

export default Map;
