var DATA = {};
DATA.META = {};
DATA.META.CHARACTERS = [{"id":"peti","name":"Péter"},{"id":"mate","name":"Máté"}];
DATA.CHAPTERS["chapter1"] = {
    "type":"chap",
    "id":"1",
    "c": {
        "s1": {
            "type":"seq",
            "next":""
            "c":[{
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
            "c":[{
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
            "type":"br",
            "opts":[{
                "id":"o1"
                "cond":"return variables.cond;"
                "jump":"s1"
            },{
                "id":"o2",
                "jump":"s2"
            }]
        },
        "b2": {
            "type":"sel",
            "opts":[{
                "id":"o1",
                "text":"YES!",
                "ef":"variables.cond = true;"
            },{
                "id":"o2",
                "text":"nope.avi",
                "ef":"variables.cond = false;"
            }]
        }
    }
};

DATA.META.CHARACTERS = JSON.stringify(DATA.META.CHARACTERS);
DATA.CHAPTERS["chapter1"] = JSON.stringify(DATA.CHAPTERS["chapter1"]);
