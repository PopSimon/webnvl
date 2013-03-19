var DATA = {};
DATA.META = {};
DATA.META.CHARACTERS = [{"id":"peti","name":"Péter"},{"id":"mate","name":"Máté"}];
DATA.META.ENTRYPOINT = "chapter1:s1";
DATA.CHAPTERS = {};
DATA.CHAPTERS["chapter1"] = {
    "type":"chap",
    "id":"chapter1",
    "c": {
        "s1": {
            "type":"seq",
            "id": "s1",
            "next":"b2",
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
            "id": "s2",
            "next":"b1",
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
            "id": "b1",
            "opts":[{
                "id":"o1",
                "cond":"return variables.cond;",
                "next":"s1"
            },{
                "id":"o2",
                "next":"s2"
            }]
        },
        "b2": {
            "type":"sel",
            "id": "b2",
            "next": "s2",
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
