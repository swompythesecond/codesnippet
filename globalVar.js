export let codeSnippetSysthem = {
    codeSnippetarray : [
        {
            title: "Code1",
            codeContent: { f: function f() { let stuff = "hi";stuff ++; console.log(stuff); } }.f.toString()
        },
        {
            title: "Code2",
            codeContent: "array.push()"
        },
        {
            title: "Code3",
            codeContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        
    ],
    currentId : 0,
    startX: 100,
    startY: 100,
    rasterStep:500,
    rowAmount: 3,
    checkUpdate: true,
}
