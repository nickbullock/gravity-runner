import MapConfig from './map-configuration';


class Map extends Phaser.Tilemap {
    constructor(game, mapKey) {

        super(game, mapKey);

        const mapConfig = MapConfig[mapKey];

        /**
         * Забираем в карту из конфигурации
         * стартовые позиции игрока
         */
        this.playerStartPositions = mapConfig.playerStartPositions;
        /**
         * Необходимо хранить ссылки на слои
         * для дальнейшего установления коллизии
         * со спрайтом игрока
         * this.map.layers хранит экземпляры класса Object
         * мы же в this.map.layersFull храним
         * экземпляры TileMapLayer
         */
        this.layersFull = [];

        /**
         * У карты может быть несколько тайлсетов
         * добавляем каждый из конфигурации
         */
        mapConfig.tilesetImages.forEach((tilesetImage) => {
            this.addTilesetImage(tilesetImage);
        });

        /**
         * Задаем коллизии между тайлами
         */
        mapConfig.collisionsBetween.forEach((collision) => {
            this.setCollisionBetween(collision.start, collision.end);
        });

        /**
         * У карты может слоев
         * добавляем каждый из конфигурации
         */
        mapConfig.layers.forEach((layerName) => {
            const layer = this.createLayer(layerName);

            if(this.game.device.cocoonJS){
                //TODO check perfomance on mobile
                layer.smoothed = false;
                layer.setScale(1.8);
            }

            layer.resizeWorld();
            this.layersFull.push(layer);
        });
        
        return this;
    }
}

export default Map;
