testjson = JSON.stringify(
    {
        "bg": "deepblue",
        "fireworks": {
            "decay": "long",
            "hues": [[0, 0], [361, 361], [240, 240]]
        },
        "msg": {
            "font": "'Courier New', Courier, monospace",
            "text": "Happpy 4th,",
            "colors": ["red", "orange", "yellow", "green", "blue", "purple"],
            "//confetti": {
                "shapes": ["circle"],
                "colors": ["red", "orange", "yellow", "green", "blue", "purple"],
                "count": 500,
                "after": 1000,
                "repeat": 0
            },
            "reveal": {
                "style": "flip",
                "delay": 50
            },
            "//sparkles": {
                "delay": 800,
                "count": 50,
                "repeat": 1
            }
        },
        "name": {
            "font": "'Courier New', Courier, monospace",
            "text": "Aiden!",
            "colors": ["red", "orange", "yellow", "green", "blue", "purple"],
            "//confetti": {
                "shapes": ["circle"],
                "colors": ["red", "orange", "yellow", "green", "blue", "purple"],
                "count": 500,
                "after": 1000,
                "repeat": 0
            },
            "reveal": {
                "style": "slide",
                "delay": 10
            },
            "//sparkles": {
                "delay": 800,
                "count": 50,
                "repeat": 1
            }
        }
    }
)