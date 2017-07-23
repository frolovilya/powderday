export default {

    "trees": [
        {
            "sprite": {
                "src": "img/tree-1.png", // 139 x 137
                "size": {
                    width: 139,
                    height: 137
                }
            },
            "shape": {
                coords: {
                    x: 37,
                    y: 125
                },
                radius: 7,
                type: "circle"
            }
        },
        {
            "sprite": {
                "src": "img/tree-2.png", // 228 x 247
                "size": {
                    width: 228,
                    height: 247
                }
            },
            "shape": {
                coords: {
                    x: 45,
                    y: 230
                },
                radius: 10,
                type: "circle"
            }
        },
        {
            "sprite": {
                "src": "img/tree-3.png", // 114 x 142
                "size": {
                    width: 114,
                    height: 142
                }
            },
            "shape": {
                coords: {
                    x: 28,
                    y: 117
                },
                radius: 5,
                type: "circle"
            }
        },
        {
            "sprite": {
                "src": "img/tree-4.png", // 168 x 159
                "size": {
                    width: 168,
                    height: 159
                }
            },
            "shape": {
                coords: {
                    x: 52,
                    y: 137
                },
                radius: 8,
                type: "circle"
            }
        }
    ],

    "player": {
        "sprite": {
            "src": "img/player.png", // 960 x 120
            "size": {
                width: 120
            },
            "positions": {
                "front": 0,
                "frontLeft": 120,
                "left": 240,
                "frontRight": 840,
                "right": 720
            }
        },
        "shape": {
            coords: {
                x: 60, // 0
                y: 85 // 25
            },
            radius: 10,
            type: "circle"
        }
    }

}