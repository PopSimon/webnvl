var DATA = {};
DATA.META = {};
DATA.META.CHARACTERS = [{"id":"peti","name":"Péter"},{"id":"mate","name":"Máté"}];
DATA.CHAPTERS["chapter1"] = {
    "type":"chapter",
    "id":"1",
    "content": {
        "s1": {
            "type":"seq",
            "next":""
            "content":[{
                "type":"text",
                "person":"peti",
                "text":"lololo pénisz"
            },{
                "type":"text",
                "person":"mate",
                "text":"kakakuki"
            }]
        },
        "s2": {
            "type":"seq",
            "content":[{
                "type":"text",
                "person":"peti",
                "text":"lololo pénisz"
            },{
                "type":"text",
                "person":"mate",
                "text":"kakakuki"
            }]
        },
        "b1": {
            "type":"branching",
            "opts":[{
                "id":"o1"
                "condition":"function (variables) { return variables.cond; }"
                "jump":"s1"
            },{
                "id":"o2",
                "jump":"s2"
            }]
        },
        "b2": {
            "type":"selection",
            "opts":[{
                "id":"o1",
                "text":"YES!",
                "effect":"function (variables) { variables.cond = true; }"
            },{
                "id":"o2",
                "text":"nope.avi",
                "effect":"function (variables) { variables.cond = false; }"
            }]
        }
    }
};

DATA.META.CHARACTERS = JSON.stringify(DATA.META.CHARACTERS);
DATA.CHAPTERS["chapter1"] = JSON.stringify(DATA.CHAPTERS["chapter1"]);