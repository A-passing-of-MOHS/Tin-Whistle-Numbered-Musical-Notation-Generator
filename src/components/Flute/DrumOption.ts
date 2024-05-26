export class DrumOption {
    //第一版中所有的音节是用户自己一个个选的
    public static options1=[
        {
            label: "1 (D do) ",
            nlabel:"1",
            elabel:"D",
            value: 1
        },
        {
            label: "2 (E re) ",
            nlabel:"2",
            elabel:"E",
            value: 2
        },
        {
            label: "3 (F mi)",
            nlabel:"3",
            elabel:"F",
            value: 3
        },
        {
            label: "4 (G fa)",
            nlabel:"4",
            elabel:"G",
            value: 4
        },
        {
            label: "5 (A so)",
            nlabel:"5",
            elabel:"A",
            value: 5
        },
        {
            label: "6 (B la)",
            nlabel:"6",
            elabel:"B",
            value: 6
        }, {
            label: "7 (C si)",
            nlabel:"7",
            elabel:"C",
            value: 7
        },
        {
            label: "1 (D do)高音",
            nlabel:"1",
            elabel:"D",
            value: 11
        },
        {
            label: "2 (E re)高音",
            nlabel:"2",
            elabel:"E",
            value: 12
        },
        {
            label: "3 (F mi)高音",
            nlabel:"3",
            elabel:"F",
            value: 13
        },
        {
            label: "4 (G fa)高音",
            nlabel:"4",
            elabel:"G",
            value: 14
        },
        {
            label: "5 (A so)高音",
            nlabel:"5",
            elabel:"A",
            value: 15
        },
        {
            label: "6 (B la)高音",
            nlabel:"6",
            elabel:"B",
            value: 16
        }, {
            label: "7(C si)高音",
            nlabel:"7",
            elabel:"C",
            value: 17
        },
        {
            label: "1(D si)倍高音",
            nlabel:"1",
            elabel:"D",
            value: 21
        },


    ]
    //第一二中只有1234567 搭配 两个高音
    public static options2=[
        {
            label: "1 (D do) ",
            nlabel:"1",
            elabel:"D",
            value: 1,
            vocalPart:1
        },
        {
            label: "2 (E re) ",
            nlabel:"2",
            elabel:"E",
            value: 2,
            vocalPart:1
        },
        {
            label: "3 (F mi)",
            nlabel:"3",
            elabel:"F",
            value: 3,
            vocalPart:1
        },
        {
            label: "4 (G fa)",
            nlabel:"4",
            elabel:"G",
            value: 4,
            vocalPart:1
        },
        {
            label: "5 (A so)",
            nlabel:"5",
            elabel:"A",
            value: 5,
            vocalPart:1
        },
        {
            label: "6 (B la)",
            nlabel:"6",
            elabel:"B",
            value: 6,
            vocalPart:1
        }, {
            label: "7 (C si)",
            nlabel:"7",
            elabel:"C",
            value: 7,
            vocalPart:1
        }

    ]
    public static vocalPart=[
        {
            label: "低音",
            value: 0
        },
        {
            label: "中音",
            value: 1
        },
        {
            label: "高音",
            value: 2
        },
        {
            label: "倍高音",
            value: 3
        },
    ]
}