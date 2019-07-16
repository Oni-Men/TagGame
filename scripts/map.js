class Map {
    constructor(X_SIZE, Y_SIZE, obstacle) {
        this.X_SIZE = X_SIZE;
        this.Y_SIZE = Y_SIZE;
        this.map = this.map_factory(X_SIZE, Y_SIZE, obstacle);
    }

    data(x, y) {
        const xflag = (x >= 0 && x < this.X_SIZE);
        const yflag = (y >= 0 && y < this.Y_SIZE);
        if (xflag && yflag) {
            return this.map[y][x];
        } else {
            return Map.air_data();
        }
    }

    static default_data() {
        return {
            color: "#aaa",
            durability: 100,
            id: ObjectType.Stone
        };
    }

    static air_data() {
        return {
            color: "#fff",
            durability: 0,
            id: ObjectType.Air
        };
    }

    map_factory(X_SIZE, Y_SIZE, obj) {
        let createdMap = [];
        for (let y = 0; y < Y_SIZE; y++) {
            createdMap[y] = new Array(X_SIZE).fill(Map.air_data());
        }

        for (let i = 0; i < obj.length; i++) {
            createdMap[obj[i].y][obj[i].x] = obj[i].data;
        }

        return createdMap;
    }
}
